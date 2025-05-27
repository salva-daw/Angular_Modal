import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface Cliente {
  dni: string;
  nombre: string;
}

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})


export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) { }

  modalCerrar(): void {
    this.dialogRef.close();
  }

  modalCerrarDatos(): void {
    let dato = 'Valencia'
    this.dialogRef.close(dato);
  }
}
