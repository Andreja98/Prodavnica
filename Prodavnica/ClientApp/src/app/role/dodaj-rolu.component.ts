import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { Rola } from '../modeli/Rola';
import { error } from 'protractor';

@Component({
  selector: 'app-dodaj-rolu',
  templateUrl: './dodaj-rolu.component.html',
  styleUrls: ['./dodaj-rolu.component.css']
})
export class DodajRoluComponent implements OnInit {

  constructor(private service: RoleService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DodajRoluComponent>) { }

  role: Rola[];

  ngOnInit() {
    this.service.getSvihRola().subscribe(data => { this.role = data; });
  }

  onSubmit() {
    this.service.postRole(this.service.createRola.value).subscribe(data => {
      this.toastr.success("Uspesno je kreirana nova rola", "Uspeh");
    }),
      (error: any) => { this.toastr.error("Nije moguce kreirati novu rolu", "Greska"); }
    this.onClose();
  }

  onClose() {
    this.service.createRola.reset();
    this.dialogRef.close();
  }

}
