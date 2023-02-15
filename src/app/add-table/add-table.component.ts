import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from '../table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css'],
})
export class AddTableComponent {
  constructor(private router: Router, private tableService: TableService) {}

  addTable(table: Table) {
    this.tableService.createTable(table).subscribe({
      next: () => {
        this.router.navigate(['/tables']);
      },
      error: (error) => {
        alert('Failed to create table');
        console.error(error);
      },
    });
  }
}
