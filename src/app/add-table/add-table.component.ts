import { Component } from '@angular/core';
import { Table } from '../table';
import { TableService } from '../table.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css'],
})
export class AddTableComponent {
  constructor(private router: Router, private tableService: TableService) {}

  getDate(): string {
    const date = new Date();
    if (date.getHours() >= 14) {
      date.setDate(date.getDate() + 1);
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

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
