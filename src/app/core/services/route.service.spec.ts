import { inject, TestBed } from '@angular/core/testing';
import { Route } from '../services/route.service';
import { ShellComponent } from '../shell/shell.component';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Route]
    });
  });

  beforeEach(inject([Route], (_route: Route) => {
    route = _route;
  }));

  describe('withShell', () => {
    it('should create routes as children of shell', () => {
      const testRoutes = [{ path: 'test' }];

      const result = Route.withShell(testRoutes);

      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
