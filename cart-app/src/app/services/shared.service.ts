import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {
  public notifySpinner$: any = new Subject<any>();
  public notifyRoute$: any = new Subject<any>();

  constructor() {}

  public notifySpinner(obj: any): void {
    this.notifySpinner$.next(obj);
  }
}
