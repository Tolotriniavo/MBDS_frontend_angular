import { TestBed } from '@angular/core/testing';

import { MatieresService } from './matieres.service';

describe('MatieresService', () => {
  let service: MatieresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatieresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
