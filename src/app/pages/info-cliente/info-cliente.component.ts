import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import * as utils from '../../utils/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';


@Component({
  selector: 'app-info-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './info-cliente.component.html',
  styleUrl: './info-cliente.component.scss'
})
export class InfoClienteComponent {
  form: FormGroup;
  id: any;

  listProducts: Product[] = [];

  utils = utils


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
    })
  
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.getProduct(this.id);
      }
    });
  }

  getProduct(id: number) {
    // this.loading = true;
    this.productService.getProduct(id).subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          console.log(response)
          this.listProducts = response.body.historial;
          console.log(this.listProducts)
        }
    })
  }


}
