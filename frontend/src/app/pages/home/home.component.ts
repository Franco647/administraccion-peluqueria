import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form!: FormGroup;

  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private serviceLogin: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    this.errorMsg = '';

    this.serviceLogin.postLogin(this.form.value).subscribe({
      next: (response: any) => {
        if (response.status == 'ok') {
          this.cookieService.set('token', response.token, 0.083, '/');

          this.router.navigate(['/gestion-clientes']);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMsg = 'Usuario no encontrado.';
        } else if (err.status === 400) {
          this.errorMsg = 'Contraseña incorrecta.';
        } else {
          this.errorMsg = 'Error inesperado. Intente más tarde.';
        }
      }
    })
  }


}
