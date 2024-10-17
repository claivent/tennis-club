import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableService } from '../../table.service';
import { Table } from '../../table';
import { unixToTime, timeToUnix, getUnixTimestamp, fromUnixTimestamp} from "../../converter.service";


@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.html'],
})
export class TableFormComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  unixDate: number =0;


  private tempDate!: any;

  /*updateUnixDate() {
    const date = this.tableForm.get('date')?.value;
    const time = this.selectedTime;

    if (date && time) {
      const unixTimestamp = getUnixTimestamp(date, time);
      this.unixDate = unixTimestamp;
      this.tableForm.patchValue({ date: unixTimestamp });
    }
  }*/


  /*// Funkce pro přijetí změny data
  onDateChange(newDate: Date | null): void {
    this.selectedDate =  newDate;
    this.tableForm.patchValue({ date: this.unixDate });
    this.updateUnixDate();


  }*/

  /*// Funkce pro přijetí změny času
  onTimeChange(newTime: string | null): void {
    this.selectedTime = newTime;
   // this.selectedTime = newTime;
    this.updateUnixDate();
  }*/

  onUnixInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Řekni TS, že target je HTMLInputElement
    const unixValue = inputElement.value ? parseFloat(inputElement.value) : 0; // Ošetři hodnotu pro případ, že je null
    this.onUnixChange(unixValue);
  }

  // Funkce pro přijetí změny unixového času z DatePicker2Component
  onUnixChange(unixTimestamp: number): void {
    this.unixDate = unixTimestamp;
    this.tableForm.patchValue({ date: unixTimestamp })
    console.log("TFC", this.unixDate);
  }

  ngonchange(){
    this.unixDate = this.tableForm.value;
    console.log("TFC-ngonChange", this.unixDate);

  }








  tables$: Observable<Table[]> = new Observable();

  table: BehaviorSubject<Table> = new BehaviorSubject<Table>({
    _id: '',
    name: '',
    party: '',
    time: '',
    date: 0,
  });

  @Input()
  initialState: BehaviorSubject<Table> = new BehaviorSubject<Table>({
    _id: '',
    name: '',
    party: '',
    time: '',
    date: 0,
  });




  @Input() showDeleteButton = false;

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
    private router: Router,

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
  get date() {
    return this.tableForm.get('date')!;
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
        date:[table.date, [Validators.required]],
      });

      /*this.tempDate = fromUnixTimestamp(this.tableForm.value.date);
      if(this.tempDate !== null){this.selectedDate = this.tempDate.selectedDate;
        this.selectedTime =this.tempDate.selectedTime;
        this.unixDate = this.tableForm.value.date;}*/



    });





    this.tableForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);


    });

    this.fetchTables();


  }
  /*ngDoCheck() {
    this.onTimeChange(this.tableForm.value.time);
  }*/



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

  fetchTables(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.tableService.getTable(id).subscribe((table) => {
      this.table.next(table);
    });
  }

  submitForm() {
    const formValue = this.tableForm.value;
    this.table = { ...formValue, _id: formValue._id };
    this.formSubmitted.emit(formValue);
  }


}
