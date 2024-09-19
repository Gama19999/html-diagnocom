export class UserData {
    constructor(
        public username: string = '',
        public email: string = '',
        public lastActivity: Date = new Date(),
        public error: string = ''
    ) {}
}