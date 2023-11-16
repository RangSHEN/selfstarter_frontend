import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, publish} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {environment} from "../../environments/environment";
import {Client} from "../model/client.model";
import {Entrepreneur} from "../model/entrepreneur.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }


  public searchClients(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Client>> {
    return this.http.get<PageResponse<Client>>(environment.backendHost + "/client?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public deleteClient(clientId: number) {
    return this.http.delete(environment.backendHost + "/client/" + clientId);
  }

  public findAllClients(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(environment.backendHost + "/client/all");
  }


  public saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.backendHost + "/client", client);
  }

  public loadClientByEmail(email:string) : Observable<Client> {
    return this.http.get<Client>(environment.backendHost + "/client/find?email=" + email)
  }

}
