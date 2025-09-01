import { TestBed } from '@angular/core/testing';

import { ApiPatientService } from './api-patient.service';

describe('ApipatientService', () => {
  let service: ApiPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
