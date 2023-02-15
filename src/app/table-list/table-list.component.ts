import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../table';
import { TableService } from '../table.service';
 

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();
 
  constructor(private tablesService: TableService) { }
  
  ngOnInit(): void {
    this.fetchTables();
  }
  
  deleteTable(id: string): void {
    this.tablesService.deleteTable(id).subscribe({
      next: () => this.fetchTables()
    });
  }
  
  private fetchTables(): void {
    this.tables$ = this.tablesService.getTables();
  }
 }