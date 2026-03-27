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
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  
  // Clear cookies
  document.cookie = 'authToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'userRole=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  
  window.location.href = '/login';
}
