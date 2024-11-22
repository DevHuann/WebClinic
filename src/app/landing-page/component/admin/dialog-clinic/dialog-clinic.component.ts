import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {LandingPageService} from '../../../services/landing-page.service';
import {DialogRef} from '@angular/cdk/dialog';
import {CreateClinicRequest} from '../../../models/createClinicRequest';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  MatNativeDateTimeModule,
  MatTimepicker,
  MatTimepickerInput, MatTimepickerModule,
  MatTimepickerToggle
} from '@dhutaryan/ngx-mat-timepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@Component({
  selector: 'app-dialog-clinic',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './dialog-clinic.component.html',
  styleUrl: './dialog-clinic.component.css'
})
export class DialogClinicComponent implements OnInit{
  dataForm!: FormGroup;
  selectedTimeOpenWeek: string = '7:00 AM';
  selectedTimeCloseWeek: string = '7:00 PM';
  selectedTimeOpenSat: string = '7:00 AM';
  selectedTimeCloseSat: string = '7:00 PM';
  selectedTimeOpenSun: string = '7:00 AM';
  selectedTimeCloseSun: string = '7:00 PM';
  constructor( private fb: FormBuilder,
               private landingPageService: LandingPageService,
               private dialogRef: DialogRef<DialogClinicComponent>
  ) { }
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      email:[''],
      password:[''],
      confirmPassword: [''],
      fullName:[''],
      clinicZipcode:[''],
      phoneNumber:[''],
      address:[''],
      clinicName:[''],
      clinicUrl:[''],
      openWeek:[this.selectedTimeOpenWeek],
      closeWeek:[this.selectedTimeCloseWeek],
      openSat:[this.selectedTimeOpenSat],
      closeSat:[this.selectedTimeCloseSat],
      openSun:[this.selectedTimeOpenSun],
      closeSun:[this.selectedTimeCloseSun],
    });
  }
  handleSubmit() {
    if(this.dataForm.value.password != this.dataForm.value.confirmPassword) {
      alert("Mật khẩu không khớp !");
      return;
    }
      const data: CreateClinicRequest = this.dataForm.value;
      this.landingPageService.createClinic(data).subscribe(res => {
        this.dialogRef.close();
      })
  }
  onTimeChange1(time: string) {
    this.selectedTimeOpenWeek = time;
    console.log('Open week:', this.selectedTimeOpenWeek);
  }
  onTimeChange2(time: string) {
    this.selectedTimeCloseWeek = time;
    console.log('Close week:', this.selectedTimeCloseWeek);
  }
  onTimeChange3(time: string) {
    this.selectedTimeOpenSat = time;
    console.log('Open sat:', this.selectedTimeOpenSat);
  }
  onTimeChange4(time: string) {
    this.selectedTimeCloseSat = time;
    console.log('Close sat:', this.selectedTimeCloseSat);
  }
  onTimeChange5(time: string) {
    this.selectedTimeOpenSun = time;
    console.log('Open sun:', this.selectedTimeOpenSun);
  }
  onTimeChange6(time: string) {
    this.selectedTimeCloseSun = time;
    console.log('Close sun:', this.selectedTimeCloseSun);
  }

}
