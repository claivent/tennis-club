import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableService } from '../table.service';
import { Table } from '../table';
 

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.html'],
})
export class TableFormComponent implements OnInit {
  tables$: Observable<Table[]> = new Observable();

  table: any = {};

  @Input()
  initialState: BehaviorSubject<Table> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Table>();

  @Output()
  formSubmitted = new EventEmitter<Table>();

  @Output()
  tableDeleted = new EventEmitter<void>();

  tableForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get name() {
    return this.tableForm.get('name')!;
  }
  get party() {
    return this.tableForm.get('party')!;
  }
  get time() {
    return this.tableForm.get('time')!;
  }
  get id() {
    return this.tableForm.get('_id')!;
  }

  ngOnInit() {
    this.initialState.subscribe((table) => {
      this.tableForm = this.fb.group({
        name: [table.name, [Validators.required]],
        party: [table.party, [Validators.required, Validators.maxLength(6)]],
        time: [table.time, [Validators.required]],
      });
    });

    this.tableForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });

    this.fetchTables();
  }

  deleteTable(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tableService.deleteTable(id).subscribe({
        next: () => {
          this.tableDeleted.emit();
          this.router.navigate(['/tables']);
        },
      });
    }
  }


  // deleteTable(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.tableService.deleteTable(id).subscribe({
  //       next: () => this.fetchTables(),
  //     });
  //   }
  // }

  fetchTables(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.tableService.getTable(id).subscribe((table) => (this.table = table));
  }

  submitForm() {
    const formValue = this.tableForm.value;
    this.table = { ...formValue, _id: formValue._id };
    this.formSubmitted.emit(formValue);
  }
}