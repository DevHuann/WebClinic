import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {LandingPageService} from '../../../services/landing-page.service';
import {DialogRef} from '@angular/cdk/dialog';
import {CreateDoctorRequest} from '../../../models/createDoctorRequest';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerToggleIcon
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {Speciality} from '../../../models/speciality';
import {Clinic} from '../../../models/clinic';
import {MatOption, MatSelect} from '@angular/material/select';
import {LoginService} from '../../../../login/services/login.service';

@Component({
  selector: 'app-dialog-doctor',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerToggleIcon,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    MatSelect,
    MatOption
  ],
  templateUrl: './dialog-doctor.component.html',
  styleUrl: './dialog-doctor.component.css'
})
export class DialogDoctorComponent implements OnInit{
  dataForm!: FormGroup;
  selectedDate: Date | null = null;
  listSpeciality: Speciality[]=[]
  listClinic:Clinic[]=[]
  constructor( private fb: FormBuilder,
               private landingPageService: LandingPageService,
               private loginService:LoginService,
               private dialogRef: DialogRef<DialogDoctorComponent>
  ) { }
  ngOnInit(): void {
    const tokenObj = this.loginService.token()
    const clinicId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.dataForm = this.fb.group({
      email:[''],
      password:[''],
      confirmPassword: [''],
      fullName:[''],
      address:[''],
      phoneNumber:[''],
      doctorGender:[''],
      doctorDob:[''],
      doctorAvatar:[''],
      doctorSpeciality:[''],
      doctorExperience:[''],
      doctorDescription:[''],
      doctorSpokenLanguages:[''],
      consultFee:[''],
      clinicId:[clinicId],
    });
    this.landingPageService.getListspeciality().subscribe(res =>{
      this.listSpeciality=res;
    })
    this.landingPageService.getListClinic().subscribe(res=>{
      this.listClinic=res;
    })
  }
  handleSubmit() {
    if(this.dataForm.value.password != this.dataForm.value.confirmPassword) {
      alert("Mật khẩu không khớp !");
      return;
    }
    const data: CreateDoctorRequest = this.dataForm.value;
    this.landingPageService.createDoctor(data).subscribe(res => {
      this.dialogRef.close();
    })
  }

  onDateChange(date: Date | null): void {
    if (date) {
      const formattedDate = this.combineDateWithTime(date);
      this.dataForm.get('doctorDob')?.setValue(formattedDate);
    } else {
      this.dataForm.get('doctorDob')?.setValue(null);
    }
  }


  combineDateWithTime(date: Date): string {
    const now = new Date();  // Lấy thời gian hiện tại
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    return date.toISOString();
  }
}
