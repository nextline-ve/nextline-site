import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Observer {

  private fooSubject = new Subject<any>();

  create(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }
}
