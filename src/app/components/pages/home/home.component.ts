import { Component, OnInit } from '@angular/core';

import { ItemService } from "../../../shared/services/item.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public itemService: ItemService
  ) { }

  searchByProductName: string = ''

  filterArg: string = ''

  ngOnInit(): void {
    this.itemService.refreshList(this.searchByProductName);
  }
  onKeyUp() {
    this.itemService.refreshList(this.searchByProductName);
  }

  onChangeFilter(event: any, item: any) {
    this.filterArg = event.target.value
  }

  filterData = [
    {
      label: 'Communication',
      value: 'communication',
      checked: false
    },
    {
      label: 'Weapons',
      value: 'weapons',
      checked: false
    },
    {
      label: 'Others',
      value: 'others',
      checked: false
    },
    {
      label: 'All',
      value: '',
      checked: false
    }
  ]

}
