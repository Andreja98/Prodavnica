import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './materijali/lista.component';
import { HomeComponent } from './homePage/home.component';
import { IzmeniComponent } from './materijali/izmeni.component';
import { ListaVrstaComponent } from './vrstaMaterijala/lista-vrsta.component';
import { RoleComponent } from './role/role.component';
import { ListaKorisnikaComponent } from './korisnik/lista-korisnika.component';
import { KorisnikPoRoliComponent } from './role/korisnik-po-roli.component';
import { ListaRacunaComponent } from './racuni/lista-racuna.component';
import { AuthGuard } from './authorization/auth.guard';
import { AuthRolaGuard } from './authorization/auth.rola.guard';
import { IzmeniRacunComponent } from './racuni/izmeni-racun.component';
import { PrikazStatistikeComponent } from './statistika/prikaz-statistike.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'listaMaterijala', component: ListaComponent, canActivate: [AuthGuard] },
  { path: 'detalji/:id', component: IzmeniComponent, canActivate: [AuthGuard] },
  { path: 'listaVrsta', component: ListaVrstaComponent, canActivate: [AuthGuard] },
  { path: 'listaRola', component: RoleComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'listaKorisnika', component: ListaKorisnikaComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'korisnikPoRoli/:rolaId', component: KorisnikPoRoliComponent, canActivate: [AuthGuard, AuthRolaGuard] },
  { path: 'listaRacuna', component: ListaRacunaComponent, canActivate: [AuthGuard] },
  { path: 'izmeniRacun/:sifraRacuna', component: IzmeniRacunComponent, canActivate: [AuthGuard] },
  { path: 'prikazStatistike', component: PrikazStatistikeComponent, canActivate: [AuthGuard, AuthRolaGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
