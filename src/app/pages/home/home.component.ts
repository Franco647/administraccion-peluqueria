import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    public auth: AuthService
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.auth.isAuthenticated$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['/gestion-clientes'])
      }
    })
    
    this.auth.isAuthenticated$.subscribe(authenticated => {
      console.log('Is authenticated:', authenticated);
    });
  }

  login() {
    this.auth.loginWithRedirect()
  }
}
