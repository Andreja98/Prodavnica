import { Component, OnInit, ViewChild } from '@angular/core';
import { VrstaMaterijala } from '../modeli/VrstaMaterijala';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { VrstaMaterijalaService } from './vrsta-materijala.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { KreirajVrstuComponent } from './kreiraj-vrstu.component';
import { IzmeniVrstuComponent } from './izmeni-vrstu.component';

@Component({
  selector: 'app-lista-vrsta',
  templateUrl: './lista-vrsta.component.html',
  styleUrls: ['./lista-vrsta.component.css']
})
export class ListaVrstaComponent implements OnInit {

  displayedColumns: string[] = ['vrstaMaterijalaId', 'sifraMaterijala', 'naziv', 'cena', 'kolicina', 'dobavljac', 'materijalId', 'opcije'];
  lista: VrstaMaterijala[];
  dataSource: MatTableDataSource<VrstaMaterijala>;
  jednaVrsta: VrstaMaterijala;


  constructor(
    private service: VrstaMaterijalaService,
    private toastr: ToastrService,
    private dialog: MatDialog, )

  { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 

  ngOnInit() {
    this.service.getVrsteMaterijala().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(vrstaId: number) {
    this.service.deleteVrsteMaterijala(vrstaId).subscribe(data => {
      this.toastr.success("Uspesno obrisana vrsta materijala", "Uspeh");
      this.service.getVrsteMaterijala().subscribe(s => {
        this.dataSource = new MatTableDataSource(s);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    },
      (error: any) => { this.toastr.error("Nije moguce obrisati vrstu materijala", "Doslo je do greske"); }
    );
  }


    kreirajVrstu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "43%";
    dialogConfig.height = "61%";
      let dialogRef = this.dialog.open(KreirajVrstuComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(res => {
        this.service.getVrsteMaterijala().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }

    IzmeniVrstuMaterijala(vrstaMaterijalaId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "39%";
      dialogConfig.height = "61%";
      dialogConfig.data = { vrstaMaterijalaId }
      let dialogRef = this.dialog.open(IzmeniVrstuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getVrsteMaterijala().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }

  
}
