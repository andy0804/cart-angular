import { Component, OnInit } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}
}
