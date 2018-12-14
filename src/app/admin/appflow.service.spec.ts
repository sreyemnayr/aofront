import { TestBed } from '@angular/core/testing';

import { AppflowService } from './appflow.service';

describe('AppflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppflowService = TestBed.get(AppflowService);
    expect(service).toBeTruthy();
  });
});
