import { TestBed } from '@angular/core/testing';
import { EntityService } from './entity.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AUTO_ENTITY_CONFIG, AutoEntityServiceConfig } from './config';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EntityService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('EntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AUTO_ENTITY_CONFIG,
          useValue: {
            urlPrefix: 'http://example.com/default'
          }
        }
      ]
    });
  });

  it('should allow instantiation with an HttpClient and config', () => {
    const http = TestBed.inject(HttpClient);
    const config = {
      urlPrefix: 'http://example.com/custom'
    } satisfies AutoEntityServiceConfig;
    const service = TestBed.runInInjectionContext(() => new EntityService(http, config));
    expect(service).toBeDefined();
    expect(service).toHaveProperty('http');
    expect(service).toHaveProperty('config');
    expect((service as any).config.urlPrefix).toBe('http://example.com/custom');
  });

  it('should allow instantiation without arguments', () => {
    const service = TestBed.runInInjectionContext(() => new EntityService());
    expect(service).toBeDefined();
    expect(service).toHaveProperty('http');
    expect(service).toHaveProperty('config');
    expect((service as any).config.urlPrefix).toBe('http://example.com/default');
  });
});
