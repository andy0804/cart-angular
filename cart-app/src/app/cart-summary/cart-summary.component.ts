import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.sass'],
})
export class CartSummaryComponent implements OnInit {
  cartDetails: any;
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
    console.log('akak', this.dropDownOptionsAvailable);
  }
  fetchData() {
    const url = `https://run.mocky.io/v3/ca987707-db46-419e-9178-2bbdde3c3762`;

    this.apiService.getRequest(url).then((response: any) => {
      console.log(response);
      this.cartDetails = response.cartDetails.cartItems;
      this.cartSummary = response.cartDetails.cartSummary;
      this.prepareDropDownValues(this.cartDetails);
    });
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
  }

  validate(event: any) {
    return event.key >= 1;
  }
}
