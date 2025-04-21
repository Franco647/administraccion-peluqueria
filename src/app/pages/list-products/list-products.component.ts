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
import { AuthService } from '@auth0/auth0-angular';

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
    public auth: AuthService,
    private matDialog: MatDialog,
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
          console.log(response)
          // this.histor = response.body;
          console.log(this.listProducts)
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
      console.log(result)
      if (result) {
        this.getListaClientes()
      }
    });
  }

  toggleDetails(id: any) {
    this.router.navigate([`info/${id}`])
  }


  logOut() {
    this.auth.logout()
  }

}
