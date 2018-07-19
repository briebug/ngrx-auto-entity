import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from 'models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  @Input() customers: Customer[];

  @Output() delete = new EventEmitter<Customer>();
}
