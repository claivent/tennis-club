import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTableComponent } from './tables/add-table/add-table.component';
import { EditTableComponent } from './tables/edit-table/edit-table.component';
import { HomeComponent } from './tables/home/home.component';
import { TableComponent } from './tables/table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tables', component: TableComponent },
  { path: 'tables/new', component: AddTableComponent },
  { path: 'tables/edit/:id', component: EditTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
