import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import * as utils from '../../utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarTrabajoComponent } from './agregar-trabajo/agregar-trabajo.component';
import { DialogSimpleComponent } from '../../components/dialog-simple/dialog-simple.component';
import { EditarTrabajoComponent } from './editar-trabajo/editar-trabajo.component';


@Component({
  selector: 'app-info-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './info-cliente.component.html',
  styleUrl: './info-cliente.component.scss'
})
export class InfoClienteComponent {
  form!: FormGroup;

  id: any;
  listProducts: any;

  utils = utils


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      description: ['', Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
    })
    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.getCliente(this.id);
      }
    });
  }

  getCliente(id: number) {
    this.productService.getProduct(id).subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.listProducts = response.body;
          console.log(this.listProducts)
        }
    })
  }

  deleteTrabajo(id: number) {
    this.dialogService.abrirDialogSimpleError("¿Estás seguro que deseás eliminar?").afterClosed().subscribe((flag) => {
      if (flag) {
        this.productService.deleteTrabajo(id).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              this.getCliente(this.id);
            }
          }
        )
      }
    })
  }

  deleteCliente(id: number) {
    const dialogRef = this.matDialog.open(DialogSimpleComponent, {
      data: {
        titulo: '¿Deseás eliminar el cliente?',
        contenido: 'Esta acción eliminara todo el historial del cliente.',
        opcionFalse: 'Cancelar',
        opcionTrue: 'Eliminar',
        botonUnoColor: 'error'
      }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteCliente(id).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              this.router.navigate(['/']);
            }
          }
        )
      }
    });
  }

  editarClienteHistorial(id: number) {

    console.log(this.listProducts)

    const dialogWidth = window.innerWidth < 768 ? '80vw' : '400px';
    const dialogHeight = window.innerHeight < 768 ? '70vh' : '475px';

    this.matDialog.open(EditarTrabajoComponent, {
      width: dialogWidth,
      height: dialogHeight,  
      data: {
        id: this.listProducts.historial[id].id,
        cliente_id: this.id,
        nombre: this.listProducts.historial[id].name,
        trabajo: this.listProducts.historial[id].description,
        precio: this.listProducts.historial[id].price,
        fecha: this.listProducts.historial[id].date,
        metado: this.listProducts.historial[id].metodo_pago_id
      }
    })
    .afterClosed()
    .subscribe((result) => {
      console.log(result)
      if (result) {
        this.getCliente(this.id);
      }
    });
  }

  modalAgregarTrabajo() {

    const dialogWidth = window.innerWidth < 768 ? '80vw' : '400px';
    const dialogHeight = window.innerHeight < 768 ? '70vh' : '475px';

    this.matDialog.open(AgregarTrabajoComponent, {
      width: dialogWidth,
      height: dialogHeight,  
      data: {
        id: this.id,
        nombre: this.listProducts.name
      }
    })
    .afterClosed()
    .subscribe((result) => {
      console.log(result)
      if (result) {
        this.getCliente(this.id);
      }
    });
  }

}
