import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Korisnik } from '../modeli/Korisnik';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from './role.service';
import { KorisnikService } from '../korisnik/korisnik.service';

@Component({
  selector: 'app-korisnik-po-roli',
  templateUrl: './korisnik-po-roli.component.html',
  styleUrls: ['./korisnik-po-roli.component.css']
})
export class KorisnikPoRoliComponent implements OnInit {

  displayedColumns = ['korisnikId', 'ime', 'prezime', 'korisnickoIme', 'jmbg', 'mail', 'datumRodjenja', 'pol', 'plata', 'rolaId', 'opcije'];
  dataSource: MatTableDataSource<Korisnik>;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private service: RoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private kService: KorisnikService,
    private router: Router,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('rolaId');
    this.service.getRoleById(parseInt(id)).subscribe(data => {
      this.service.detaljiRole.setValue({ rolaId: data.rolaId, naziv: data.naziv })
      this.service.prikazKorisnikaPoRoli(parseInt(id)).subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteKorisnika(korisnikId: number) {
    let id = this.route.snapshot.paramMap.get('rolaId');
    this.kService.deleteKorisnika(korisnikId).subscribe(data => {
      this.toastr.success("Korisnik uspesno obrisan", "Uspeh");
      this.service.prikazKorisnikaPoRoli(parseInt(id)).subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (error: any) => { this.toastr.error("Nije moguce obrisati korisnika","Greska") }
      )
    })
  }

}
