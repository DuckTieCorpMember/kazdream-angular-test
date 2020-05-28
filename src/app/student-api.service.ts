import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Student } from './student';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAPIService {

  private studentsURL = 'api/students';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsURL)
      .pipe(
        tap(_ => this.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }

  /** GET student by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Student> {
    const url = `${this.studentsURL}/?id=${id}`;
    return this.http.get<Student[]>(url)
      .pipe(
        map(students => students[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} student id=${id}`);
        }),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  /** GET student by id. Will 404 if id not found */
  getHero(id: number): Observable<Student> {
    const url = `${this.studentsURL}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getHero id=${id}`))
    );
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsURL, student, this.httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student w/ id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsURL}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsURL, student, this.httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}
