import { Component, OnInit } from '@angular/core';
import { MaterijalService } from './materijal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Materijal } from '../modeli/Materijal';

@Component({
  selector: 'app-kreiraj',
  templateUrl: './kreiraj.component.html',
  styleUrls: ['./kreiraj.component.css']
})
export class KreirajComponent implements OnInit {

  constructor(private service: MaterijalService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<KreirajComponent>) { }

  materijali: Materijal[];

  ngOnInit() {
    this.service.getSvihMaterijala().subscribe(x => {
      this.materijali = x;
    })
  }

  onSubmit() {
    this.service.postMaterijala(this.service.formKreiraj.value).subscribe(data => {
      this.toastr.success("Nov materijal je uspesno kreiran", "Uspeh");

    }),
      (error: any) => { this.toastr.error("Nije moguce kreirati nov materijal", "Greska"); }
    this.onClose();
  }


  onClose() {
    this.service.formKreiraj.reset();
    this.dialogRef.close();
  }
}
