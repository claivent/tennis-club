import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Table } from '../../table';
import { TableService } from '../../table.service';
import { ScreenService } from '../../screen.service';

@Component({
  selector: 'app-edit-table.component.ts',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css'],
})
export class EditTableComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();

  table: BehaviorSubject<Table> = new BehaviorSubject<Table>({
    _id: '',
    name: '',
    party: '',
    time: '',
    date: 0,
    selectedDate: new Date(),
    selectedTime: '',
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
    private screenService: ScreenService

  ) {console.log('ED-constructor');}

  isSmallScreen = false;

  ngOnInit() {
    console.log('ED-ngOnInit');
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.tableService.getTable(id!).subscribe((table) => {
      this.table.next(table);
    });

    this.screenService.isSmallScreen.subscribe((isSmallScreen) => {
      this.isSmallScreen = isSmallScreen;
    });
  }

  deleteTable(id: string): void {
    this.tableService.deleteTable(id).subscribe({
      next: () => {
        this.fetchTables();
        this.router.navigate(['/tables']);
      },
      error: (error) => {
        alert('Failed to delete table');
        console.error(error);
      },
    });
  }
  editTable(table: Table) {
    this.tableService.updateTable(this.table.value._id || '', table).subscribe({
      next: () => {
        this.router.navigate(['/tables']);
      },
    });
  }
  private fetchTables(): void {
    this.tables$ = this.tableService.getTables();
    this.router.navigate(['/tables']);
  }
}
