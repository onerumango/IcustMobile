import { TestBed } from '@angular/core/testing';

import { FingerPrintCaptureService } from './finger-print-capture.service';

describe('FingerPrintCaptureService', () => {
  let service: FingerPrintCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FingerPrintCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
