import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  loading: boolean = false;

  listProducts: Product[] = [
    { 
      id: 1,
      name: 'Andres Thobokholt',
      description: 'Canas teñido',
      price: 5000,
      date: '2025-10-25'
     },
     { 
      id: 2,
      name: 'Franco Thobokholt',
      description: 'Corte de pelo',
      price: 15000,
      date: '2024-11-20'
     },
     { 
      id: 3,
      name: 'Bruno Thobokholt',
      description: 'Corte',
      price: 3000,
      date: '2025-10-25'
     }
  ];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this.productService.getListProducts().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          console.log(response)
        }
      }
    )
  }

}
