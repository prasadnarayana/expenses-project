import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { IExpenses } from '../expenses';

let headerObj = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem("token"));

const httpOptions = { headers: headerObj };

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: IExpenses[];

  constructor(
    private router: Router, 
    private exService: ExpensesService, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem("token"))
      this.loadExpenses();
    else
      this.router.navigate(['']);
  }

  addExpense() {
    this.router.navigate(['/addexpenses', {
      id: null,
      task: "",
      amount: "",
      date: "",
      comment: ""
    }]);
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  loadExpenses() {
    this.exService.getExpensesList(httpOptions).subscribe((res) => {
      this.expenses = res as any;
    });
  }

  onEdit(expense: IExpenses) {
    this.router.navigate(["/addexpenses", {
      id: expense.id,
      task: expense.task,
      amount: expense.amount,
      date: expense.date,
      comment: expense.comment
    }]);
  }

  onDelete(expense: IExpenses) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.exService.deleteExpense(expense, httpOptions).subscribe((res) => {
        this.toastr.success("Deleted Successfully.");
        this.loadExpenses();
      });
    }
  }
}
