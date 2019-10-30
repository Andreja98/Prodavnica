import { Component, OnInit, Inject } from '@angular/core';
import { MaterijalService } from './materijal.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmeni',
  templateUrl: './izmeni.component.html',
  styleUrls: ['./izmeni.component.css']
})
export class IzmeniComponent implements OnInit {

  constructor(private service: MaterijalService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IzmeniComponent>,
    @Inject(MAT_DIALOG_DATA) public data)
  { }

  ngOnInit() {
    let materijalId = this.data.materijalId;
    this.service.getMaterijalById(materijalId).subscribe(data => {
      this.service.formIzmeni.patchValue({ materijalId: data.materijalId, naziv: data.naziv });
    })
  }

  onSubmit() {
    let materijalId = this.data.materijalId;
    this.service.putMaterijala(materijalId, this.service.formIzmeni.value).subscribe(x => {
      this.toastr.success("Podaci o materijalu su uspesno izmenjeni", "Obavestenje");
    },
      (error: any) => { this.toastr.error("Greska pri izmeni podataka"); }
    )
    this.onClose();
    }

  onClose() {
    this.service.formIzmeni.reset();
    this.dialogRef.close();
  }

}
