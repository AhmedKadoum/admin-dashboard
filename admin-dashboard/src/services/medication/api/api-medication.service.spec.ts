import { TestBed } from '@angular/core/testing';

import { ApiMedicaionService } from './api-medication.service';

describe('ApiMedicaionService', () => {
  let service: ApiMedicaionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMedicaionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
