import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RacuniService } from '../racuni.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { VrstaMaterijalaService } from '../../vrstaMaterijala/vrsta-materijala.service';
import { VrstaMaterijala } from '../../modeli/VrstaMaterijala';
import { Racun } from '../../modeli/Racun';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kreiraj-stavku',
  templateUrl: './kreiraj-stavku.component.html',
  styleUrls: ['./kreiraj-stavku.component.css']
})
export class KreirajStavkuComponent implements OnInit {

  vrste: VrstaMaterijala[];
  selected: string;
  dataSource: MatTableDataSource<Racun>;
  poslednjiId: number;


  constructor(private service: RacuniService,
    private serviceVrste: VrstaMaterijalaService,
    private dialogRef: MatDialogRef<KreirajStavkuComponent>,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit() {
    this.serviceVrste.getVrsteMaterijala().subscribe(data => {
      this.vrste = data;
      this.service.getVrsteMaterijalaPoVrstiMaterijalId(this.service.stavkaForm.get('vrstaMaterijalaId').value).subscribe(y => {
        this.selected = y.vrstaMaterijalaId.toString();
      })
    })

    this.service.poslednjiIdStavke().subscribe(x => { this.poslednjiId = x + 1 })

    if (this.data.stavkaRacunaIndex == null) {
      this.service.stavkaForm = new FormGroup({
        stavkaRacunaId: new FormControl(0),
        sifraRacuna: new FormControl(this.data.sifraRacuna),
        kolicina: new FormControl(0),
        cena: new FormControl(0),
        vrstaMaterijalaId: new FormControl(0),
        nazivMaterijala: new FormControl(''),
        ukupno: new FormControl(0)
      });
    } else {
      let stavka = this.service.stavke[this.data.stavkaRacunaIndex]
      this.service.stavkaForm.patchValue({
        stavkaRacunaId: stavka.stavkaRacunaId,
        sifraRacuna: stavka.sifraRacuna,
        kolicina: stavka.kolicina,
        cena: stavka.cena,
        vrstaMaterijalaId: stavka.vrstaMaterijalaId,
        nazivMaterijala: stavka.nazivMaterijala,
        ukupno: stavka.ukupno
      })
    }
    
    }
   
  onClose() {
    this.dialogRef.close()
    this.service.stavkaForm.reset();
  }

  generisi() {
    this.onClose();
    this.router.navigate(['/listaRacuna'])
    
  }

  updateCena(cena) {
    if (cena.value === undefined) {
      this.service.stavkaForm.patchValue({ cena: 0 })
      this.service.stavkaForm.patchValue({ nazivMaterijala: '' })
    }
    else {
      this.serviceVrste.getCenaPoVrstiMaterijala(cena.value).subscribe(data => {
        this.service.stavkaForm.patchValue({ cena: data.toFixed(2) })
      })
      this.service.getVrsteMaterijalaPoVrstiMaterijalId(cena.value).subscribe(vm => {
        this.service.stavkaForm.patchValue({ nazivMaterijala: vm.naziv })
      })
    }
  }

  updateUkupnaCena(ukupnaCena) {
    this.serviceVrste.getCenaPoVrstiMaterijala(this.service.stavkaForm.get('vrstaMaterijalaId').value).subscribe(data => {
      this.service.stavkaForm.patchValue({ ukupno: data * this.service.stavkaForm.get('kolicina').value })
    })
  }

  onSubmit() {
   
    console.log(this.poslednjiId)
    this.service.stavkaForm.patchValue({ stavkaRacunaId: this.poslednjiId })
    this.service.postStavkeRacuna(this.service.stavkaForm.value).subscribe(data => {
        this.toastr.success("Uspesno ste dodali stavku na racun", "Uspeh")
        this.service.stavkaForm.reset({
          sifraRacuna: this.data.sifraRacuna,
          stavkaRacunaId: this.service.poslednjiIdStavke().subscribe(x => { this.poslednjiId = x + 1 })
           
        });
      },
        (error: any) => {
          this.toastr.warning('Nije moguce dodati novu stavku','Greska')
        })
  }
  
  
}
