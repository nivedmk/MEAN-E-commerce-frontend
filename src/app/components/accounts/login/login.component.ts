import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ItemService } from 'src/app/shared/services/item.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { AuthenticationService } from "../../../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private sessionService: SessionStorageService,
    private itemService: ItemService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    if(this.sessionService.Token) {
      this.router.navigateByUrl('/home')
    }
  }

  onFormSubmit() {
    if (this.auth.logInForm.valid) {
      this.auth.logInAPI().subscribe(
        (res: any) => {
          if (res.message === 'SUCCESS') {
            this.toastrService.success('LogIn success')
            this.sessionService.setToken(res.token)
            this.sessionService.setUserName(res.user.name)
            console.log('Success');
            this.itemService.refreshCartItems();
            this.auth.logInForm.reset();
            this.router.navigateByUrl('/home');
          }
        }, err => {
          this.toastrService.error('Error. Or invalid credentials')
          console.log(err);
        }
      )

    }
  }
}
