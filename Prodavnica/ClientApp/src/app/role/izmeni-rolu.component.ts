import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from './role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-izmeni-rolu',
  templateUrl: './izmeni-rolu.component.html',
  styleUrls: ['./izmeni-rolu.component.css']
})
export class IzmeniRoluComponent implements OnInit {

  constructor(private service: RoleService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IzmeniRoluComponent>,
    @Inject(MAT_DIALOG_DATA) public data)
  { }

  ngOnInit() {
    let rolaId = this.data.rolaId;
    this.service.getRoleById(rolaId).subscribe(data => {
      this.service.formIzmeni.patchValue({ rolaId: data.rolaId, naziv: data.naziv });
    })
  }

  onSubmit() {
    let rolaId = this.data.rolaId;
    this.service.putRole(rolaId, this.service.formIzmeni.value).subscribe(x => {
      this.toastr.success("Podaci o roli su uspesno izmenjeni", "Uspeh");
    },
      (error: any) => { this.toastr.error("Nije moguce izmeniti podatke o roli", "Greska"); }
    )
    this.onClose();
  }


  onClose() {
    this.service.formIzmeni.reset();
    this.dialogRef.close();
  }
}
