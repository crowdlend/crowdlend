import { TestBed, inject } from '@angular/core/testing';

import { CrowdLendService } from './crowd-lend.service';

describe('CrowdLendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrowdLendService]
    });
  });

  it('should be created', inject([CrowdLendService], (service: CrowdLendService) => {
    expect(service).toBeTruthy();
  }));
});
