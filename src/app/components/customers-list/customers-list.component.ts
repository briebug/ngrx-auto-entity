import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../models';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];

  constructor() {}

  ngOnInit() {}
}
