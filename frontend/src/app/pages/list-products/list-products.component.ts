import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import * as utils from '../../utils/utils';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../agregar-editar-cliente/add-edit-product.component';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  loading: boolean = false;
  filaNueva: boolean = false;
  selectedItem: any;

  utils = utils

  listProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private router: Router,
    private serviceLogin: LoginService,
    private matDialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.getListaClientes();
  }

  getListaClientes() {
    this.productService.getListaClientes().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.listProducts = response.body;
          // this.getProduct(this.listProducts[0].id!);
        }
      }
    )
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      (response: any) => {
        if (response.status === 'ok') {

        }
    })
  }

  agregarCliente() {
    const dialogWidth = window.innerWidth < 768 ? '80vw' : '400px';
    const dialogHeight = window.innerHeight < 768 ? '70vh' : '400px';

    this.matDialog.open(AddEditProductComponent, {
      width: dialogWidth,
      height: dialogHeight,  
    })
    .afterClosed()
    .subscribe((result) => {
      if (result) {
        this.getListaClientes()
      }
    });
  }

  toggleDetails(id: any) {
    this.router.navigate([`info/${id}`])
  }

  editarCliente(idCliente: number) {
  }

  logOut() {
    let data;

    this.serviceLogin.postLogOut(data).subscribe({
      next: (response: any) => {
        if (response.status == 'ok') {
          this.cookieService.delete('token', '/');
          this.router.navigate(['/']);
        }
      }
    })
  }

  
}
