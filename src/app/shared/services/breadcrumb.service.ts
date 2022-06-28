import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MenuItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private itemsSource = new BehaviorSubject<MenuItem[]>([]);

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem[]) {
    this.itemsSource.next(items);
  }

}
