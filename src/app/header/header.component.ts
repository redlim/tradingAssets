import { Component } from '@angular/core';
import {Router } from '@angular/router'

@Component({
  selector: 'books-header',
  templateUrl:'header.component.html',
  styleUrls:['./header.component.css']
})

export class HeaderComponent {
  constructor(private router: Router){};
  title="Trading Assets";
  subtitle =  "The Master App for your Business";

  gotoAssets() {
    this.router.navigate(['/assets']);
  }
}
