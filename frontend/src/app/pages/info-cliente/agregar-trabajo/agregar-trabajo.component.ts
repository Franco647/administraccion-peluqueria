import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as utils from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-agregar-trabajo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-trabajo.component.html',
  styleUrl: './agregar-trabajo.component.scss'
})
export class AgregarTrabajoComponent {
  form!: FormGroup;
  loading: boolean = false;

  metodos: any[] = []

  utils = utils

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AgregarTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required],
      price: [null, Validators.required],
      metodo: [null, Validators.required],
      date: [null, Validators.required],
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

  addProduct() {
    const data: any = {
      description: this.form.value.description,
      price: this.form.value.price,
      date: this.form.value.date,
      metodo_pago: +this.form.value.metodo,
    }

    this.productService.crearTrabajoCliente(this.data.id, data).subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.dialogRef.close(response);
        }
      }
    )
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }

}
