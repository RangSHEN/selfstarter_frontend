import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {Devis} from "../model/devis.model";

// ng g s services/devis
@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http:HttpClient) { }


  public searchDevis(keyword:string, currentPage:number, pageSize:number) : Observable<PageResponse<Devis>> {
    return this.http.get<PageResponse<Devis>>(environment.backendHost+ "/devis?keyword=" + keyword +"&page=" + currentPage+ "&size=" +pageSize);
  }

  public deleteDevis(devisId: number) {
    return this.http.delete(environment.backendHost + "/devis/" + devisId);
  }

  public saveDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(environment.backendHost + "/devis/", devis)
  }

  public updateDevis(devis: Devis, devisId: number): Observable<Devis> {
    return this.http.put<Devis>(environment.backendHost + "/devis/update/" + devisId, devis)
  }

  public getDevisByEntrepreneurs(entrepreneurId: number, currentPage: number, pageSize: number): Observable<PageResponse<Devis>> {
    return this.http.get<PageResponse<Devis>>(environment.backendHost + "/entrepreneur/" + entrepreneurId + "/devis?page=" + currentPage + "&size=" + pageSize);
  }

  public getDevisByClient(clientId: number, currentPage: number, pageSize: number): Observable<PageResponse<Devis>> {
    return this.http.get<PageResponse<Devis>>(environment.backendHost + "/client/" + clientId + "/courses?page=" + currentPage + "&size=" + pageSize);
  }
}
