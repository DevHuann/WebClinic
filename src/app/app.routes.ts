import { Routes } from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {authGuard} from './core/guard/auth.guard';
import {NgxPermissionsGuard} from "ngx-permissions";
import {UnauthorizedComponent} from './core/component/unauthorized/unauthorized.component';
import {PatientViewComponent} from './landing-page/component/doctor/patient-view/patient-view.component';
export const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "unauthorized", component: UnauthorizedComponent
  },
  //Admin
  {
    path:'admin',
    loadComponent:()=> import('./landing-page/component/admin/admin.component').then(m=>m.AdminComponent),
    // canActivate:[authGuard,NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ["Admin"],
    //     redirectTo: '/unauthorized'
    //   }
    // },
    children:[
      {
        path:'',
        loadComponent:()=>import('./landing-page/component/admin/admin-dashboard/admin-dashboard.component').then(m=>m.AdminDashboardComponent),
      },
      {
        path:'admin-dashboard',
        loadComponent:()=>import('./landing-page/component/admin/admin-dashboard/admin-dashboard.component').then(m=>m.AdminDashboardComponent),
      },
      {
        path:'general-management',
        loadComponent:()=>import('./landing-page/component/admin/general-management/general-management.component').then(m=>m.GeneralManagementComponent),
        children: [
          {
            path:'',
            loadComponent:()=>import('./landing-page/component/admin/clinic-management/clinic-management.component').then(m=>m.ClinicManagementComponent),
          },
          {
            path:'clinic-management',
            loadComponent:()=>import('./landing-page/component/admin/clinic-management/clinic-management.component').then(m=>m.ClinicManagementComponent),
          },
          {
            path:'doctor-management',
            loadComponent:()=>import('./landing-page/component/admin/doctor-management/doctor-management.component').then(m=>m.DoctorManagementComponent),
          },
          {
            path:'patient-management',
            loadComponent:()=>import('./landing-page/component/admin/patient-management/patient-management.component').then(m=>m.PatientManagementComponent),
          },
        ]
      },
      {
        path:'appointment',
        loadComponent:()=>import('./landing-page/component/admin/appointment/appointment.component').then(m=>m.AppointmentComponent),
      },
      {
        path:'patient-management',
        loadComponent:()=>import('./landing-page/component/clinic/patient-management/patient-management.component').then(m=>m.PatientManagementComponent),
      },
      {
        path:'appointment-management',
        loadComponent:()=>import('./landing-page/component/clinic/appointment-management/appointment-management.component').then(m=>m.AppointmentManagementComponent),
      },
      {
        path:'announcement',
        loadComponent:()=>import('./landing-page/component/clinic/announcement/announcement.component').then(m=>m.AnnouncementComponent),
      },
      {
        path:'report',
        loadComponent:()=>import('./landing-page/component/clinic/report/report.component').then(m=>m.ReportComponent),
      },
    ]
  },
  //Clinic
  {
    path:'clinic',
    loadComponent:()=> import('./landing-page/component/clinic/clinic.component').then(m=>m.ClinicComponent),
    // canActivate:[authGuard,NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ["Clinic"],
    //     redirectTo: '/unauthorized'
    //   }
    // },
    children:[
      {
        path:'',
        loadComponent:()=>import('./landing-page/component/clinic/clinic-dashboard/clinic-dashboard.component').then(m=>m.ClinicDashboardComponent),
      },
      {
        path:'clinic-dashboard',
        loadComponent:()=>import('./landing-page/component/clinic/clinic-dashboard/clinic-dashboard.component').then(m=>m.ClinicDashboardComponent),
      },
      {
        path:'clinic-profile',
        loadComponent:()=>import('./landing-page/component/clinic/clinic-profile/clinic-profile.component').then(m=>m.ClinicProfileComponent),
      },
      {
        path:'doctor-management',
        loadComponent:()=>import('./landing-page/component/clinic/doctor-management/doctor-management.component').then(m=>m.DoctorManagementComponent),
      },
      {
        path:'patient-management',
        loadComponent:()=>import('./landing-page/component/clinic/patient-management/patient-management.component').then(m=>m.PatientManagementComponent),
      },
      {
        path:'appointment-management',
        loadComponent:()=>import('./landing-page/component/clinic/appointment-management/appointment-management.component').then(m=>m.AppointmentManagementComponent),
      },
      {
        path:'announcement',
        loadComponent:()=>import('./landing-page/component/clinic/announcement/announcement.component').then(m=>m.AnnouncementComponent),
      },
      {
        path:'report',
        loadComponent:()=>import('./landing-page/component/clinic/report/report.component').then(m=>m.ReportComponent),
      },
    ]
  },
  //Doctor
  {
    path:'doctor',
    loadComponent:()=> import('./landing-page/component/doctor/doctor.component').then(m=>m.DoctorComponent),
    // canActivate:[authGuard,NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ["Doctor"],
    //     redirectTo: '/unauthorized'
    //   }
    // },
    children:[
      {
        path:'',
        loadComponent:()=>import('./landing-page/component/doctor/doctor-dashboard/doctor-dashboard.component').then(m=>m.DoctorDashboardComponent),
      },
      {
        path:'doctor-dashboard',
        loadComponent:()=>import('./landing-page/component/doctor/doctor-dashboard/doctor-dashboard.component').then(m=>m.DoctorDashboardComponent),
      },
      {
        path:'doctor-profile',
        loadComponent:()=>import('./landing-page/component/doctor/doctor-profile/doctor-profile.component').then(m=>m.DoctorProfileComponent),
      },
      {
        path:'appointment-management',
        loadComponent:()=>import('./landing-page/component/doctor/appointment-management/appointment-management.component').then(m=>m.AppointmentManagementComponent),
      },
      {
        path:'patient-management',
        loadComponent:()=>import('./landing-page/component/doctor/patient-management/patient-management.component').then(m=>m.PatientManagementComponent),
      },
      {
        path:'patient-view',
        loadComponent:()=>import('./landing-page/component/doctor/patient-view/patient-view.component').then(m=>m.PatientViewComponent)
      },
      {
        path:'treatment-management',
        loadComponent:()=>import('./landing-page/component/doctor/treatment-management/treatment-management.component').then(m=>m.TreatmentManagementComponent),
      },
      {
        path:'review',
        loadComponent:()=>import('./landing-page/component/doctor/review/review.component').then(m=>m.ReviewComponent),
      },
      {
        path:'report',
        loadComponent:()=>import('./landing-page/component/doctor/report/report.component').then(m=>m.ReportComponent),
      },
    ]
  },
  //Patient
  {
    path:'patient',
    loadComponent:()=> import('./landing-page/component/patient/patient.component').then(m=>m.PatientComponent),
    // canActivate:[authGuard,NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: ["Patient"],
    //     redirectTo: '/unauthorized'
    //   }
    // },
    children:[
      {
        path:'appointment',
        loadComponent:()=>import('./landing-page/component/patient/appointment/appointment.component').then(m=>m.AppointmentComponent),
        children:[
          {
            path:'',loadComponent:()=>import('./landing-page/component/patient/list-clinic/list-clinic.component').then(m=>m.ListClinicComponent),
          },
          {
            path:'list-clinic',loadComponent:()=>import('./landing-page/component/patient/list-clinic/list-clinic.component').then(m=>m.ListClinicComponent),
          },
          {
            path:'clinic-view',loadComponent:()=>import('./landing-page/component/patient/clinic-view/clinic-view.component').then(m=>m.ClinicViewComponent),
          },
          {
            path:'doctor-view',loadComponent:()=>import('./landing-page/component/patient/doctor-view/doctor-view.component').then(m=>m.DoctorViewComponent),
          },
        ]
      },
      {
        path:'appointment-history',
        loadComponent:()=>import('./landing-page/component/patient/appointment-history/appointment-history.component').then(m=>m.AppointmentHistoryComponent),
      },
    ]
  },
];
