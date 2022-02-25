import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CollaboratorService } from './collaborator.service';

describe('CollaboratorService', () => {
  let service: CollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CollaboratorService);
  });

  describe('Smoke tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('#getAll should be defined', () => {
      expect(service.getAll).toBeDefined();
    });
    it('#getById should be defined', () => {
      expect(service.getById).toBeDefined();
    });
    it('#create should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('#patch should be defined', () => {
      expect(service.patch).toBeDefined();
    });
    it('#delete should be defined', () => {
      expect(service.delete).toBeDefined();
    });
  });
});
