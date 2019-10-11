import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IExpenses } from './expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  selectedExpense: any;
  readonly baseURL: string = "http://localhost:3000/"

  constructor(private _http: HttpClient) { }

  insertExpense(exp: IExpenses, httpOptions) {
    return this._http.post(this.baseURL + "addExpense", exp, httpOptions);
  }

  getExpensesList(httpOptions): Observable<IExpenses[]> {
    return this._http.get<IExpenses[]>(this.baseURL + "getAllExpenses", httpOptions);
  }

  updateExpense(exp: IExpenses, httpOptions) {
    return this._http.put(this.baseURL + `updateExpnse/${exp.id}`, exp, httpOptions);
  }

  deleteExpense(exp: IExpenses, httpOptions) {
    return this._http.delete(this.baseURL + `deleteExpense/${exp.id}`, httpOptions);
  }

  login(user) {
    return this._http.post(this.baseURL + "signin", user);
  }
}
