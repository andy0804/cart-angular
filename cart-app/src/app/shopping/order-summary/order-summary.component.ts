import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.sass'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() cartSummary: any;
  constructor() {}

  ngOnInit(): void {}
}
