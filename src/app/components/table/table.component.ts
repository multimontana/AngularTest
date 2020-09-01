import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ITableDataModel} from '../../models/table-data.model';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource: MatTableDataSource<ITableDataModel>;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.apiService.getTableData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: ITableDataModel): void {
    this.dialog.open(ModalComponent, {
      maxWidth: '50vw',
      data
    });
  }

}
