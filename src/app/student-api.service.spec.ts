import { TestBed } from '@angular/core/testing';

import { StudentAPIService } from './student-api.service';

describe('StudentAPIService', () => {
  let service: StudentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
