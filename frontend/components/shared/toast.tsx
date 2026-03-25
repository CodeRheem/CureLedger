'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { OctagonXIcon } from '@hugeicons/core-free-icons';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-75 p-4 rounded-lg shadow-lg border flex items-start gap-3 ${toast.variant === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : toast.variant === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : toast.variant === 'warning'
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                  : 'bg-white border-border text-foreground'
            }`}
        >
          <div className="flex-1">
            <p className="font-medium">{toast.title}</p>
            {toast.description && <p className="text-sm opacity-80">{toast.description}</p>}
          </div>
          <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100">
            <HugeiconsIcon icon={OctagonXIcon} className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      ))}
    </div>
  );
}