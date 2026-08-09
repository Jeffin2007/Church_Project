/**
 * Authentication & Security Helper Module
 * Queen of All Saints Digital Parish Platform
 */

export interface AuthSessionData {
  userId: string;
  email: string;
  role: string;
  familyId?: string;
  token?: string;
  loggedInAt: string;
}

const AUTH_SESSION_KEY = 'qoas_auth_session';
const AUTH_USER_KEY = 'qoas_user_data';
const AUTH_TOKEN_KEY = 'qoas_access_token';

/**
 * Saves current user session to browser storage & cookies
 */
export function saveAuthSession(session: AuthSessionData) {
  if (typeof window === 'undefined') return;

  try {
    const sessionStr = JSON.stringify(session);
    localStorage.setItem(AUTH_SESSION_KEY, sessionStr);
    sessionStorage.setItem(AUTH_SESSION_KEY, sessionStr);
    localStorage.setItem(
      AUTH_USER_KEY,
      JSON.stringify({ email: session.email, role: session.role }),
    );
    if (session.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    }

    // Set cookie for middleware/HTTP requests
    document.cookie = `access_token=${session.token || 'authenticated'}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `qoas_session=active; path=/; max-age=86400; SameSite=Lax`;
  } catch (err) {
    console.error('Failed to save auth session:', err);
  }
}

/**
 * Checks if a valid authenticated session exists
 */
export function hasValidSession(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const localSession = localStorage.getItem(AUTH_SESSION_KEY);
    const sessionSession = sessionStorage.getItem(AUTH_SESSION_KEY);
    const cookies = document.cookie || '';

    const hasCookie = cookies.includes('access_token=') || cookies.includes('qoas_session=active');
    const hasStorage = Boolean(localSession || sessionSession);

    return hasCookie || hasStorage;
  } catch {
    return false;
  }
}

/**
 * Gets active session data
 */
export function getActiveSession(): AuthSessionData | null {
  if (typeof window === 'undefined') return null;

  try {
    const str = localStorage.getItem(AUTH_SESSION_KEY) || sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!str) return null;
    return JSON.parse(str) as AuthSessionData;
  } catch {
    return null;
  }
}

/**
 * Complete, secure logout implementation
 * Clears tokens, cookies, session storage, local storage, and replaces browser history
 */
export function logoutAuth(redirectUrl = '/') {
  if (typeof window === 'undefined') return;

  try {
    // 1. Mark loaded flags in localStorage & sessionStorage so homepage loads instantly without splash screen
    localStorage.setItem('qoas_loaded', '1');
    sessionStorage.setItem('qoas_loaded', '1');

    // 2. Clear user session keys
    localStorage.removeItem(AUTH_SESSION_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);

    // 3. Re-set the loaded flags post-cleanup
    localStorage.setItem('qoas_loaded', '1');
    sessionStorage.setItem('qoas_loaded', '1');

    // 4. Clear auth cookies by setting expired dates
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'qoas_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

    // 5. Force browser location replace to return home quick
    window.location.replace(redirectUrl);
  } catch {
    window.location.href = redirectUrl;
  }
}
