import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';
import { STUDENTS } from './mock-students';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  static studentService: any;

  createDb() {
    const students = STUDENTS;
    return {students};
  }

  // Overrides the genId method to ensure that a student always has an id.
  // If the students array is empty,
  // the method below returns the initial number (11).
  // if the students array is not empty, the method below returns the highest
  // student id + 1.
  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 11;
  }
}
