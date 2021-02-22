import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ItemService } from 'src/app/shared/services/item.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  constructor(
    public itemService: ItemService,
    private router: Router,
    private toastrService: ToastrService,
    private sessionService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.Token) {
      this.toastrService.warning('Please Login')
      this.router.navigateByUrl('/login')
    } else {
      this.itemService.refreshWishListItems();
    }
  }

  onRemoveFromWishList(id) {
    this.itemService.deleteWishListItem(id);
  }

}
