import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {LandingPageService} from '../../../services/landing-page.service';
import {DialogRef} from '@angular/cdk/dialog';
import {CreateClinicRequest} from '../../../models/createClinicRequest';
import {EditClinicRequest} from '../../../models/editClinicRequest';

@Component({
  selector: 'app-dialog-edit-clinic',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        NgxMaterialTimepickerModule,
        ReactiveFormsModule
    ],
  templateUrl: './dialog-edit-clinic.component.html',
  styleUrl: './dialog-edit-clinic.component.css'
})
export class DialogEditClinicComponent implements OnInit{
  dataForm!: FormGroup;
  selectedTimeOpenWeek: string ='';
  selectedTimeCloseWeek: string ='';
  selectedTimeOpenSat: string='';
  selectedTimeCloseSat: string ='';
  selectedTimeOpenSun: string ='';
  selectedTimeCloseSun: string='';
  constructor( private fb: FormBuilder,
               private landingPageService: LandingPageService,
               @Inject(MAT_DIALOG_DATA) public editData:any,
               private dialogRef: DialogRef<DialogEditClinicComponent>
  ) { }
  ngOnInit(): void {

    this.dataForm = this.fb.group({
      id: [''],
      phoneNumber:[''],
      address:[''],
      clinicName:[''],
      openWeek: [this.editData.openWeek || ''],
      closeWeek: [this.editData.closeWeek || ''],
      openSat: [this.editData.openSat || ''],
      closeSat: [this.editData.closeSat || ''],
      openSun: [this.editData.openSun || ''],
      closeSun: [this.editData.closeSun || ''],
      clinicUrl:[''],
      fullName:[''],
    });
    this.dataForm.controls['id'].setValue((this.editData.id))
    this.dataForm.controls['clinicName'].setValue((this.editData.clinicName))
    this.dataForm.controls['phoneNumber'].setValue((this.editData.phoneNumber))
    this.dataForm.controls['address'].setValue((this.editData.address))
    this.selectedTimeOpenWeek = this.editData.openWeek || '';
    this.selectedTimeCloseWeek = this.editData.closeWeek || '';
    this.selectedTimeOpenSat = this.editData.openSat || '';
    this.selectedTimeCloseSat = this.editData.closeSat || '';
    this.selectedTimeOpenSun = this.editData.openSun || '';
    this.selectedTimeCloseSun = this.editData.closeSun || '';
  }
  handleSubmit() {
    const data: EditClinicRequest = this.dataForm.value;
    this.landingPageService.editClinic(data).subscribe(res => {
      this.dialogRef.close();
    })
  }
  onTimeChange1(time: string) {
    this.selectedTimeOpenWeek = time;
    this.dataForm.patchValue({ openWeek: time });
    console.log('Open week:', this.selectedTimeOpenWeek);
  }

  onTimeChange2(time: string) {
    this.selectedTimeCloseWeek = time;
    this.dataForm.patchValue({ closeWeek: time });
    console.log('Close week:', this.selectedTimeCloseWeek);
  }

  onTimeChange3(time: string) {
    this.selectedTimeOpenSat = time;
    this.dataForm.patchValue({ openSat: time });
    console.log('Open sat:', this.selectedTimeOpenSat);
  }

  onTimeChange4(time: string) {
    this.selectedTimeCloseSat = time;
    this.dataForm.patchValue({ closeSat: time });
    console.log('Close sat:', this.selectedTimeCloseSat);
  }

  onTimeChange5(time: string) {
    this.selectedTimeOpenSun = time;
    this.dataForm.patchValue({ openSun: time });
    console.log('Open sun:', this.selectedTimeOpenSun);
  }

  onTimeChange6(time: string) {
    this.selectedTimeCloseSun = time;
    this.dataForm.patchValue({ closeSun: time });
    console.log('Close sun:', this.selectedTimeCloseSun);
  }


}
