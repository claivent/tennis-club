import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-edit-table.component.ts',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css'],
})
export class EditTableComponent implements OnInit {
  table: BehaviorSubject<Table> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.tableService.getTable(id!).subscribe((table) => {
      this.table.next(table);
    });
  }

  editTable(table: Table) {
    this.tableService.updateTable(this.table.value._id || '', table).subscribe({
      next: () => {
        this.router.navigate(['/tables']);
      },
      error: (error) => {
        alert('Failed to update table');
        console.error(error);
      },
    });
  }
}
