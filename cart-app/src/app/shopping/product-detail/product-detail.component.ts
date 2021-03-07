import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit {
  @Input() cartDetails: any;
  wishList: any = [];
  constructor(
    private sharedService: SharedService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.wishList = this.sharedService.getWishList();
  }

  toggleWishList(event: any, cartDetails: any) {
    const currentElement = event.target.id;
    if (
      this.elRef.nativeElement
        .querySelector(`#${currentElement}`)
        .classList.contains('fa-heart-o')
    ) {
      this.addToWishList(currentElement, cartDetails);
    } else {
      this.removeWishList(currentElement, cartDetails);
    }
  }

  addToWishList(currentElement: any, cartDetails: any) {
    this.elRef.nativeElement
      .querySelector(`#${currentElement}`)
      .classList.remove('fa-heart-o');
    this.elRef.nativeElement
      .querySelector(`#${currentElement}`)
      .classList.add('fa-heart');
    let wList = this.sharedService.getWishList();
    if (!wList.find((i: any) => i.itemId === cartDetails.itemId)) {
      this.sharedService.setWishList(cartDetails);
    }
  }

  removeWishList(currentElement: any, cartDetails: any) {
    this.elRef.nativeElement
      .querySelector(`#${currentElement}`)
      .classList.remove('fa-heart');
    this.elRef.nativeElement
      .querySelector(`#${currentElement}`)
      .classList.add('fa-heart-o');

    let wList = this.sharedService.getWishList();
    wList = wList.filter((i: any) => i.itemId !== cartDetails.itemId);
    this.sharedService.setWishList(wList);
  }
}
