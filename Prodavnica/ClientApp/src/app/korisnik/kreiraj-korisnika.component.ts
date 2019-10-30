import { Component, OnInit } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { Rola } from '../modeli/Rola';

@Component({
  selector: 'app-kreiraj-korisnika',
  templateUrl: './kreiraj-korisnika.component.html',
  styleUrls: ['./kreiraj-korisnika.component.css']
})
export class KreirajKorisnikaComponent implements OnInit {

  role: Rola[];
  poslednjiId: number;

  constructor(private service: KorisnikService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<KreirajKorisnikaComponent>) { }

  ngOnInit() {
    this.service.getSvihRola().subscribe(x => { this.role = x })
    this.service.getPoslednjiIdKorisnika().subscribe(k => { this.poslednjiId = k+1 })
  }

  onSubmit() {
    let datum = this.service.kreirajKorisnika.get('datumRodjenja').value;
    datum.setDate(datum.getDate() + 1);
    this.service.kreirajKorisnika.patchValue({ datumRodjenja: datum });

    this.service.kreirajKorisnika.patchValue({ korisnikId: this.poslednjiId })

    this.service.postKorisnika(this.service.kreirajKorisnika.value).subscribe(data => {
      this.toastr.success("Korisnik je uspesno registrovan", "Uspeh");
      this.service.kreirajKorisnika.reset();
    },
      (error: any) => { this.toastr.error("Nije moguce registrovati novog korisnika","Greska") }
    )
    this.onClose();
  }

  onClose() {
    this.service.kreirajKorisnika.reset();
    this.dialogRef.close();
  }

}
