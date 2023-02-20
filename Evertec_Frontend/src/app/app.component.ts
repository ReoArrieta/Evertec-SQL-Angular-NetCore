import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataInfoComponent } from './Dialog/dialogdatainfo/dialogdatainfo.component';
import { RequestDataInfo } from './Models/Resquest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './Dialog/dialogdelete/dialogdelete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface ImageElement {
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Evertec_Frontend';
  public foto: any;
  public data: RequestDataInfo[] = [];

  constructor(
    private _appService: AppService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.getDataInfo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  getDataInfo() {
    this._appService.Read().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogDataInfoComponent, {
      width: '410px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getDataInfo();
    });
  }

  openDialogEdit(model: RequestDataInfo) {
    const dialogRef = this._dialog.open(DialogDataInfoComponent, {
      width: '410px',
      data: model,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getDataInfo();
    });
  }

  openDialogDelete(id: number) {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      width: '238.1px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._appService.Delete(id).subscribe((res) => {
          if (res.success) {
            this._snackbar.open('Usuario eliminado con éxito', '', {
              duration: 5000,
              horizontalPosition: 'left',
            });
            this.getDataInfo();
          }
        });
      }
    });
  }

  columnsToDisplay = [
    'id',
    'name',
    'lastName',
    'birthDay',
    'maritalStatus',
    'hasSiblings',
    'acctions',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ImageElement | null = null;
}
