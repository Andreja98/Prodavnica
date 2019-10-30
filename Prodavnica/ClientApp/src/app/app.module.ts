import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatBottomSheetModule, MatDatepickerModule, MatDialogModule, MatListModule, MatMenuModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatDialogRef, MAT_DIALOG_DATA, MatDivider, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MaterijalService } from './materijali/materijal.service';
import { ToastrModule } from 'ngx-toastr';
import { MaterijalModule } from './materijali/materijal.module';
import { HomeModule } from './homePage/home.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDividerModule } from '@angular/material/divider';
import { IzmeniComponent } from './materijali/izmeni.component';
import { VrstaMaterijalaModule } from './vrstaMaterijala/vrsta-materijala.module';
import { KreirajVrstuComponent } from './vrstaMaterijala/kreiraj-vrstu.component';
import { KreirajComponent } from './materijali/kreiraj.component';
import { IzmeniVrstuComponent } from './vrstaMaterijala/izmeni-vrstu.component';
import { RoleComponent } from './role/role.component';
import { DodajRoluComponent } from './role/dodaj-rolu.component';
import { RoleModule } from './role/role.module';
import { IzmeniRoluComponent } from './role/izmeni-rolu.component';
import { KorisnikModule } from './korisnik/korisnik.module';
import { ListaRacunaComponent } from './racuni/lista-racuna.component';
import { KreirajKorisnikaComponent } from './korisnik/kreiraj-korisnika.component';
import { IzmeniKorisnikaComponent } from './korisnik/izmeni-korisnika.component';
import { KreirajStavkuComponent } from './racuni/stavkaRacuna/kreiraj-stavku.component';
import { IzmeniRacunComponent } from './racuni/izmeni-racun.component';
import { PrikazStatistikeComponent } from './statistika/prikaz-statistike.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoleComponent,
    ListaRacunaComponent,
    KreirajKorisnikaComponent,
    KreirajStavkuComponent,
    IzmeniRacunComponent,
    PrikazStatistikeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HomeModule,
    FormsModule,
    MatDividerModule,
    CdkTableModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    LayoutModule,
    MatSortModule,
    MaterijalModule,
    VrstaMaterijalaModule,
    KorisnikModule,
    RoleModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressAnimation: "increasing",
      progressBar: true,
      timeOut: 2000,
      positionClass: "toast-top-center"
    })
  ],
  providers: [MaterijalService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [IzmeniComponent, KreirajVrstuComponent, KreirajComponent, IzmeniVrstuComponent, DodajRoluComponent, IzmeniRoluComponent, KreirajKorisnikaComponent, IzmeniKorisnikaComponent, KreirajStavkuComponent]
})
export class AppModule { }
