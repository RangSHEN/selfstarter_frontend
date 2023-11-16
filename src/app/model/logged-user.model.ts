import {Client} from "./client.model";
import {Entrepreneur} from "./entrepreneur.model";

export class LoggedUser {

  constructor(public username:string,
              public roles: string[],
              private  _token:string,
              public _expiration:Date,
              public client: Client | undefined,
              public entrepreneur: Entrepreneur | undefined) {
  }

  get token(){
    //if there is no expiration or token is expired
    if(!this._expiration || new Date() > this._expiration){
      return null
    }

    return this._token;
  }
}
