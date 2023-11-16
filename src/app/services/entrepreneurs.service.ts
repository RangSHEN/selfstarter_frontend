import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PageResponse} from "../model/page.response.model";
import {Entrepreneur} from "../model/entrepreneur.model";

@Injectable({
  providedIn: 'root'
})
export class EntrepreneursService {

  constructor(private http: HttpClient) {
  }

  public searchEntrepreneurs(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Entrepreneur>> {
    return this.http.get<PageResponse<Entrepreneur>>(environment.backendHost + "/entrepreneur?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize)
  }

  public findAllEntrepreneurs(): Observable<Array<Entrepreneur>> {
    return this.http.get<Array<Entrepreneur>>(environment.backendHost + "/entrepreneur/all");
  }

  public deleteEntrepreneur(entrepreneurId: number) {
    return this.http.delete(environment.backendHost + "/entrepreneur/" + entrepreneurId);
  }

  public saveEntrepreneur(entrepreneur: Entrepreneur): Observable<Entrepreneur> {
    return this.http.post<Entrepreneur>(environment.backendHost + "/entrepreneur", entrepreneur);
  }

  public loadEntrepreneurByEmail(email:String) : Observable<Entrepreneur>{
    return this.http.get<Entrepreneur>(environment.backendHost +"/entrepreneur/find?email=" + email)
  }
}
