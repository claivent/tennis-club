import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Table } from './table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // private url = 'https://tennis-backend.herokuapp.com';
  private url = 'https://tenis-mnisek-e4b8f418024b.herokuapp.com/'
  //private url = 'http://localhost:5200';
  private tables$: Subject<Table[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshTables() {
    this.httpClient.get<Table[]>(`${this.url}/tables`).subscribe((tables) => {
      this.tables$.next(tables);
    });
  }

  getTables(): Subject<Table[]> {
    this.refreshTables();
    return this.tables$;
  }

  getTable(id: string): Observable<Table> {
    return this.httpClient.get<Table>(`${this.url}/tables/${id}`);
  }

  createTable(table: Table): Observable<string> {
    return this.httpClient.post(`${this.url}/tables`, table, {
      responseType: 'text',
    });
  }

  updateTable(id: string, table: Table): Observable<string> {
    return this.httpClient.put(`${this.url}/tables/${id}`, table, {
      responseType: 'text',
    });
  }

  deleteTable(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/tables/${id}`, {
      responseType: 'text',
    });
  }
}
