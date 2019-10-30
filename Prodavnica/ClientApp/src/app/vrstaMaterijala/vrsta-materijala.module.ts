import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVrstaComponent } from './lista-vrsta.component';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KreirajVrstuComponent } from './kreiraj-vrstu.component';
import { IzmeniVrstuComponent } from './izmeni-vrstu.component';



@NgModule({
  declarations: [ListaVrstaComponent, KreirajVrstuComponent, IzmeniVrstuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class VrstaMaterijalaModule { }
