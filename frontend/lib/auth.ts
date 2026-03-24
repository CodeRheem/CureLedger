// Utility to check user role from localStorage
export function getUserRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('userRole');
}

// Check if user has required role
export function hasRole(requiredRole: string | string[]): boolean {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
}

// Get user info
export function getUserInfo() {
  if (typeof window === 'undefined') return null;
  return {
    role: localStorage.getItem('userRole'),
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
  };
}

// Clear user session
export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  window.location.href = '/';
}
