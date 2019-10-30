import { Component, OnInit, ViewChild } from '@angular/core';
import { StatistikaService, Prodaja } from './statistika.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Statistika } from '../modeli/Statistika';

@Component({
  selector: 'app-prikaz-statistike',
  templateUrl: './prikaz-statistike.component.html',
  styleUrls: ['./prikaz-statistike.component.css']
})

export class PrikazStatistikeComponent implements OnInit {

  dataSource: MatTableDataSource<Statistika>
  dataSource1: MatTableDataSource<Prodaja>
  displayedColumns: string[] = ['mesec', 'zarada']
  displayColumns: string[] = ['mesec', 'naziv', 'prodatoKomada']
  godine: number
  godina: number
  statistika: Statistika[]


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: StatistikaService,) { }

  ngOnInit() {
    this.service.getSvihGodinaRacuna().subscribe(x => { this.godine = x })
  }

  zaradaPoMesecima(godina) {
    this.service.getZaradaPoMesecimaZaGodinu(godina).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.statistika = data;

    })

  }

  suma() {
    return this.statistika.map(t => t.zarada).reduce((acc, value) => acc + value, 0);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  prodajaVrstaPoMesecima(godina){
    this.service.getProdajaVrsteMaterijalaPoMesecima(godina).subscribe(data1=>{
        this.dataSource1 = new MatTableDataSource(data1);
        this.dataSource1.sort = this.sort;
        console.log(data1);
      }
    )
  }

  
}
