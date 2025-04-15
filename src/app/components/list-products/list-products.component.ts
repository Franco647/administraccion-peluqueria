import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  listProducts: Product[] = [
    { 
      name: 'Andres Thobokholt',
      description: 'Canas teñido',
      price: 5000,
      date: '2025-10-25'
     },
     { 
      name: 'Franco Thobokholt',
      description: 'Corte de pelo',
      price: 15000,
      date: '2024-11-20'
     },
     { 
      name: 'Bruno Thobokholt',
      description: 'Corte',
      price: 3000,
      date: '2025-10-25'
     }
  ];

  constructor() {

  }
}
