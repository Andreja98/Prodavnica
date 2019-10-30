import { Component, OnInit, Inject } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Rola } from '../modeli/Rola';

@Component({
  selector: 'app-izmeni-korisnika',
  templateUrl: './izmeni-korisnika.component.html',
  styleUrls: ['./izmeni-korisnika.component.css']
})
export class IzmeniKorisnikaComponent implements OnInit {

  constructor(private service: KorisnikService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IzmeniKorisnikaComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  role: Rola[];
  izabranaRola: string

  ngOnInit() {
    this.service.getSvihRola().subscribe(r =>  this.role = r )
    let IdKorisnika = this.data.korisnikId;
    this.service.getKorisnikById(IdKorisnika).subscribe(data => {
      this.service.izmeniKorisnika.patchValue({
        korisnikId: data.korisnikId,
        ime: data.ime,
        prezime: data.prezime,
        korisnickoIme: data.korisnickoIme,
        jmbg: data.jmbg,
        mail: data.mail,
        lozinka: data.lozinka,
        datumRodjenja: data.datumRodjenja,
        pol: data.pol,
        plata: data.plata,
        rolaId: data.rolaId
      })
      this.izabranaRola = data.rolaId.toString();
    })
  }

  onSubmit() {
    let idKorisnika = this.data.korisnikId;
    this.service.putKorisnika(idKorisnika, this.service.izmeniKorisnika.value).subscribe(data => {
      this.toastr.success("Podaci o korisniku su uspesno izmenjeni", "Uspeh");
      this.router.navigate(['/listaKorisnika']);
    },
      (error: any) => { this.toastr.error("Nije moguce izmeniti podatke o korisniku", "Greska") }
      
    )
    this.onClose();
  }

  onClose() {
    this.service.izmeniKorisnika.reset();
    this.dialogRef.close();
  }

}
