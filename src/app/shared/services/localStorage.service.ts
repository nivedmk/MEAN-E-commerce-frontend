import { Injectable } from '@angular/core';
import * as globalVariables from "../config/global-variables";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {

    }

    get CartItemLength() {
        return localStorage.getItem('cartItemLength');
    }

    setCartItemLength(length) {
        localStorage.setItem('cartItemLength', length)
    }

    removeCartItemLength() {
        localStorage.removeItem('cartItemLength')
    }

}
