import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environments';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/'
  }

  getListProducts(): Observable<Product[]> {
   return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

}
