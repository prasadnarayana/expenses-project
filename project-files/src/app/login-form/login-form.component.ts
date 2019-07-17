import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public invalidUser: string = "";

  constructor(
    private router: Router, 
    private exService: ExpensesService
  ) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  onSubmit(user: any) {
    // if (user.uname == "admin" && user.password == "admin") {
    //   // console.log("Valid User");
    //   sessionStorage.setItem('UserStatus', 'Active');
    //   this.router.navigate(['expenses']);
    // } else {
    //   this.invalidUser = "Inavalid Username or Password";
    // }

    this.exService.login(user).subscribe(
      (res: any) => {
        if (res.hasOwnProperty("token")) {
          // console.log(res.token);
          sessionStorage.setItem('token', res.token);
          this.invalidUser = "";
          this.router.navigate(['expenses']);
        } else
          this.invalidUser = res.msg;
      },

      (error) => { console.log(error); }
    );
  }
}
