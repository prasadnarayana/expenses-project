import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';

let headerObj = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem("token"));

const httpOptions = { headers: headerObj };

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: any[];

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

  onEdit(expense: any) {
    this.router.navigate(["/addexpenses", {
      id: expense.id,
      task: expense.task,
      amount: expense.amount,
      date: expense.date,
      comment: expense.comment
    }]);
  }

  onDelete(expense: any) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.exService.deleteExpense(expense).subscribe((res) => {
        this.toastr.success("Deleted Successfully.");
        this.loadExpenses();
      });
    }
  }
}
