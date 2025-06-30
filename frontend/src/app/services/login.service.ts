import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private myAppUrl: string;
  private login: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.login = 'api/usuario/';
  }


  postLogin(login: any) {
    return this.http.post<void>(`${this.myAppUrl}${this.login}login`, login)
  }

  postLogOut(logout: any) {
    return this.http.post<void>(`${this.myAppUrl}${this.login}logout`, logout)
  }
}
