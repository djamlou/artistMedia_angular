import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { toPromise } from 'rxjs/operator/toPromise';
import {User} from './entities/user';

@Injectable()
export class UserService {

  private _http: Http;
  private _user:User;

  constructor(param_http: Http) {
    this._http = param_http;
    this._user = null;
  }

  public getCurrentUser():User{
    return this._user;
  }

  public getApiKey():string{
    if( this._user == null )
      return null;

    return this._user.apiKey;
}

  public login( p_username:string, p_password:string): Promise<User> {

    const uri:string = "http://localhost/symfonyCRUD/public/api/auth";
    const credentials:any = {username: p_username, password: p_password};
    const headers: Headers = new Headers({"Content-Type": 'application/json'});

    const options: RequestOptionsArgs = {
      method: "POST",
      headers: headers
    };

    return this._http.post(uri,credentials,options).toPromise().then(
      (rep: Response):User => {
        this._user = rep.json() as User;
        return this._user;
      }
    );
  }

  public logout(): Promise<User> {
    const uri:string = "http://localhost/symfonyCRUD/public/api/logout";
    return this._http.get(uri).toPromise().then(
      (rep: Response) => {
        this._user = rep.json() as User;
        return this._user;
      }
    );
  }

  public register( p_username:string, p_password:string, p_email:string): Promise<User> {
    const uri:string = "http://localhost/symfonyCRUD/public/api/register";
    const credentials:any = {username: p_username, password: p_password, email: p_email};
    const headers: Headers = new Headers({"Content-Type": 'application/json'});
    const options: RequestOptionsArgs = {
      method: "POST",
      headers: headers
    };

    return this._http.post(uri,credentials,options).toPromise().then(
      (rep: Response):User => {
        this._user = rep.json() as User;
        return this._user;
      }
    );

  }

}