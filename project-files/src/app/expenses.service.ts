import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  selectedExpense: any;
  readonly baseURL: string = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  insertExpense(exp: any) {
    return this.http.post(this.baseURL + "addExpense", exp);
  }

  getExpensesList(httpOptions) {
    return this.http.get(this.baseURL + "getAllExpenses", httpOptions);
  }

  updateExpense(exp: any) {
    return this.http.put(this.baseURL + `updateExpnse/${exp.id}`, exp);
  }

  deleteExpense(exp: any) {
    return this.http.delete(this.baseURL + `deleteExpense/${exp.id}`, exp);
  }

  login(user) {
    return this.http.post(this.baseURL + "signin", user);
  }
}
