import { TestBed, inject } from '@angular/core/testing';

import { PalmerService } from './palmer.service';

describe('PalmerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PalmerService]
    });
  });

  it('should be created', inject([PalmerService], (service: PalmerService) => {
    expect(service).toBeTruthy();
  }));
});
