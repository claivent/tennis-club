import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import {Table, TableOutput} from '../../table';
import { TableService } from '../../table.service';
import { ScreenService } from '../../screen.service';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {fromUnixTimestamp, getDate2} from "../../converter.service";

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
    date: 0,
    selectedDate: new Date(),
    selectedTime: '',
  });

  tableOutput: BehaviorSubject<TableOutput> = new BehaviorSubject<TableOutput>({
    _id: '',
    name: '',
    party: '',
    time: '',
    date: 0,
    selectedDate: new Date(),
    selectedTime: '',
  });

  tables$: Observable<Table[]> = new Observable();  // Vytvoření proměnné pro data z API

  dataSource: MatTableDataSource<Table> = new MatTableDataSource<Table>([]);  // Vytvoření proměnné pro data z API

  displayedColumns: string[] = ['name', 'party', 'time', 'date'];   // Nastavení zobrazených sloupců

  @ViewChild(MatSort) sort: MatSort = new MatSort(); // Vytvoření proměnné pro řazení tabulky

  constructor(private tablesService: TableService, private screenService: ScreenService) {}

  isSmallScreen = false;

  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables) => {    // Získání dat z API
      const obj = tables;
      for (const item of obj) { // Procházení všech položek v tabulce
        const tmp = fromUnixTimestamp(item.date);
        if (tmp) { // Ověření, že tmp není null
          item["selectedDate"] = tmp.selectedDate || null; // Přiřazení selectedDate
          item["time"] = tmp.selectedTime || ""; // Přiřazení selectedTime
        }
      }

      this.dataSource.data = obj;  // Přiřazení dat do dataSource
      this.dataSource.sort = this.sort; // Přiřazení řazení do dataSource

      console.log('TBLES-obj', obj);
      console.log('TBLES-tables', tables);
      console.log('TBLES-DS', this.dataSource.data);



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


  protected readonly getDate2 = getDate2;
}
