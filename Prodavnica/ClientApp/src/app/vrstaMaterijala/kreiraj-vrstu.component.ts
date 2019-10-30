import { Component, OnInit } from '@angular/core';
import { VrstaMaterijalaService } from './vrsta-materijala.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { Materijal } from '../modeli/Materijal';

@Component({
  selector: 'app-kreiraj-vrstu',
  templateUrl: './kreiraj-vrstu.component.html',
  styleUrls: ['./kreiraj-vrstu.component.css']
})
export class KreirajVrstuComponent implements OnInit {

  constructor(private service: VrstaMaterijalaService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<KreirajVrstuComponent>)
  { }

  materijali: Materijal[];

  ngOnInit() {
    this.service.getSvihMaterijala().subscribe(x => {
      this.materijali = x;
    })
  }

  onSubmit() {
    this.service.postVrsteMaterijala(this.service.kreirajForm.value).subscribe(data => {
      this.toastr.success("Nova vrsta materijala uspesno kreirana", "Uspeh");
      
    }),
      (error: any) => { this.toastr.error("Nije moguce dodati novu vrstu materijala", "Greska"); }
    this.onClose();
  }


  onClose() {
    this.service.kreirajForm.reset();
    this.dialogRef.close();
  }
}
