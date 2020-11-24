export class AuthService {
  private isAuthenticated: any = false;

  logIn() {
    return this.isAuthenticated = true;
  }

  logOut() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
