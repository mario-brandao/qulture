import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CommentService);
  });

  describe('Smoke tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('#getByCollaborator should bew defined', () => {
      expect(service.getByCollaborator).toBeDefined();
    });
    it('#getById should bew defined', () => {
      expect(service.getById).toBeDefined();
    });
    it('#create should bew defined', () => {
      expect(service.create).toBeDefined();
    });
    it('#patch should bew defined', () => {
      expect(service.patch).toBeDefined();
    });
    it('#delete should bew defined', () => {
      expect(service.delete).toBeDefined();
    });
  });
});
