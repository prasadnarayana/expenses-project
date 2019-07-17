import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: "", component: LoginFormComponent },
  { path: "expenses", component: ExpensesComponent },
  { path: "addexpenses", component: AddExpensesComponent },
  { path: "contact", component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
