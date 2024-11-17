import { Component } from '@angular/core';
import {ViewService} from "../../../core/services/utils/view.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  currentView: string = 'estadistica';

  constructor(private viewService: ViewService) {
    this.viewService.currentView$.subscribe(view => {
      this.currentView = view;
    });
  }

  changeView(view: string) {
    this.viewService.changeView(view);
  }
}
