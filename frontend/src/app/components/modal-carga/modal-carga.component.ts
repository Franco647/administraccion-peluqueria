import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogSimpleComponent } from '../dialog-simple/dialog-simple.component';

@Component({
  selector: 'app-modal-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-carga.component.html',
  styleUrl: './modal-carga.component.scss'
})
export class ModalCargaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogSimpleComponent>
  ) { }
}