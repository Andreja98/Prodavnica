import { Injectable } from '@angular/core';
import { Materijal } from '../modeli/Materijal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterijalService {

  formData: Materijal;
  lista: Materijal[];

  url: string = 'https://localhost:44348';

    form: FormGroup = new FormGroup({
    materijalId: new FormControl(null, Validators.required),
    naziv: new FormControl('', Validators.required)
  })

  formIzmeni: FormGroup = new FormGroup({
    materijalId: new FormControl(null),
    naziv: new FormControl('')
  })

  formKreiraj: FormGroup = new FormGroup({
    naziv: new FormControl('')
  })

  constructor(private http: HttpClient) { }

  getSvihMaterijala(): Observable<Materijal[]> {
    return this.http.get<Materijal[]>(this.url + '/api/Materijals');
  }

  deleteMaterijal(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Materijals/' + id);
  }

  postMaterijala(materijal: Materijal) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Materijals', materijal, { headers: reqHeader });
  }

  putMaterijala(materijalId: number, materijal: Materijal): Observable<Materijal> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Materijal>(this.url + '/api/Materijals/' + materijal.materijalId, materijal, { headers: reqHeader });
  }

  getMaterijalById(materijalId: number): Observable<Materijal> {
    return this.http.get<Materijal>(this.url + '/api/Materijals/' + materijalId);
  }
}
