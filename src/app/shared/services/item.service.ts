import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import * as globalVariables from "../config/global-variables";
import { FormBuilder } from "@angular/forms";
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
  ) { }
  ItemList: any = []

  imgURL = '/assets/images/file-upload.webp';

  wishListLength: number = null;
  cartItems: any;
  wishListItems: any[];

  form = this.formBuilder.group({
    ItemName: '',
    ItemPhoto: '',
    PhotoByteArray: '',
    Price: 0,
    Type: ''
  })

  refreshForm() {
    this.form.setValue({
      ItemName: '',
      ItemPhoto: '',
      Price: 0,
      PhotoByteArray: '',
      Type: ''
    })
  }

  deleteCartItem(id) {
    this.deleteCartItemAPI(id).subscribe(
      (res: any) => {
        if (res.message === 'SUCCESS') {
          this.toastrService.warning('Successfully removed')
          this.refreshCartItems();
        }
      }, err => {
        console.log(err);

      }
    )
  }


  deleteWishListItem(id) {
    this.deleteWishListItemAPI(id).subscribe(
      (res: any) => {
        if (res.message === 'SUCCESS') {
          this.toastrService.warning('Successfully removed')
          this.refreshWishListItems();
        }
      }, err => {
        console.log(err);
      }
    )
  }

  addToLocalStorage(cartItem) {
    // localStorage.setItem()
    // this.cartLength++;
  }

  refreshList(itemName: string) {
    this.getAllItems(itemName).subscribe((res) => {
      if (res != null) {
        this.ItemList = res;
        this.ItemList.forEach(element => {
          element.ItemPhoto = `${element.PhotoByteArray}`
        });
      }
    }, err => {
      console.log(err);

    })
  }

  refreshCartItems() {
    this.getAllinCartAPI().subscribe(
      (res: any) => {
        if (res != null) {
          this.cartItems = res;
          this.localStorageService.setCartItemLength(this.cartItems.length)
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  refreshWishListItems() {
    this.getAllinWishListAPI().subscribe(
      (res: any) => {
        if (res != null) {
          this.wishListItems = res;
        }
      },
      err => {
        console.log(err);
      }
    );
  }


  getAllItems(itemName: string = "") {
    const params = new HttpParams().set('ItemName', itemName)

    return this.http.get(globalVariables.baseURL + 'item/getall', { params })
  }

  addItemAPI() {
    const body = this.form.value;
    body.ItemPhoto = 'data:Image/*;base64,' + this.form.controls.ItemPhoto.value;
    return this.http.post(globalVariables.baseURL + 'item/add', this.form.value)
  }

  addToCartAPI(item, Qty = 1) {
    const body = {
      _id: item._id, Qty: Qty
    }
    return this.http.post(globalVariables.baseURL + 'cart/add', body)
  }


  getAllinCartAPI() {
    return this.http.get(globalVariables.baseURL + 'cart/getall')
  }

  deleteCartItemAPI(id) {
    return this.http.delete(globalVariables.baseURL + 'cart/delete/' + id)
  }

  getAllinWishListAPI() {
    return this.http.get(globalVariables.baseURL + 'wish-list/getall')

  }


  addToWishListAPI(item, Qty = 1) {
    const body = {
      _id: item._id, Qty: Qty
    }
    return this.http.post(globalVariables.baseURL + 'wish-list/add', body)
  }

  deleteWishListItemAPI(id) {
    return this.http.delete(globalVariables.baseURL + 'wish-list/delete/' + id)
  }

  // addToWishListAPI(_id) {
  //   return this.http.get(globalVariables.baseURL + 'item/getall')
  // }

}
