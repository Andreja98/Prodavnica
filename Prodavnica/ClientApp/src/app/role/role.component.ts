import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './role.service';
import { ToastrService } from 'ngx-toastr';
import { Rola } from '../modeli/Rola';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DodajRoluComponent } from './dodaj-rolu.component';
import { IzmeniRoluComponent } from './izmeni-rolu.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['rolaId', 'naziv', 'opcije'];
  role: Rola[];
  dataSource: MatTableDataSource<Rola>;
  expandedElement: Rola | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: RoleService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.service.getSvihRola().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(rolaId: number) {
    this.service.deleteRole(rolaId).subscribe(data => {
      this.toastr.success("Rola je uspesno obrisana", "Uspeh");
      this.service.getSvihRola().subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
    },
      (error: any) => { this.toastr.error("Nije moguce obrisati rolu", "Greska"); }
    );
  }

  dodajRolu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "28%";
    dialogConfig.height = "33%";
    let dialogRef = this.dialog.open(DodajRoluComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihRola().subscribe(x => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
  IzmeniRolu(rolaId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "28%";
    dialogConfig.height = "45%";
    dialogConfig.data = { rolaId }
    let dialogRef = this.dialog.open(IzmeniRoluComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.service.getSvihRola().subscribe(x => {
        this.dataSource = new MatTableDataSource(x)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    })
  }


}
