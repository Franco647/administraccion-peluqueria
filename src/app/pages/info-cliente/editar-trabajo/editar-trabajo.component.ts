import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as utils from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { selectFN } from '../../../utils/select';

@Component({
  selector: 'app-editar-trabajo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './editar-trabajo.component.html',
  styleUrl: './editar-trabajo.component.scss'
})
export class EditarTrabajoComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar ';

  metodos: any[] = []

  utils = utils;
  select = selectFN;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditarTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.data.trabajo, Validators.required],
      price: [this.data.precio, Validators.required],
      date: [this.data.fecha, Validators.required],
      metodo: [this.data.metodo, Validators.required],
    })

    this.getMetodos();
  }

  getMetodos() {
    this.productService.getMetodos().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.metodos = response.metodos;
        }
      }
    )
  }

  editarClienteHistorial() {

    const data: any = {
      id: this.data.id,
      cliente_id: this.data.cliente_id,
      description: this.form.value.description,
      price: this.form.value.price,
      date: this.form.value.date,
      metodo_pago: +this.form.value.metodo
    }

    this.productService.editarClienteHistorial(this.data.id, data).subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.dialogRef.close(response);
        }
    })
  }


  cerrar(): void {
    this.dialogRef.close();
  }


}
