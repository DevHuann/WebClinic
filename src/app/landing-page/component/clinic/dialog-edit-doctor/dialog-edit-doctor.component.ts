import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Speciality} from '../../../models/speciality';
import {Clinic} from '../../../models/clinic';
import {LandingPageService} from '../../../services/landing-page.service';
import {DialogRef} from '@angular/cdk/dialog';
import {CreateDoctorRequest} from '../../../models/createDoctorRequest';
import {EditDoctorRequest} from '../../../models/editDoctorRequest';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@Component({
  selector: 'app-dialog-edit-doctor',
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
  templateUrl: './dialog-edit-doctor.component.html',
  styleUrl: './dialog-edit-doctor.component.css'
})
export class DialogEditDoctorComponent implements OnInit{
  dataForm!: FormGroup;
  selectedDate: Date | null = null;
  listSpeciality: Speciality[]=[]
  listClinic:Clinic[]=[]
  constructor( private fb: FormBuilder,
               private landingPageService: LandingPageService,
               @Inject(MAT_DIALOG_DATA) public editData:any,
               private dialogRef: DialogRef<DialogEditDoctorComponent>

  ) { }
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: [''],
      // email:[''],
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
      clinicId:[''],
    });
    this.dataForm.controls['id'].setValue((this.editData.id))
    this.dataForm.controls['fullName'].setValue((this.editData.fullName))
    this.dataForm.controls['address'].setValue((this.editData.address))
    this.dataForm.controls['phoneNumber'].setValue((this.editData.phoneNumber))
    this.dataForm.controls['doctorGender'].setValue((this.editData.doctorGender))
    this.dataForm.controls['doctorDob'].setValue((this.editData.doctorDob))
    this.dataForm.controls['doctorAvatar'].setValue((this.editData.doctorAvatar))
    this.dataForm.controls['doctorSpeciality'].setValue((this.editData.doctorSpeciality))
    this.dataForm.controls['doctorExperience'].setValue((this.editData.doctorExperience))
    this.dataForm.controls['doctorDescription'].setValue((this.editData.doctorDescription))
    this.dataForm.controls['doctorSpokenLanguages'].setValue((this.editData.doctorSpokenLanguages))
    this.dataForm.controls['consultFee'].setValue((this.editData.consultFee))
    this.dataForm.controls['clinicId'].setValue((this.editData.clinicId))
    this.landingPageService.getListspeciality().subscribe(res =>{
      this.listSpeciality=res;
    })
    this.landingPageService.getListClinic().subscribe(res=>{
      this.listClinic=res;
    })
  }
  handleSubmit() {
    const data: EditDoctorRequest = this.dataForm.value;
    this.landingPageService.editDoctor(data).subscribe(res => {
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
