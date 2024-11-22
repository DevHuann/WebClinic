import {Component, OnInit} from '@angular/core';
import {LandingPageService} from '../../../services/landing-page.service';
import {Patient} from '../../../models/patient';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../../../../login/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatMiniFabButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule
  ],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.css'
})
export class PatientManagementComponent implements OnInit {
  listPatient:Patient[]=[]
  constructor(
    private landingPageService:LandingPageService,
    private loginService:LoginService,
    private route:Router
  ) {
  }

  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    const doctorId = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.landingPageService.getListPatientByDoctorId(doctorId).subscribe(res=>{
      this.listPatient=res;
    })
  }

  handleView(id: string) {
    this.landingPageService.PatientQueue.next(id)
    this.route.navigate(['/doctor/patient-view'])
  }
}
