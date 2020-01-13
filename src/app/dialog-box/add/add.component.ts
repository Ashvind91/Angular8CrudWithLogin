import { Component, OnInit ,Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from '../../common/services/common.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserlistViewModel } from "../../common/models/userlist-view-model"
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserlistViewModel, private _commonService: CommonService) { }

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

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this._commonService.addItem(this.data);
  }
}
