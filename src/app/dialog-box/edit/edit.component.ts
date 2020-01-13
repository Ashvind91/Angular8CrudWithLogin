import { Component, OnInit,Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonService} from '../../common/services/common.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserlistViewModel } from "../../common/models/userlist-view-model"
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public data: UserlistViewModel,private _commonService:CommonService,private router:Router) { }
  dialog:any;
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    // emppty stuff
  }
  stopEdit(): void {
    debugger;
    console.log(this.data);
    this._commonService.updateItem(this.data);
  }
}
