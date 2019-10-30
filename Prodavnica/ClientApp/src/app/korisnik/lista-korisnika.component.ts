import { Component, OnInit, ViewChild } from '@angular/core';
import { KorisnikService } from './korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { Korisnik } from '../modeli/Korisnik';
import { KreirajKorisnikaComponent } from './kreiraj-korisnika.component';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika.component';

@Component({
  selector: 'app-lista-korisnika',
  templateUrl: './lista-korisnika.component.html',
  styleUrls: ['./lista-korisnika.component.css']
})
export class ListaKorisnikaComponent implements OnInit {

  displayedColumns: string[] = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'jmbg', 'mail', 'datumRodjenja', 'pol', 'plata', 'rolaId','opcije'];
  dataSource: MatTableDataSource<Korisnik>

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: KorisnikService,
    private toastr: ToastrService,
    private dialog: MatDialog,
   ) { }

  ngOnInit() {
    this.service.getSvihKorisnika().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteKorisnika(korisnikId: number) {
    this.service.deleteKorisnika(korisnikId)
      .subscribe(data => {
        this.toastr.success('Korisnik uspešno obrisan', 'Uspeh!');
        this.service.getSvihKorisnika()
          .subscribe(x => {
            this.dataSource = new MatTableDataSource(x);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
      },
        (error: any) => { this.toastr.warning('Nije moguce obrisati korisnika', 'Greska'); }
      );
  }

  kreirajKorisnika() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    let dialogRef = this.dialog.open(KreirajKorisnikaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihKorisnika().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }

  IzmeniKorisnika(korisnikId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "65%";
    dialogConfig.data = { korisnikId }
    let dialogRef = this.dialog.open(IzmeniKorisnikaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihKorisnika().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }
}
