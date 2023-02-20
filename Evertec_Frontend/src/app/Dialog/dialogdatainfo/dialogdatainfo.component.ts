import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { RequestDataInfo } from 'src/app/Models/Resquest';

@Component({
  selector: 'app-dialogdatainfo',
  templateUrl: './dialogdatainfo.component.html',
  styleUrls: ['./dialogdatainfo.component.scss'],
})
export class DialogDataInfoComponent {
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DialogDataInfoComponent>,
    private _snackBar: MatSnackBar,
    private _appService: AppService,
    @Inject(MAT_DIALOG_DATA) public dataInfo: RequestDataInfo
  ) {
    if (this.dataInfo !== null) {
      this.archivo = dataInfo.userPhoto;
      this.formDataInfo.setValue({
        id: dataInfo.id,
        name: dataInfo.name,
        lastName: dataInfo.lastName,
        birthDay: dataInfo.birthDay,
        userPhoto: dataInfo.userPhoto,
        maritalStatus: dataInfo.maritalStatus,
        hasSiblings: dataInfo.hasSiblings,
      });
    }
  }

  formDataInfo = this._fb.group({
    id: 0,
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDay: [new Date(), Validators.required],
    userPhoto: [''],
    maritalStatus: [1, Validators.required],
    hasSiblings: [false, Validators.required],
  });

  close() {
    this._dialogRef.close();
  }

  public archivo: any;

  getFile(event: any): any {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.archivo = reader.result;
    };
  }

  add() {
    let form = this.formDataInfo;
    if (form.valid) {
      const model: RequestDataInfo = {
        id: 0,
        name: form.controls.name.value as string,
        lastName: form.controls.lastName.value as string,
        birthDay: form.controls.birthDay.value as Date,
        userPhoto: this.archivo.toString(),
        maritalStatus: form.controls.maritalStatus.value as number,
        hasSiblings: form.controls.hasSiblings.value as boolean,
      };
      this._appService.Create(model).subscribe((res) => {
        if (res.success) {
          this._dialogRef.close();
          this._snackBar.open('Usuario agregado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        } else {
          this._snackBar.open('Error -> Usuario no agregado ', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  edit() {
    let form = this.formDataInfo;
    if (form.valid) {
      const model: RequestDataInfo = {
        id: form.controls.id.value as number,
        name: form.controls.name.value as string,
        lastName: form.controls.lastName.value as string,
        birthDay: form.controls.birthDay.value as Date,
        userPhoto: this.archivo.toString(),
        maritalStatus: form.controls.maritalStatus.value as number,
        hasSiblings: form.controls.hasSiblings.value as boolean,
      };
      this._appService.Update(model).subscribe((res) => {
        if (res.success) {
          this._dialogRef.close();
          this._snackBar.open('Usuario editado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        } else {
          this._snackBar.open('Error -> Usuario no editado ', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  //#region Get Fb
  formValue(value: string) {
    return this.formDataInfo.get(value);
  }
  //#endregion
}
