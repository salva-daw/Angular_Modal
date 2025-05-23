# Modal con Angular Material

![Descripción de la imagen](public/images/logo.png)



## Development server



## Uso de MatDialog
Los pasos a seguir serán los siguientes:
1. Instalar Angular Material
Si aún no lo tenemos, deberemos instalar Angular Material en nuestro proyecto:

    ```bash
    ng add @angular/material
    ```
    Durante la instalación, nos preguntará sobre un tema, tipografía y si queremos incluir animaciones. Eligimos las opciones que prefiramos.

2. Creamos el componente que utilizaremos como ventana modal.
    ```bash
    ng g c modal
    ```

3. Importar el módulo MatDialogModule en el fichero modal.ts.
    ```typescript
    import { Component, Inject } from '@angular/core';
    import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogModule, MAT_DIALOG_DATA y MatDialogRef
    ```
4. Cofigurar el decorador @component con MatDialogModule
    ```typescript
    @Component({
    selector: 'app-modal',
    imports: [MatDialogModule],  
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
    })
    ```
5. Inyectar el servicio en el componente
    ```typescript
    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { mensaje: string } 
    ) { }
    ```
    - MatDialogRef: Es una referencia al modal que se ha abierto. Lo utilizaremos para cerrar el modal (dialogRef.close()) y, opcionalmente, pasar datos de vuelta al componente que lo abrió.
    - MAT_DIALOG_DATA: Este token de inyección se utiliza para recibir datos que el componente que abre el modal le pasa.


6. Configurar un método para cerra el modal
    ```typescript
    onCerrarClick(): void {
      this.dialogRef.close(); 
      }
    ```
    this.dialogRef.close() utiliza la referencia del dialogo creado para poder cerrarlo mediante el método close(). 

    > [!NOTE]  
    > Si quisieramos pasar datos al componente que llama al modal deberiamos de pasarlos como parametro dentro del método close this.dialogRef.close(dato)



7. Crear el contenido del modal
    ```html
    <div mat-dialog-title style="display: flex; justify-content: space-between; align-items: center;">
      Titulo del Modal 
    </div>
    <div mat-dialog-content>
        <p>{{ data.mensaje }}</p>
    </div>
    <div mat-dialog-actions align="end">
        <button mat-button (click)="onCerrarClick()">Entendido</button>
    </div>
    ```




> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.





Puntos importantes del componente de contenido:

MAT_DIALOG_DATA: Este token de inyección se utiliza para recibir datos que el componente que abre el modal le pasa.
MatDialogRef: Es una referencia al modal que se ha abierto. Lo utilizas para cerrar el modal (dialogRef.close()) y, opcionalmente, pasar datos de vuelta al componente que lo abrió.
mat-dialog-title, mat-dialog-content, mat-dialog-actions: Son directivas de Angular Material que estructuran el contenido del modal y le dan estilos predefinidos.
[mat-dialog-close]: Una directiva útil en los botones para cerrar automáticamente el modal y pasar el valor especificado como resultado.
4. Abrir el modal desde otro componente (ej. AppComponent)
Ahora, en el componente desde el que quieres abrir el modal (por ejemplo, tu AppComponent), inyecta el servicio MatDialog y úsalo para abrir tu MyModalContentComponent.

src/app/app.component.ts

TypeScript

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyModalContentComponent } from './components/my-modal-content/my-modal-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-modal';
  resultFromModal: string | undefined;

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(MyModalContentComponent, {
      width: '400px', // Ancho del modal
      data: {
        title: 'Mi Modal Personalizado',
        message: '¡Hola desde el componente principal!'
      }
    });

    // Suscribirse para recibir el resultado cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado.');
      console.log('Resultado del modal:', result);
      this.resultFromModal = result; // Guarda el resultado
    });
  }
}
src/app/app.component.html

HTML

<div style="text-align:center; padding: 20px;">
  <h1>Bienvenido a {{ title }}!</h1>

  <button mat-raised-button color="primary" (click)="openModal()">Abrir Modal</button>

  <p *ngIf="resultFromModal">Resultado del modal: {{ resultFromModal }}</p>
</div>
Explicación del MatDialog Service:
this.dialog.open(MyModalContentComponent, config): Este es el método principal para abrir un modal.
El primer argumento es la clase de tu componente de contenido (MyModalContentComponent).
El segundo argumento es un objeto de configuración (MatDialogConfig) donde puedes especificar:
width, height, minWidth, maxWidth, minHeight, maxHeight: Dimensiones del modal.
data: Un objeto que se pasará al componente de contenido a través del token MAT_DIALOG_DATA.
disableClose: true para evitar que el modal se cierre al hacer clic fuera de él o presionar Escape.
hasBackdrop: true para mostrar un fondo oscuro detrás del modal.
panelClass: Una clase CSS para aplicar estilos personalizados al panel del modal.
backdropClass: Una clase CSS para aplicar estilos al fondo del modal.
Y muchas otras opciones para un control detallado.
dialogRef.afterClosed().subscribe(...): Cuando llamas a dialog.open(), te devuelve un MatDialogRef. Este dialogRef tiene un Observable llamado afterClosed() al que puedes suscribirte para recibir el valor que se pasó cuando el modal se cerró (por ejemplo, con dialogRef.close(value) o [mat-dialog-close]="value").