import { TestBed } from '@angular/core/testing';

import { SearchCardService } from './search-card.service';

describe('SearchCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchCardService = TestBed.get(SearchCardService);
    expect(service).toBeTruthy();
  });
});
