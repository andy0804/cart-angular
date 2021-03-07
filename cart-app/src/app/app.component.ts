import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  showLoader: boolean;
  subscriptions: any;
  constructor(private sharedService: SharedService) {
    this.showLoader = false;
  }
  ngOnInit() {}

  ngAfterContentInit() {
    this.subscriptions = this.sharedService.notifySpinner$.subscribe(
      (data: any) => {
        this.updateSpinner(data.flag);
      }
    );
  }
  updateSpinner(flag: any) {
    setTimeout(() => {
      this.showLoader = flag;
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
