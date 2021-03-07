import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.sass'],
})
export class CartSummaryComponent implements OnInit {
  cartDetails: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const url = `https://run.mocky.io/v3/ca987707-db46-419e-9178-2bbdde3c3762`;

    this.apiService.getRequest(url).then((response: any) => {
      console.log(response);
      this.cartDetails = response.cartDetails.cartItems;
    });
  }

  increment(item: any, event: any, index: any) {
    this.cartDetails[index]['itemQuantity'] =
      ~~this.cartDetails[index]['itemQuantity'] + 1;
    event.preventDefault();
  }

  decrement(item: any, event: any, index: any) {
    event.preventDefault();

    if (this.cartDetails[index]['itemQuantity'] > 1) {
      this.cartDetails[index]['itemQuantity'] =
        ~~this.cartDetails[index]['itemQuantity'] - 1;
    }
  }

  validate(event: any) {
    return event.key >= 1;
  }
}
