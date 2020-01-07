import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserlistViewModel } from "../common/models/userlist-view-model";
import {Router} from "@angular/router";
import {CommonService} from '../common/services/common.service'
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: UserlistViewModel;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    console.log(userId);
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['home']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''],
      Name: ['', Validators.required],
      Designation: ['', Validators.required],
      Salary: ['', Validators.required]
    });

    this._commonService.getItemById(userId)
      .subscribe( data => {        
        let getInfo=data['data'][0];
        this.editForm.patchValue(getInfo);
      });
  }
  onSubmit() {
   // stop here if form is invalid
   if (this.editForm.invalid) {
    return;
}
    this._commonService.updateRecord(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          debugger;
          console.log(data);
          if(data !=null)
          {
           if(data["status"] === 200) {
           alert('User updated successfully.');
           this.router.navigate(['home']);
           }else {
             alert('SomeThing wents wrong!Please try agin later.');
             this.router.navigate(['home']);
           }
          }else {
            alert('SomeThing wents wrong!Please try agin later.');
            this.router.navigate(['home']);
          }
        },
        error => {
          alert(error);
        });
  }

}
