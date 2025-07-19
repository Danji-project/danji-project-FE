interface IUserInfoBase
{
    email : string;
    password : string;
    isLogin : boolean;
    error: string;

    setEmail: (email: string) => void;
    getEmail: () => string;

    setPassword: (password: string) => void;
    getPassword: () => string;

    setIsLogin: (result: boolean) => void;
}

export class UserInfoModel implements IUserInfoBase
{
    email: string;
    password: string;
    isLogin: boolean;
    error: string;

    constructor(a:string = '', b:string = '')
    {
        this.email = a;
        this.password = b;
        this.isLogin = false;
        this.error = '';
    }

    
    setEmail(email: string) { this.email = email; }
    getEmail() { return this.email; }

    setPassword(pass: string) { this.password = pass; }
    getPassword() { return this.password; }

    setError(err: string){this.error = err;}
    getError() {return this.error;}

    setIsLogin(result: boolean) {  this.isLogin = result; }
}
