import { TestBed } from '@angular/core/testing';

import { PythonBackendService } from './python-backend.service';

describe('PythonBackendService', () => {
  let service: PythonBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
