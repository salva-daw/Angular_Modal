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


