export class AuthStatus {
  constructor(
      public authenticated: boolean = false,
      public wasRegistration: boolean = false,
      public errorMessage: string = '',
  ) {}

  public reset() {
    this.authenticated = false;
    this.wasRegistration = false;
    this.errorMessage = '';
  }
}
