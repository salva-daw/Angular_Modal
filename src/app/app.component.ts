import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { Cliente, ModalComponent } from './modal/modal.component' // Importa el componente del diálogo


@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  clienteRecibido!: Cliente | null;

  constructor(public dialog: MatDialog) { }

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px', // Define el ancho del diálogo
      height: '300px',
      data: { mensaje: '¡Este es un mensaje desde un diálogo Standalone!' } // Datos que quieres pasar al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      // El 'result' contendrá el valor que pasamos a dialogRef.close()
      if (result) {
        this.clienteRecibido = result;
        console.log('Cliente recibido del diálogo:', this.clienteRecibido);
      } else {
        this.clienteRecibido = null;
        console.log('El diálogo se cerró sin pasar datos o con datos nulos.');
      }
    });

  }
}
