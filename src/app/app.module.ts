import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentsViewComponent } from './students-view/students-view.component';
import { MessagesComponent } from './messages/messages.component';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentCardComponent,
    StudentsViewComponent,
    MessagesComponent,
    AddStudentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
