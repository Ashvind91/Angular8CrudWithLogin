import { Component, OnInit,Input  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserlistViewModel } from "../common/models/userlist-view-model";
import {Router} from "@angular/router";
import {CommonService} from '../common/services/common.service'
import {first} from "rxjs/operators";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  //template: `Say {{ childMessage }}`,
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  @Input() childMessage: any;
  constructor(private formBuilder: FormBuilder,private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      Name: ['',  Validators.required],
      Designation: ['', Validators.required],
      Salary: ['', Validators.required]
    });

  }
  get fval() {
    return this.addForm.controls;
    }
  onSubmit() {
    // stop here if form is invalid
   if (this.addForm.invalid) {
    return;
   }
    this._commonService.insertRecord(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['home']);
      });
  }
  onReset() {
    this.addForm.reset();
  }
  onCancel()
  {
    this.router.navigate(['home']);
  }
}
