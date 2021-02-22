import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ItemService } from "../../../shared/services/item.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    public addItemService: ItemService,
    private toastrService: ToastrService,
  ) { }

  public imagepath: any;

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.addItemService.form.valid) {
      this.addItemService.addItemAPI().subscribe(res => {
        console.log('success');
        this.afterSubmit();
        this.toastrService.success('Item added')
      }, err => {
        console.log(err);

      })
    }
  }

  afterSubmit() {
    this.addItemService.form.reset();
    this.addItemService.refreshForm();
  }

  preview(file: any) {
    if (file.length == 0) {
      return;
    }
    const mimeType = file[0].type;
    if (mimeType.match(/image\/*/ == null)) {
      return
    }

    const reader = new FileReader();
    this.imagepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.addItemService.imgURL = reader.result as string;
    }
  }

}
