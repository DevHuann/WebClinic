import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerToggleIcon
} from '@angular/material/datepicker';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
// import {MatOption} from '@angular/material/core';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LandingPageService} from '../../../services/landing-page.service';
import {DialogRef} from '@angular/cdk/dialog';
import {Clinic} from '../../../models/clinic';

import {Doctor} from '../../../models/doctor';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {LoginService} from '../../../../login/services/login.service';
import {Patient} from '../../../models/patient';
import {TreatmentType} from '../../../models/treatmentType';

@Component({
  selector: 'app-dialog-appointment',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerToggleIcon,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './dialog-appointment.component.html',
  styleUrl: './dialog-appointment.component.css'
})
export class DialogAppointmentComponent implements OnInit {
  dataForm!: FormGroup;
  selectedTime: string = '7:00 AM'
  listClinic: Clinic[] = []
  listDoctor: Doctor[] = []
  listTreatmentType:TreatmentType[]=[]
  clinicId: string = ''
  doctorId:string=''
  patientId: string = ''
  patient: Patient = {
    id: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    address: '',
    patientAvatar: '',
    patientIdentity: '',
    patientNationality: '',
    patientGender: '',
    patientMaritalStatus: '',
    patientDob: '',
    patientAge: '',
    dateCreated: ''
  };

  constructor(private fb: FormBuilder,
              private landingPageService: LandingPageService,
              private dialogRef: DialogRef<DialogAppointmentComponent>,
              @Inject(MAT_DIALOG_DATA) public Data:any,
              private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.landingPageService.getListClinic().subscribe(res => {
      this.listClinic = res;
    })
    const tokenObj = this.loginService.token();
    this.patientId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.getPatientById(this.patientId).subscribe(res => {
      this.patient = res;
    })
    this.landingPageService.getListTreatmentTypeByDoctorId(this.Data.id).subscribe(res=>{
      this.listTreatmentType=res;
    })
    this.dataForm = this.fb.group({
      appDate: [''],
      appTime: [this.selectedTime],
      treatmentType: [''],
      patientId: [this.patientId],
      doctorId: [this.Data.id],
      clinicId: [this.Data.clinicId],
    })
  }

  onDateChange(date: Date | null): void {
    if (date) {
      const formattedDate = this.combineDateWithTime(date);
      this.dataForm.get('appDate')?.setValue(formattedDate);
    } else {
      this.dataForm.get('appDate')?.setValue(null);
    }
  }


  combineDateWithTime(date: Date): string {
    const now = new Date();
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    return date.toISOString();
  }


  onTimeChange(time: string) {
    this.selectedTime = time;
  }

  handleSubmit() {
    this.landingPageService.createAppointment(this.dataForm.value).subscribe(res=>{
      this.dialogRef.close();
    })
  }
}
