import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { AddTableComponent } from './add-table/add-table.component';
import { EditTableComponent } from './edit-table/edit-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: TableListComponent },
  { path: 'tables/new', component: AddTableComponent },
  { path: 'tables/edit/:id', component: EditTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
