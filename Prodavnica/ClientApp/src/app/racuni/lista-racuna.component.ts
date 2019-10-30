import { Component, OnInit, ViewChild } from '@angular/core';
import { RacuniService } from './racuni.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Racun } from '../modeli/Racun';
import { KreirajStavkuComponent } from './stavkaRacuna/kreiraj-stavku.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-racuna',
  templateUrl: './lista-racuna.component.html',
  styleUrls: ['./lista-racuna.component.css']
})
export class ListaRacunaComponent implements OnInit {

  displayedColumns = ['sifraRacuna', 'datumIVremeIzdavanja', 'ukupanIznos', 'opcije'];
  dataSource: MatTableDataSource<Racun>

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: RacuniService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: Router,
  ) { }

  ngOnInit() {
    this.service.getRacuna().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(sifraRacuna: number) {
    this.service.deleteRacuna(sifraRacuna).subscribe(data => {
      this.toastr.success("Uspesno obrisan racun", "Uspeh");
      this.service.getRacuna().subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    },
      (error: any) => { this.toastr.error("Nije moguce obrisati racun", "Greska"); }
    );
  }

  kreirajRacun() {
    this.service.postRacuna(this.service.kreirajForm.value).subscribe(data => {
      this.toastr.success("Uspesno ste dodali nov racun", "Uspeh");
      this.service.getRacuna().subscribe(r => {
        this.dataSource = new MatTableDataSource(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }),
      (error: any) => { this.toastr.error("Nije moguce dodati nov racun", "Greska"); }
  }

  dodajStavku(sifraRacuna) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { sifraRacuna };
    this.dialog.open(KreirajStavkuComponent, dialogConfig).afterClosed().subscribe(data => {
      this.service.getRacuna().subscribe(r => {
        this.dataSource = new MatTableDataSource(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.route.navigate(['/listaRacuna'])
      })
    })
  }


  izmeniRacun(sifraRacuna: number) {
    this.route.navigate(['izmeniRacun/' + sifraRacuna]);
  }

  

}
