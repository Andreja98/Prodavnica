import { Component, OnInit, ViewChild } from '@angular/core';
import { RacuniService } from './racuni.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { StavkaRacuna } from '../modeli/StavkaRacuna';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-izmeni-racun',
  templateUrl: './izmeni-racun.component.html',
  styleUrls: ['./izmeni-racun.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IzmeniRacunComponent implements OnInit {

  displayedColumns: string[] = ['nazivMaterijala', 'cena', 'kolicina', 'ukupno'];
  dataSource: MatTableDataSource<StavkaRacuna>

  constructor(private service: RacuniService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    let sifraRacuna = this.router.snapshot.paramMap.get('sifraRacuna');
    this.service.getStavkeRacunaPoSifriRacuna(+sifraRacuna).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
