import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Table } from '../table';
import { TableService } from '../table.service';
import { ScreenService } from '../screen.service';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  table: BehaviorSubject<Table> = new BehaviorSubject<Table>({
    _id: '',
    name: '',
    party: '',
    time: '',
    date: '',
  });

  tables$: Observable<Table[]> = new Observable();

  dataSource: MatTableDataSource<Table> = new MatTableDataSource<Table>([]);

  displayedColumns: string[] = ['name', 'party', 'time'];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private tablesService: TableService, private screenService: ScreenService) {}

  isSmallScreen = false;

  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables) => {
      this.dataSource.data = tables;
      this.dataSource.sort = this.sort;
    });
    this.screenService.isSmallScreen.subscribe(isSmallScreen => {
      this.isSmallScreen = isSmallScreen;
    });
  }

  sortTable(sort: Sort): void {
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

  const isAsc = sort.direction === 'asc';

  data.sort((a, b) => {
    const valueA = a[sort.active];
    const valueB = b[sort.active];
    return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
  });
}

  private fetchTables(): void {
    this.tables$ = this.tablesService.getTables();
  }
  getDate(): string {
    const date = new Date();
    if (date.getHours() >= 14) {
      date.setDate(date.getDate() + 1);
    }
    return date.toLocaleDateString('cs-CZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
