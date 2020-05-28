import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCardComponent } from './student-card/student-card.component';
import { StudentsViewComponent } from './students-view/students-view.component';

const routes: Routes = [
  { path: 'detail/:id', component: StudentCardComponent },
  { path: 'students', component: StudentsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
