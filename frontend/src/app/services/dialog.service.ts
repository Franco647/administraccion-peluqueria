import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSimpleComponent } from '../components/dialog-simple/dialog-simple.component';
import { ModalCargaComponent } from '../components/modal-carga/modal-carga.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef!: MatDialogRef<ModalCargaComponent>;
  constructor(private dialog: MatDialog) { }

  abrirDialogSimple(titulo : string, botonUnoColor:string = "primary" , botonUno: string = "Aceptar" , botonDos: string = "Cancelar" ,contenido?:string, aftetClosedCallback?: ()=> void){
    return this.dialog.open(DialogSimpleComponent, {
      data: {
        titulo: titulo,
        contenido: contenido,
        opcionTrue: botonUno,
        opcionFalse: botonDos,
        botonUnoColor : botonUnoColor
      },
    });
  }

  abrirDialogSimpleError(titulo : string, botonUnoColor:string = "error" , botonUno: string = "Eliminar" , botonDos: string = "Cancelar" ,contenido?:string, aftetClosedCallback?: ()=> void){
    return this.dialog.open(DialogSimpleComponent, {
      data: {
        titulo: titulo,
        contenido: contenido,
        opcionTrue: botonUno,
        opcionFalse: botonDos,
        botonUnoColor : botonUnoColor
      },
    });
  }
  abrirDialogCarga(titulo : string) {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(ModalCargaComponent, {
        data: {
          titulo: titulo,
        },
        disableClose: true,
      });
    }
  }

  cerrarDialogCarga() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = undefined!;
    }
  }
}
