import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSummaryRoutingModule } from './cart-summary-routing.module';
import { ButtonComponent } from '../common/button/button.component';
import { OrderSummaryComponent } from '../shopping/order-summary/order-summary.component';
import { AppModule } from '../app.module';
import { CartSummaryComponent } from './cart-summary.component';
import { ProductDetailComponent } from '../shopping/product-detail/product-detail.component';
import { ShippingComponent } from '../shopping/shipping/shipping.component';
import { DropdownComponent } from '../common/widgets/dropdown/dropdown.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CartSummaryComponent,
    OrderSummaryComponent,
    ProductDetailComponent,
    ShippingComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, CartSummaryRoutingModule],
})
export class CartSummaryModule {}
