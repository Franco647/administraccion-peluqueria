import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Removed SharedMaterialModule as it caused a static resolution issue

@Component({
  selector: 'app-dialog-simple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-simple.component.html',
  styleUrl: './dialog-simple.component.scss'
})
export class DialogSimpleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogSimpleComponent>
  ) { }

  ngOnInit(): void {
  }

  cerrarDialog(opcion: boolean) {
    this.dialogRef.close(opcion);
  }
}
