import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogModule, MAT_DIALOG_DATA y MatDialogRef


export interface Cliente {
  dni: string;
  nombre: string;
}

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})


export class ModalComponent {
  clienteSeleccionado!: Cliente

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string } // Inyecta los datos pasados al diálogo
  ) { }

  onCerrarClick(): void {
    this.clienteSeleccionado = {
      dni: "112345",
      nombre: "Pepe Perez",
    }
    this.dialogRef.close(this.clienteSeleccionado); // Cierra el diálogo y opcionalmente pasa un resultado
  }
}
