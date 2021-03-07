import { AfterContentInit, Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, AfterContentInit {
  showLoader: boolean = false;
  ngOnInit() {
    this.showLoader = true;
  }

  ngAfterContentInit() {
    this.sharedService.notifySpinner$.subscribe((data: any) => {
      this.showLoader = data.flag;
    });
  }
  constructor(private sharedService: SharedService) {}
}
