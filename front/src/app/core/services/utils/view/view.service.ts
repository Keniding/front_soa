// src/app/core/services/utils/view/view.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private currentViewSubject = new BehaviorSubject<string>('activities');
  currentView$ = this.currentViewSubject.asObservable();

  changeView(view: string) {
    this.currentViewSubject.next(view);
  }
}
