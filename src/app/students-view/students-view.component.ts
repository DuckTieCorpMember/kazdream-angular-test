import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentAPIService } from '../student-api.service';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss']
})
export class StudentsViewComponent implements OnInit {
  students: Student[];
  sizePerPage: number = 20;
  pages: number = 1;
  activePage:number = 1;
  pagesArray: number[];

  ss: Student = {
    id: 0,
    name: "",
    house: "",
    year: 0,
    score: 0,
  }
  constructor(
    private studentService: StudentAPIService,
    private memoryService: InMemoryDataService
  ) { }

  ngOnInit(): void {
    this.getStudents();
    let modal_t  = document.getElementById('add-modal')
        modal_t.classList.remove('sshow')
        modal_t.classList.add('hhidden');
  }

  getStudents(): void {
    this.studentService.getStudents()
    .subscribe(students => this.students = students);
  }

  filteredStudents(): Student[]{
    return this.students.slice(this.activePage*this.sizePerPage-this.sizePerPage, this.activePage*this.sizePerPage);
  }

  onKey(event: any) { // without type info
    if(event.target.value != 0 && event.target.value != null){
      this.sizePerPage = event.target.value;
      this.activePage = 1;
      this.pages = Math.ceil(this.students.length / this.sizePerPage);
      this.pagesArray = Array(this.pages).fill(Number).map((x,i) => i+1);
    } else {
      event.target.value = 1;
      this.onKey(event);
    }
  }

  studentsChanged(): void {
    this.getStudents();
    this.sizePerPage = 20;
    this.activePage = 1;
    this.pages = Math.ceil(this.students.length / this.sizePerPage);
    this.pagesArray = Array(this.pages).fill(Number).map((x,i) => i+1);
  }

  addStudent(): void{
    this.ss.id = this.memoryService.genId(this.students);
    this.studentService.addStudent(this.ss).subscribe();
    this.studentsChanged();
    this.cloaseAdd();
  }

  openAdd() : void {
    let modal_t  = document.getElementById('add-modal')
        modal_t.classList.remove('hhidden')
        modal_t.classList.add('sshow');
  }

  cloaseAdd(): void {
    let modal_t  = document.getElementById('add-modal')
        modal_t.classList.remove('sshow')
        modal_t.classList.add('hhidden');
    this.ss = {
      id: 0,
      name: "",
      house: "",
      year: 0,
      score: 0,
    }
  }

  onAddStudentKey(event: any, field: String) { // without type info
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
