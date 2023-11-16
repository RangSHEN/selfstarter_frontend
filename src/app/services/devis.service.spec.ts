import { TestBed } from '@angular/core/testing';

import { DevisService } from './devis.service';

describe('CoursesService', () => {
  let service: DevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
