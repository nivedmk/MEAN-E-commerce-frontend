import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ItemService } from 'src/app/shared/services/item.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(
    public itemService: ItemService,
    private router: Router,
    private toastrService: ToastrService,
    private sessionService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.Token) {
      this.toastrService.warning('Please Login')
      this.router.navigateByUrl('/login');
    } else {
      this.itemService.refreshCartItems();
    }
  }

  onRemoveFromCart(id) {
    this.itemService.deleteCartItem(id);
  }
}