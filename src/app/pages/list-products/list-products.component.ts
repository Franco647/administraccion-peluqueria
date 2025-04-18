import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import * as utils from '../../utils/utils';
import { DialogService } from '../../services/dialog.service';
// import { CollapseComponent } from '../../components/collapse/collapse.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  loading: boolean = false;

  utils = utils

  listProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getListaClientes();
  }

  getListaClientes() {

    // this.loading = true;

    this.productService.getListaClientes().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.listProducts = response.body;
        }
      }
    )
  }


  deleteCliente(id: number) {
    this.dialogService.abrirDialogSimpleError("¿Estás seguro que deseás eliminar?").afterClosed().subscribe((flag) => {
      if (flag) {
        this.productService.deleteCliente(id).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              this.getListaClientes();
            }
          }
        )
      }
    })
  }

}
