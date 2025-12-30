import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Customer } from '../models/customer.model';
import { EntityIdentity } from '@briebug/ngrx-auto-entity';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [],
  template: `
    <table>
      <thead>
        <tr>
          <th>Active</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (customer of customers; track customer.id) {
        <tr>
          <td>
            <input type="checkbox" [checked]="customer.isActive" disabled />
          </td>
          <td>{{ customer.name }}</td>
          <td>
            <button type="button" (click)="view.emit(customer.id)">View</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    table {
      border-spacing: 0.5rem;
    }
  `
})
export class CustomerTableComponent {
  @Input({ required: true }) customers: Customer[];

  @Output()
  readonly view = new EventEmitter<EntityIdentity>();
  // readonly view = output<EntityIdentity>();
}
