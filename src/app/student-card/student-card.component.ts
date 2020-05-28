import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';
import { StudentAPIService } from '../student-api.service';
import { StudentsViewComponent } from '../students-view/students-view.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  @Input()
  student: Student;
  ss: Student = {...this.student};

  @Output() changedEvent = new EventEmitter();

  constructor(private studentService: StudentAPIService) { }

  ngOnInit(): void {
    this.ss = {...this.student};
  }

  saveUpdatedStudent(): void{
    console.log(this.ss.name);
    this.studentService.updateStudent(this.ss).subscribe();
    this.changedEvent.emit(null);
  }

  deleteStudent(): void{
    this.studentService.deleteStudent(this.ss.id).subscribe();
    this.changedEvent.emit(null);
  }

  onKey(event: any, field: String) { // without type info
    switch(field){
      case "name":
        this.ss.name = event.target.value;
        break;
      case "house":
        this.ss.house = event.target.value;
        break;
      case "year":
        this.ss.year = event.target.value;
        break;
      case "score":
        this.ss.score = event.target.value;
        break;
    }
  }
}
