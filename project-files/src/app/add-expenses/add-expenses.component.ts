import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  constructor(private exService: ExpensesService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();

    this.route.paramMap.subscribe((params: ParamMap) => {
      let dt = new Date(params.get("date"));
      this.exService.selectedExpense = {
        id: parseInt(params.get("id")),
        task: params.get("task"),
        amount: params.get("amount") == "" ? "" : parseInt(params.get("amount")),
        date: dt,
        comment: params.get("comment")
      };
      //console.log(this.exService.selectedExpense);
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.id) {
      this.exService.updateExpense(form.value).subscribe((res) => {
        form.reset();
        //console.log(res);
        this.toastr.success("Updated Successfully.");
      });
    } else {
      this.exService.insertExpense(form.value).subscribe((res) => {
        form.reset();
        //console.log(res);
        this.toastr.success("Inserted Successfully.");
      });
    }
  }

}
