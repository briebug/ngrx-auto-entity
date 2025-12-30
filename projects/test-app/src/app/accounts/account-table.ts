import { Component, Input } from '@angular/core';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-account-table',
  standalone: true,
  imports: [],
  template: `
    <table>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (account of accounts; track account.id) {
        <tr>
          <td>{{ account.accountNumber }}</td>
          <td>{{ account.name }}</td>
          <td>{{ account.amount }}</td>
          <td></td>
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
export class AccountTableComponent {
  @Input({ required: true }) accounts: Account[];
}
