'use client';

import { useState, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { File02Icon, FileUploadIcon, OctagonXIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  helperText?: string;
}

export function FileUploader({
  accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx',
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  onFilesChange,
  label = 'Upload files',
  helperText = 'PDF, DOC, JPG, PNG up to 10MB each',
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (newFiles: FileList | File[]): File[] => {
    const validated: File[] = [];
    const fileArray = Array.from(newFiles);

    for (const file of fileArray) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
        continue;
      }
      validated.push(file);
    }

    return validated.slice(0, maxFiles - files.length);
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    setError(null);
    const validated = validateFiles(newFiles);
    if (validated.length === 0) return;

    const updated = [...files, ...validated].slice(0, maxFiles);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer ${isDragging
            ? 'border-primary bg-red-50'
            : error
              ? 'border-red-300 bg-red-50'
              : 'border-border hover:border-red-300 hover:bg-red-50/30'
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleChange}
          className="hidden"
          id="file-uploader"
        />
        <label htmlFor="file-uploader" className="cursor-pointer block">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center">
            <HugeiconsIcon icon={FileUploadIcon} className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <p className="font-medium text-foreground mb-1">
            {files.length > 0 ? `${files.length} file(s) selected` : `Click to upload ${label}`}
          </p>
          <p className="text-sm text-muted-foreground">{helperText}</p>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center">
                  <HugeiconsIcon icon={File02Icon} className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-red-500"
              >
                <HugeiconsIcon icon={OctagonXIcon} className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}