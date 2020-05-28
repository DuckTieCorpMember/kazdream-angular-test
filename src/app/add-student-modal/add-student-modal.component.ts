import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModalComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {

  }

}
