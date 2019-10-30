import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { VrstaMaterijala } from '../modeli/VrstaMaterijala';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Materijal } from '../modeli/Materijal';

@Injectable({
  providedIn: 'root'
})
export class VrstaMaterijalaService {

  url: string = 'https://localhost:44348';

  constructor(private http: HttpClient) { }

    kreirajForm: FormGroup = new FormGroup({
    vrstaMaterijalaId: new FormControl(null, Validators.required),
    sifraMaterijala: new FormControl('', Validators.required),
    naziv: new FormControl('', Validators.required),
    cena: new FormControl(null, Validators.required),
    kolicina: new FormControl(null, Validators.required),
    dobavljac: new FormControl('',Validators.required),
    materijalId: new FormControl(0, Validators.required)
  });

    izmeniForm: FormGroup = new FormGroup({
    vrstaMaterijalaId: new FormControl(null),
    sifraMaterijala: new FormControl(''),
    naziv: new FormControl(''),
    cena: new FormControl(null),
    kolicina: new FormControl(null),
    dobavljac: new FormControl(''),
    materijalId: new FormControl(null)
  });

  getVrsteMaterijala(): Observable<VrstaMaterijala[]> {
    return this.http.get<VrstaMaterijala[]>(this.url + '/api/VrstaMaterijalas');
  }

  getVrsteMaterijalaPoId(vrstaId: number): Observable<VrstaMaterijala> {
    return this.http.get<VrstaMaterijala>(this.url + '/api/VrstaMaterijalas/' + vrstaId);
  }

  deleteVrsteMaterijala(vrstaId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/VrstaMaterijalas/' + vrstaId);
  }

  postVrsteMaterijala(vrsta: VrstaMaterijala){
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/VrstaMaterijalas', vrsta, { headers: reqHeader });
  }

  putVrsteMaterijala(vrstaMaterijalaId: number, vrsta: VrstaMaterijala): Observable<VrstaMaterijala> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<VrstaMaterijala>(this.url + '/api/VrstaMaterijalas/' + vrsta.vrstaMaterijalaId, vrsta, { headers: reqHeader });
  }

  getSvihMaterijala(): Observable<Materijal[]> {
    return this.http.get<Materijal[]>(this.url + '/api/Materijals');
  }

  getCenaPoVrstiMaterijala(vrstaMaterijalaId: number): Observable<number> {
    return this.http.get<number>(this.url + '/api/VrstaMaterijalas/vrsta/' + vrstaMaterijalaId)
  }
}
