import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.sass'],
})
export class CartSummaryComponent implements OnInit {
  cartDetails: any;
  cartDetailsOriginal: any;
  cartSummary: any;
  dropDownOptionsAvailable = [{ shippingType: '', shippingMethod: '' }];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  prepareDropDownValues(cartItems: any) {
    let dropDownList = [{ shippingType: 'Select', shippingMethod: '' }];
    dropDownList = Array.from(
      cartItems.map((i: any) => {
        return {
          shippingType: i.shippingType,
          shippingMethod: i.shippingMethod,
        };
      })
    );
    const map = {} as any;
    for (let item of dropDownList) {
      if (!map[item.shippingMethod]) {
        map[item.shippingMethod] = item.shippingMethod;
        this.dropDownOptionsAvailable.push(item);
      }
    }
  }
  fetchData() {
    const url = `https://run.mocky.io/v3/ca987707-db46-419e-9178-2bbdde3c3762`;

    this.apiService.getRequest(url).then((response: any) => {
      this.cartDetails = response.cartDetails.cartItems;
      this.cartDetailsOriginal = JSON.parse(JSON.stringify(this.cartDetails));
      this.cartSummary = response.cartDetails.cartSummary;
      this.cartSummary.showCheckoutButton = response.showCheckoutButton;
      this.prepareDropDownValues(this.cartDetails);
    });
  }
  removeItem(itemId: any) {
    this.cartDetails = this.cartDetails.filter((i: any) => i.itemId !== itemId);
    this.updateTotal();
  }
  increment(item: any, event: any, index: any) {
    event.preventDefault();

    if (this.cartDetails[index]['itemQuantity'] < 20) {
      this.cartDetails[index]['itemQuantity'] =
        ~~this.cartDetails[index]['itemQuantity'] + 1;
      this.updateTotalPrice(this.cartDetails[index]);
      this.updateTotal();
    }
  }

  decrement(item: any, event: any, index: any) {
    event.preventDefault();

    if (this.cartDetails[index]['itemQuantity'] > 1) {
      this.cartDetails[index]['itemQuantity'] =
        ~~this.cartDetails[index]['itemQuantity'] - 1;
      this.updateTotalPrice(this.cartDetails[index]);
      this.updateTotal();
    }
  }

  updateTotalPrice(item: any) {
    item['itemAmount']['itemTotalPrice'] = (
      item['itemQuantity'] * item['itemAmount']['itemPrice']
    ).toFixed(2);
  }
  updateTotal() {
    const subTotal = this.cartDetails.reduce(
      (accum: number, item: any) =>
        accum + parseFloat(item['itemAmount']['itemTotalPrice']),
      0
    );
    this.cartSummary.subtotal = subTotal.toFixed(2);
    this.cartSummary.cartTotal = parseFloat(
      subTotal + this.cartSummary.shippingAmount
    ).toFixed(2);
    if (this.cartDetails.length == 0) {
      this.cartSummary.shippingAmount = 0;
      this.cartSummary.cartTotal = 0;
    }
  }

  validate(event: any) {
    return event.key >= 1;
  }
}
