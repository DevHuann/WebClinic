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
  listTreatmentType: TreatmentType[] = []
  clinicId: string = ''
  doctorId: string = ''



  constructor(private fb: FormBuilder,
              private landingPageService: LandingPageService,
              private dialogRef: DialogRef<DialogAppointmentComponent>,
              @Inject(MAT_DIALOG_DATA) public Data: any,
              private loginService: LoginService
  ) {
  }

  ngOnInit(): void {

    const tokenObj = this.loginService.token();
    this.doctorId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.getDoctorById(this.doctorId).subscribe(res => {
      this.clinicId =res.clinicId;
      console.log(this.clinicId);
    })

    this.landingPageService.getListTreatmentTypeByDoctorId(this.doctorId).subscribe(res => {
      this.listTreatmentType = res;
    })

    console.log(this.clinicId);

    this.dataForm = this.fb.group({
      appDate: [''],
      appTime: [this.selectedTime],
      treatmentType: [''],
      patientId: [this.Data.id],
      doctorId: [this.doctorId],
      clinicId: [],
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
    this.dataForm.get('clinicId')?.setValue(this.clinicId);
    this.landingPageService.createAppointment(this.dataForm.value).subscribe(res => {
      this.dialogRef.close();
    })
  }
}
