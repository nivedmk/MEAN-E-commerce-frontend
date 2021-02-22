import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/accounts/cart/cart.component';
import { CreateAccountComponent } from './components/accounts/create-account/create-account.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { WishListComponent } from './components/accounts/wish-list/wish-list.component';
import { AddItemComponent } from './components/pages/add-item/add-item.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'add',
    component: AddItemComponent,
  },
  {
    path: 'create-acount',
    component: CreateAccountComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'wish-list',
    component: WishListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
