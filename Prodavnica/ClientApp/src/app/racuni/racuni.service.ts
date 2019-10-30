import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Racun } from '../modeli/Racun';
import { FormGroup, FormControl } from '@angular/forms';
import { StavkaRacuna } from '../modeli/StavkaRacuna';
import { VrstaMaterijala } from '../modeli/VrstaMaterijala';

@Injectable({
  providedIn: 'root'
})
export class RacuniService {

  
  url: string = 'https://localhost:44348';

  constructor(private http: HttpClient) { }

  stavke: StavkaRacuna[] = [];

  kreirajForm: FormGroup = new FormGroup({
    sifraRacuna: new FormControl(0),
    datumIVremeIzdavanja: new FormControl(new Date),
    ukupanIznos: new FormControl(0)
  })

  stavkaForm: FormGroup = new FormGroup({
    stavkaRacunaId: new FormControl(0),
    sifraRacuna: new FormControl(0),
    kolicina: new FormControl(0),
    cena: new FormControl(0),
    vrstaMaterijalaId: new FormControl(0),
    nazivMaterijala: new FormControl(''),
    ukupno: new FormControl(0)
  });

  getRacuna(): Observable<Racun[]> {
    return this.http.get<Racun[]>(this.url + '/api/Racuns');
  }

  getRacunaPoSifri(sifraRacuna: number): Observable<Racun> {
    return this.http.get<Racun>(this.url + '/api/Racuns/' + sifraRacuna);
  }

  getRacunaSaStavkama(sifraRacuna: number): Observable<any> {
    return this.http.get<any>(this.url + '/api/Racuns/detalji/' + sifraRacuna);
  }

  getStavkeRacunaPoSifriRacuna(sifraRacuna: number): Observable<StavkaRacuna[]> {
    return this.http.get<StavkaRacuna[]>(this.url + '/api/StavkaRacunas/racun/' + sifraRacuna)
  }

  getStavkeRacunaPoVrstiMaterijalaId(sifraRacuna: number, vrstaMaterijalaId: number): Observable<StavkaRacuna> {
    return this.http.get<StavkaRacuna>(this.url + `/api/StavkaRacunas/${sifraRacuna}/${vrstaMaterijalaId}`)
  }

  getSveVrsteMaterijala(vrstaMaterijalaId: number): Observable<VrstaMaterijala> {
    return this.http.get<VrstaMaterijala>(this.url + '/api/VrstaMaterijalas/' + vrstaMaterijalaId)
  }

  deleteRacuna(sifraRacuna: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Racuns/' + sifraRacuna);
  }

  postRacuna(racun: Racun) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Racuns', racun, { headers: reqHeader });
  }

  getVrsteMaterijalaPoVrstiMaterijalId(vrstaMaterijalaId: number): Observable<VrstaMaterijala> {
    return this.http.get<VrstaMaterijala>(this.url + '/api/VrstaMaterijalas/' + vrstaMaterijalaId);
  }

  getvrsteMaterijalaPoMaterijalId(vrstaMaterijalaId: number): Observable<VrstaMaterijala> {
    return this.http.get<VrstaMaterijala>(this.url + '/api/VrstaMaterijala/' + vrstaMaterijalaId);
  }

  postStavkeRacuna(stavkaRacuna: StavkaRacuna) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/StavkaRacunas', stavkaRacuna, { headers: reqHeader })
  }

  poslednjiIdStavke(): Observable<number> {
    return this.http.get<number>(this.url + '/api/StavkaRacunas/poslednji')
  }
}
