import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    // this.sharedService.notifyRoute(curren)
  }
}
