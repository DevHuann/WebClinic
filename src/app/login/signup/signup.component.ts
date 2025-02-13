import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';
import {NgClass} from '@angular/common';
import {LoginService} from '../services/login.service';
import {Router, RouterLink} from '@angular/router';
import {LoginRequest} from '../models/loginRequest';
import {RegistrationRequest} from '../models/registrationRequest';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {emailExistsValidator} from '../../core/validator/checkEmailExists';
import {LandingPageService} from '../../landing-page/services/landing-page.service';

@Component({
  selector: 'app-signup',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ReactiveFormsModule,
        NgxPermissionsModule,
        FormsModule,
        NgClass,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, RouterLink,

    ],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  isSubmit = false;
  dataForm!: FormGroup;
  selectedDate: Date | null = null;
  formattedDate: string | null = null;
  constructor(private fb: FormBuilder, private loginService: LoginService, private route: Router,
              private permissionService: NgxPermissionsService,private landingPageService : LandingPageService) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      fullName: ['',Validators.required],
      email: ['',Validators.required,],
      password: ['',Validators.required],
      patientDob: ['',Validators.required]
    })
  }

  handleSubmit() {
    if(!this.dataForm.valid){
      this.isSubmit = true;
    }else {
      this.isSubmit = false;
      const data = this.dataForm.value as RegistrationRequest
      this.loginService.registration(data).subscribe( (res:any) => {
        if(res != null){
          alert("Đăng ký thành công")
          this.route.navigate(["/login"]);
        }
      },error => {
        console.log(error)
        alert('Tài khoản hoặc mật khẩu không hợp lệ ')
      })
    }
  }


  // Hàm xử lý khi người dùng chọn ngày
  onDateChange(date: Date | null): void {
    if (date) {
      const formattedDate = this.combineDateWithTime(date);  // Định dạng ngày bằng formatDate
      this.dataForm.get('patientDob')?.setValue(formattedDate);  // Gán giá trị đã định dạng cho PatientDob
    } else {
      this.dataForm.get('patientDob')?.setValue(null);  // Xóa giá trị nếu không có ngày
    }
  }

  // Kết hợp ngày đã chọn với thời gian hiện tại và định dạng lại
  combineDateWithTime(date: Date): string {
    const now = new Date();  // Lấy thời gian hiện tại
    date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    return date.toISOString();
  }


}
