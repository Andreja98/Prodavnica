import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DodajRoluComponent } from './dodaj-rolu.component';
import { IzmeniRoluComponent } from './izmeni-rolu.component';
import { KorisnikPoRoliComponent } from './korisnik-po-roli.component';



@NgModule({
  declarations: [DodajRoluComponent, IzmeniRoluComponent, KorisnikPoRoliComponent],
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
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class RoleModule { }
