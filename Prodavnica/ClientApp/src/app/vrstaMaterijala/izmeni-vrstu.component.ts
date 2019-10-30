import { Component, OnInit, Inject } from '@angular/core';
import { VrstaMaterijalaService } from './vrsta-materijala.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materijal } from '../modeli/Materijal';

@Component({
  selector: 'app-izmeni-vrstu',
  templateUrl: './izmeni-vrstu.component.html',
  styleUrls: ['./izmeni-vrstu.component.css']
})
export class IzmeniVrstuComponent implements OnInit {

  constructor(private service: VrstaMaterijalaService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IzmeniVrstuComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  selected: string;
  materijali: Materijal[];

  ngOnInit() {
    this.service.getSvihMaterijala().subscribe(x => this.materijali = x)
    let vrstaMaterijalaId = this.data.vrstaMaterijalaId;
    this.service.getVrsteMaterijalaPoId(vrstaMaterijalaId).subscribe(data => {
      this.service.izmeniForm.patchValue({
        vrstaMaterijalaId: data.vrstaMaterijalaId, sifraMaterijala: data.sifraMaterijala,
        naziv: data.naziv, cena: data.cena, kolicina: data.kolicina, dobavljac: data.dobavljac, materijalId: data.materijalId
      })
      this.selected = data.materijalId.toString();
    })
  }

  onSubmit() {
    let vrstaMaterijalaId = this.data.vrstaMaterijalaId;
    this.service.putVrsteMaterijala(vrstaMaterijalaId, this.service.izmeniForm.value).subscribe(x => {
      this.toastr.success("Uspesno su izmenjeni podaci o vrsti materijala", "Uspeh");
    },
      (error: any) => { this.toastr.error("Doslo je do greske prilikom izmene podataka", "Greska"); }
    )
    this.onClose();
  }

  onClose() {
    this.service.izmeniForm.reset();
    this.dialogRef.close();
  }

  IzmeniVrstuMaterijala(vrstaMaterijalaId: number) {

  }
}
