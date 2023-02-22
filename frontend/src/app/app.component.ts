import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from './service/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  baseUrl = "http://localhost:3000/api/exchange/"
  oppoSuits: any = ['Men', 'Women', 'Boys', 'Inspiration']
  submitted = false;
  convertedAmount = 0;
  lastUpdatedTime: any;
  currencies = [];
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private matSnackbar: MatSnackBar,
    public loader:LoaderService
  ) { }
  currencyConvertorForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    amount:['', Validators.required]
  })

   ngOnInit(): void {
     this.getCurrencyList();
   }
   
  
  onSubmit() {
    this.submitted = true;
    const { from, to, amount } = this.currencyConvertorForm.value;
    console.log(from, to, amount, this.currencyConvertorForm);
    if (this.currencyConvertorForm.invalid || !from || !to || !amount) { 
      return;
    }
    this.http.get(this.baseUrl + `${from}/${to}/${amount}`).subscribe(
      (data: any) => { 
      this.convertedAmount = data.convertedAmount;
      },
      (err) => { this.snackPositionTopCenter("Somthing went wrong") }
    )
  }

    
  getCurrencyList() {
    this.http.get(this.baseUrl).subscribe(
      (data: any) => {
        this.currencies = data.listdata;
        this.lastUpdatedTime = new Date(this.currencies[0]["data"]["date"])
        console.log(data.listdata)
      },
      (err) => { this.snackPositionTopCenter("Somthing went wrong") }
    )
    }
    clearVal() { 
      this.currencyConvertorForm.reset();
      this.convertedAmount = 0;
  }
    snackPositionTopCenter(msg: string = "") {
    this.matSnackbar.open(msg, "Okay!", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

}
