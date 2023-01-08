import { TestBed } from '@angular/core/testing';

import { ReloadDatasService } from './reload-datas.service';

describe('ReloadDatasService', () => {
  let service: ReloadDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
