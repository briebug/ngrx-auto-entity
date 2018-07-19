import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  opened: boolean;

  constructor(private titleService: Title, private media: ObservableMedia) {}

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
