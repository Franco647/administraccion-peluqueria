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
  private clientes_historial: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/clientes/';
    this.clientes_historial = 'api/clientes-historial/';
  }

  getListaClientes(): Observable<Product[]> {
   return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.clientes_historial}${id}`)
  }

  deleteCliente(id: number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteTrabajo(id: number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.myAppUrl}${this.clientes_historial}${id}/historial`);
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }

  crearTrabajoCliente(id: number, product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.clientes_historial}${id}/historial`, product);
  }

  editarClienteHistorial(id: number, data: Product): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.clientes_historial}${id}/historial`, data);
  }



  getSexo(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}sexo`);
  }
  getMetodos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}metodos`);
  }

}
