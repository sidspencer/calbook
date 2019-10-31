import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';

const routes: Routes = [
  { path: 'day-schedule/:dateString', component: DayScheduleComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
