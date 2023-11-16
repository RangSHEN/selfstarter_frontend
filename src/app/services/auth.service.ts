import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "../model/login.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoggedUser} from "../model/logged-user.model";
import {BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";
import {EntrepreneursService} from "./entrepreneurs.service";
import {ClientsService} from "./clients.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService = new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null>(null);

  constructor(private http: HttpClient, private router: Router, private entrepreneursService: EntrepreneursService, private clientsService: ClientsService) { }

  public login(user : LoginRequest) : Observable<LoginResponse>{
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password',user.password);
    return this.http.post<LoginResponse>(environment.backendHost + "/login", formData)
  }

  saveToken(jwtTokens : LoginResponse) {
    const decodedAccessToken = this.jwtHelperService.decodeToken(jwtTokens.accessToken)
    const loggedUser = new LoggedUser(decodedAccessToken.sub, decodedAccessToken.roles, jwtTokens.accessToken, this.getExpirationDate(decodedAccessToken.exp), undefined,undefined)
    this.user.next(loggedUser)
    this.redirectLoggedInUser(decodedAccessToken, jwtTokens.accessToken)
  }

  redirectLoggedInUser(decodedToken:any, accessToken:string){
    if(decodedToken.roles.includes("Admin")) this.router.navigateByUrl("/devis");
    else if(decodedToken.roles.include("Entrepreneur"))
      this.entrepreneursService.loadEntrepreneurByEmail(decodedToken.sub).subscribe(entrepreneur=>{
        const loggedUser = new LoggedUser(decodedToken.sub, decodedToken.roles, accessToken, this.getExpirationDate(decodedToken.exp), undefined,entrepreneur)
        this.user.next(loggedUser);
        this.router.navigateByUrl("/entrepreneur-devis" + entrepreneur.entrepreneurId)
      })
    else if(decodedToken.roles.includes("Client")){
      this.clientsService.loadClientByEmail(decodedToken.sub).subscribe(client=> {
        const loggedUser = new LoggedUser(decodedToken.sub, decodedToken.roles, accessToken, this.getExpirationDate(decodedToken.exp), client,undefined)
        this.user.next(loggedUser);
        this.router.navigateByUrl("/client-devis" + client.clientId)
      })

    }
  }

  getExpirationDate(exp: number){
    const date = new Date(0);
    date.setUTCSeconds(exp)
    return date;
  }
}
