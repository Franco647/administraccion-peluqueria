import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { NgSelectModule } from '@ng-select/ng-select';
// import { ToastrService } from 'ngx-toastr';
import * as utils from '../../utils/utils';
import { MatDialogRef } from '@angular/material/dialog';
// import { Product } from 'src/app/interfaces/product';
// import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NgSelectModule],
  standalone: true,
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  sexos: any[] = [];

  utils = utils

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }

    this.getSexo();
  }

  getProduct(id: number) {
    // this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        date: utils.getDateOnly(data.date)
      })
    })
  }

  addProduct() {
    console.log(this.form.value.name);

    const product: any = {
      name: this.form.value.name,
      sexo: +this.form.value.description,
      fecha_nacimiento: this.form.value.date
    }

    this._productService.saveProduct(product).subscribe((data) => {
      this.dialogRef.close(data);
    })
    
  }

  getSexo() {
    this._productService.getSexo().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.sexos = response.sexos
        }
      }
    )
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}