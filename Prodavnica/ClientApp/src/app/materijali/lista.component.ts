import { Component, OnInit, ViewChild } from '@angular/core';
import { Materijal } from '../modeli/Materijal';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MaterijalService } from './materijal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IzmeniComponent } from './izmeni.component';
import { KreirajComponent } from './kreiraj.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  displayedColumns: string[] = ['materijalId', 'naziv', 'opcije'];
  materijali: Materijal[];
  dataSource: MatTableDataSource<Materijal>;
  materijal: Materijal;
  lista: Materijal[];

  constructor(private service: MaterijalService,
    private route: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.service.getSvihMaterijala().subscribe(x => {
      this.dataSource = new MatTableDataSource(x)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    this.service.deleteMaterijal(id)
      .subscribe(data => {
        this.toastr.success('Materijal uspešno obrisan', 'Uspeh!');
        this.service.getSvihMaterijala()
          .subscribe(x => {
            this.dataSource = new MatTableDataSource(x);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.route.navigate(['/listaMaterijala']);
          });
      },
        (error: any) => { this.toastr.warning('Doslo je do greske', 'Pokusajte ponovo'); }
      );
  }
    

    IzmeniMaterijal(materijalId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "28%";
    dialogConfig.height = "47%";
    dialogConfig.data = { materijalId }
    let dialogRef = this.dialog.open(IzmeniComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihMaterijala().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }

    kreirajMaterijal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "28%";
      dialogConfig.height = "33%";
      let dialogRef = this.dialog.open(KreirajComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihMaterijala().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }
  

}
