import { TestBed } from '@angular/core/testing';

import { TrxnPdfDocDownloadService } from './trxn-pdf-doc-download.service';

describe('TrxnPdfDocDownloadService', () => {
  let service: TrxnPdfDocDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrxnPdfDocDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
