import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistika } from '../modeli/Statistika';
import { FormGroup, FormControl } from '@angular/forms';

export class Prodaja{
  mesec: string;
  naziv: string;
  prodatoKomada: number;
}

@Injectable({
  providedIn: 'root'
})


export class StatistikaService {

  url: string = 'https://localhost:44348';

  constructor(private http: HttpClient) { }

  statistikaForm: FormGroup = new FormGroup({
    godina: new FormControl(0)
  })

  prodajaForm: FormGroup = new FormGroup({
    godina: new FormControl(0)
  })


  getZaradaPoMesecimaZaGodinu(godina: number): Observable<Statistika[]> {
    return this.http.get<any>(this.url + '/api/Statistika/' + godina);
  }

  getSvihGodinaRacuna(): Observable<number> {
    return this.http.get<number>(this.url + '/api/Statistika')
  }

  getProdajaVrsteMaterijalaPoMesecima(godina:number):Observable<Prodaja[]>{
    return this.http.get<Prodaja[]>(this.url + '/api/Statistika/prodaja/' + godina)
  }

}
