import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Korisnik } from '../modeli/Korisnik';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Rola } from '../modeli/Rola';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  url: string = 'https://localhost:44348';


  constructor(private http: HttpClient) { }

  kreirajKorisnika: FormGroup = new FormGroup({
    korisnikId: new FormControl(0),
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    korisnickoIme: new FormControl('', Validators.required),
    jmbg: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    lozinka: new FormControl('', Validators.required),
    datumRodjenja: new FormControl(Date, Validators.required),
    pol: new FormControl('', Validators.required),
    plata: new FormControl(0, Validators.required),
    rolaId: new FormControl(0, Validators.required)
  })

  izmeniKorisnika: FormGroup = new FormGroup({
    korisnikId: new FormControl(0),
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    korisnickoIme: new FormControl('', Validators.required),
    jmbg: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    lozinka: new FormControl('', Validators.required),
    datumRodjenja: new FormControl(Date, Validators.required),
    pol: new FormControl('', Validators.required),
    plata: new FormControl(null, Validators.required),
    rolaId: new FormControl(null, Validators.required)
  })

  loginForm: FormGroup = new FormGroup({
    korisnickoIme: new FormControl('', Validators.required),
    lozinka: new FormControl('', Validators.required)
  })

  getSvihKorisnika(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.url + '/api/Korisniks');
  }

  getKorisnikById(korisnikId: number): Observable<Korisnik> {
    return this.http.get<Korisnik>(this.url + '/api/Korisniks/' + korisnikId);
  }

  getPoslednjiIdKorisnika(): Observable<number> {
    return this.http.get<number>(this.url + '/api/Korisniks/poslednjiId');
  }

  deleteKorisnika(korisnikId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Korisniks/' + korisnikId);
  }

  putKorisnika(korisnikId: number, korisnik: Korisnik): Observable<Korisnik> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Korisnik>(this.url + '/api/Korisniks/' + korisnikId, korisnik, { headers: reqHeader })
  }

  postKorisnika(korisnik: Korisnik) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Korisniks', korisnik, { headers: reqHeader })
  }

  getSvihRola(): Observable<Rola[]> {
    return this.http.get<Rola[]>(this.url + '/api/Rolas');
  }

  login(formData) {
    return this.http.post(this.url + '/api/Korisniks/logovanje', formData);
  }
  
}
