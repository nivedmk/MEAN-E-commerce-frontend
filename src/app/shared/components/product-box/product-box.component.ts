import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() product: any;

  constructor(
    private toastrService: ToastrService,
    public itemService: ItemService
  ) { }

  ngOnInit(): void {

  }

  addToWishList(product) {
    this.itemService.addToWishListAPI(product).subscribe(
      (res: any) => {
        if (res.message === 'SUCCESS') {
          this.toastrService.success('Added to Wishlist')
          this.itemService.refreshWishListItems()
        }
      }, err => {
        this.toastrService.error('Error. or item already present')
        console.log(err);
      }
    )
  }

  addToCart(product) {
    this.itemService.addToCartAPI(product).subscribe(
      (res: any) => {
        if (res.message === 'SUCCESS') {
          this.toastrService.success('Added to cart')
          this.itemService.refreshCartItems()
        }
      }, err => {
        this.toastrService.error('Error. or item already present')
        console.log(err);
      }
    )
  }

}
