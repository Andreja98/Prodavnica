import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rola } from '../modeli/Rola';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Korisnik } from '../modeli/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url: string = 'https://localhost:44348';

  createRola: FormGroup = new FormGroup({
    naziv: new FormControl('')
  })

  formIzmeni: FormGroup = new FormGroup({
    rolaId: new FormControl(null),
    naziv: new FormControl('')
  })

  detaljiRole: FormGroup = new FormGroup({
    rolaId: new FormControl(0),
    naziv: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient) { }

  
  getSvihRola(): Observable<Rola[]> {
    return this.http.get<Rola[]>(this.url + '/api/Rolas');
  }

  getRoleById(rolaId: number): Observable<Rola> {
    return this.http.get<Rola>(this.url + '/api/Rolas/' + rolaId);
  }

  deleteRole(rolaId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/api/Rolas/' + rolaId);
  }

  postRole(rola: Rola) {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post(this.url + '/api/Rolas', rola, { headers: reqHeader });
  }

  putRole(rolaId:number, rola: Rola): Observable<Rola> {
    const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.put<Rola>(this.url + '/api/Rolas/' + rola.rolaId, rola, { headers: reqHeader });
  }

  prikazKorisnikaPoRoli(rolaId: number): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.url + '/api/Rolas/korisnik/' + rolaId);
  }
  
}
