import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.sass'],
})
export class ShippingComponent implements OnInit {
  @Input() deliverOptions: any;
  @Input() selectedValue: any;
  @Input() storeOptions: any;
  @Input() storeId: any;
  storeDropDownList: any;
  storeSelectedValue: any;
  constructor() {}

  ngOnInit(): void {
    this.deliverOptions = this.deliverOptions.map((i: any) => i.shippingType);
    this.storeDropDownList = this.storeOptions.map(
      (i: any) => `${i.storeName} ${i.storeDistance} away`
    );
    const storeSelected = this.storeOptions.find(
      (i: any) => i.storeId === this.storeId
    );

    if (storeSelected) {
      this.storeSelectedValue = `${storeSelected.storeName} ${storeSelected.storeDistance} away`;
    } else {
      this.storeSelectedValue = 'Select';
    }
  }
}
