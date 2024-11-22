import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router, RouterLink} from '@angular/router';
import {NgxPermissionsModule, NgxPermissionsService} from "ngx-permissions";
import {LoginRequest} from '../models/loginRequest';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxPermissionsModule,
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isSubmit = false;
  dataForm!: FormGroup;


  constructor(private fb: FormBuilder, private loginService: LoginService, private route: Router,
              private permissionService: NgxPermissionsService) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  handleSubmit() {
    if(!this.dataForm.valid){
      this.isSubmit = true;
    }else {
      this.isSubmit = false;
      const data = this.dataForm.value as LoginRequest
      this.loginService.login(data).subscribe( (res:any) => {
        if(res != null){
          sessionStorage.setItem("token",res?.token);
          const tokenObj = this.loginService.token();
          const claims = tokenObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.permissionService.loadPermissions(claims);
          if (claims.some((claim: string) => claim.includes("Admin"))) {
            this.route.navigate(["/admin"]);
          } else if (claims.some((claim: string) => claim.includes("Clinic"))) {
            this.route.navigate(["/clinic"]);
          }else if (claims.some((claim: string) => claim.includes("Doctor"))) {
            this.route.navigate(["/doctor"]);
          } else if (claims.some((claim: string) => claim.includes("Patient"))) {
            this.route.navigate(["/patient"]);
          }
        }
      },error => {
        console.log(error)
        alert('Tài khoản mật khẩu không đúng!!')
      })
    }
  }
}
