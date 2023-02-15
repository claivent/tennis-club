import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../table';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.html'],
})
export class TableFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Table> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Table>();

  @Output()
  formSubmitted = new EventEmitter<Table>();

  tableForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.tableForm.get('name')!;
  }
  get party() {
    return this.tableForm.get('party')!;
  }
  get time() {
    return this.tableForm.get('time')!;
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
  }

  submitForm() {
    this.formSubmitted.emit(this.tableForm.value);
  }
}
