import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
})
export class DropdownComponent implements OnInit {
  @Input() options: any;
  @Input() selectedValue: any;
  ngOnInit(): void {}

  onChange(newSortOrder: string) {
    this.selectedValue = newSortOrder;
  }
}
