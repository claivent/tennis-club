import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Table } from '../table';
import { TableService } from '../table.service';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();

  dataSource: MatTableDataSource<Table> = new MatTableDataSource<Table>([]);

  displayedColumns: string[] = ['name', 'party', 'time', 'edit'];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private tablesService: TableService) {}

  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables) => {
      this.dataSource.data = tables;
      this.dataSource.sort = this.sort;
    });
  }

  sortTable(sort: Sort): void {
    this.dataSource.data;
  }

  private fetchTables(): void {
    this.tables$ = this.tablesService.getTables();
  }
}