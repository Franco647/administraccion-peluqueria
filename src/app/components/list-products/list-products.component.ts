import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
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

  constructor() {

  }
}
