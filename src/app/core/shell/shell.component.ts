import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderManagerService } from 'src/app/+orders/services/order-manager.service';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  opened: boolean;

  constructor(
    private titleService: Title,
    private media: MediaObserver,
    private orderManagerService: OrderManagerService,
    private router: Router
  ) {}

  handleTitleClick() {
    this.router.navigateByUrl('/home');
  }

  handleCreateOrder() {
    this.orderManagerService.openOrderFormDialog();
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
