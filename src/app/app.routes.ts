import { Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { InfoClienteComponent } from './pages/info-cliente/info-cliente.component';

export const routes: Routes = [
    { path: '', component: ListProductsComponent },
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: AddEditProductComponent },
    { path: 'info/:id', component: InfoClienteComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];


export class AppModule { } 