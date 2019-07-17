import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public imageUrl: string = "../assets/images/logo.png";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickOfExpenses() {
    
  }

}
