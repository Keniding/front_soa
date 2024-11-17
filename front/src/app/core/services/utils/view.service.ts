import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private currentViewSubject = new BehaviorSubject<string>('estadistica');
  currentView$ = this.currentViewSubject.asObservable();

  changeView(view: string): void {
    this.currentViewSubject.next(view);
  }
}
