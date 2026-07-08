import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const AUTH_TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public saveAuthToken(token: string): void {
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public getAuthToken(): string | null {
    return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
}
