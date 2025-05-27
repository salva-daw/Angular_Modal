import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Cliente, ModalComponent } from './modal/modal.component'


@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  datoRecibido!: string | null;

  constructor(public dialog: MatDialog) { }

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px', // Define el ancho del diálogo
      height: '300px',
      data: { mensaje: '¡Este es un mensaje desde un diálogo Standalone!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // El 'result' contendrá el valor que pasamos a dialogRef.close()
      if (result) {
        this.datoRecibido = result;
        console.log('Dato recibido del diálogo:', this.datoRecibido);
      } else {
        console.log('El diálogo se cerró sin pasar datos o con datos nulos.');
      }
    });

  }
}
