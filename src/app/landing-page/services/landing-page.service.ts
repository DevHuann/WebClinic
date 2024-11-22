import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {CreateClinicRequest} from '../models/createClinicRequest';
import {EditClinicRequest} from '../models/editClinicRequest';
import {Clinic} from '../models/clinic';
import {ListRequest} from '../models/listRequest';
import {ListClinicResponse} from '../models/listClinicResponse';
import {ListDoctorResponse} from '../models/listDoctorResponse';
import {CreateDoctorRequest} from '../models/createDoctorRequest';
import {EditDoctorRequest} from '../models/editDoctorRequest';
import {Speciality} from '../models/speciality';
import {Appointment} from '../models/appointment';
import {Doctor} from '../models/doctor';
import {Patient} from '../models/patient';
import {TreatmentType} from '../models/treatmentType';
import {
  ListAppointmentByIdAndDateRequest
} from '../models/listAppointmentByIdAndDateRequest';
import {BehaviorSubject} from 'rxjs';
import {CreateReviewRequest} from '../models/createReviewRequest';
import {Review} from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  ClinicQueue=new BehaviorSubject<string>('');
  DoctorQueue=new BehaviorSubject<string>('');
  PatientQueue=new BehaviorSubject<string>('');

  constructor(private httpClient:HttpClient) { }
  getUserById = (id: string) => this.httpClient.get<User>(`${environment.api_domain}/Authentication/get-user/${id}`);
  // Clinic
  listClinic =(data:ListRequest)=>this.httpClient.post<ListClinicResponse>(`${environment.api_domain}/Clinic/list-clinic`,data)
  getListClinic =()=>this.httpClient.get<Clinic[]>(`${environment.api_domain}/Clinic/get-list-clinic`)
  createClinic =(data: CreateClinicRequest)=>this.httpClient.post(`${environment.api_domain}/Clinic/clinicRegistration`,data);
  editClinic = (data:EditClinicRequest)=>this.httpClient.put(`${environment.api_domain}/Clinic/edit-clinic`,data)
  deleteClinic = (id:string)=>this.httpClient.delete(`${environment.api_domain}/Clinic/delete-clinic/${id}`)
  getClinicById=(id:string)=>this.httpClient.get<Clinic>(`${environment.api_domain}/Clinic/get-clinic/${id}`)
  //Doctor
  listDoctor =(data:ListRequest)=>this.httpClient.post<ListDoctorResponse>(`${environment.api_domain}/Doctor/list-doctor`,data)
  createDoctor =(data: CreateDoctorRequest)=>this.httpClient.post(`${environment.api_domain}/Doctor/doctorRegistration`,data);
  editDoctor = (data:EditDoctorRequest)=>this.httpClient.put(`${environment.api_domain}/Doctor/edit-doctor`,data)
  deleteDoctor = (id:string)=>this.httpClient.delete(`${environment.api_domain}/Doctor/delete-doctor/${id}`)
  listDoctorByClinicId=(id:string)=>this.httpClient.get<Doctor[]>(`${environment.api_domain}/Doctor/get-list-doctor-by-clinicId/${id}`)
  getDoctorById=(id:string)=>this.httpClient.get<Doctor>(`${environment.api_domain}/Doctor/get-doctor-by-id/${id}`)

// Patient
  getPatientById=(id:string)=>this.httpClient.get<Patient>(`${environment.api_domain}/Patient/get-patient-by-id/${id}`)
  getListPatientByDoctorId=(id:string)=>this.httpClient.get<Patient[]>(`${environment.api_domain}/Patient/list-patient-by-doctor-id/${id}`)
  getListPatientByClinicId=(id:string)=>this.httpClient.get<Patient[]>(`${environment.api_domain}/Patient/list-patient-by-clinic-id/${id}`)

// Speciality
  getListspeciality =()=>this.httpClient.get<Speciality[]>(`${environment.api_domain}/get-list-speciality`)
// Appointment
  createAppointment =(data:Appointment)=>this.httpClient.post(`${environment.api_domain}/create-appointment`,data)
  getListAppointmentByDoctorIdAndDateAndNotYetConfirmed=(data:ListAppointmentByIdAndDateRequest)=>this.httpClient.get<Appointment[]>(`${environment.api_domain}/get-list-appointment-by-doctor-id-and-date-and-not-yet-confirmed/`,{params:{id:data.id,date: data.date||''}})
  getListAppointmentByClinicIdAndDateAndNotYetConfirmed=(data:ListAppointmentByIdAndDateRequest)=>this.httpClient.get<Appointment[]>(`${environment.api_domain}/get-list-appointment-by-clinic-id-and-date-and-not-yet-confirmed/`,{params:{id:data.id,date: data.date||''}})
  getListAppointmentCompletedByPatientId=(id:string)=>this.httpClient.get<Appointment[]>(`${environment.api_domain}/list-appointment-completed-by-patient-id/${id}`)
  getListAppointmentActiveByPatientId=(id:string)=>this.httpClient.get<Appointment[]>(`${environment.api_domain}/list-appointment-active-by-patient-id/${id}`)

  confirmConsultStatus =(id:string)=>  this.httpClient.put(`${environment.api_domain}/confirm-consult-status?id=${id}`,{})
  confirmStatus =(id:string)=>  this.httpClient.put(`${environment.api_domain}/confirm-status?id=${id}`,{})
  confirmArriveStatus =(id:string)=>  this.httpClient.put(`${environment.api_domain}/confirm-arrive-status?id=${id}`,{})

  // TreatmentType
  getListTreatmentTypeByDoctorId =(id:string)=>this.httpClient.get<TreatmentType[]>(`${environment.api_domain}/get-list-treatmentType-by-doctorId/${id}`)
  //Review
  createReview=(data:CreateReviewRequest)=>this.httpClient.post(`${environment.api_domain}/Review/create-review`,data)
  getListReviewByDoctorId=(id:string)=>this.httpClient.get<Review[]>(`${environment.api_domain}/Review/list-review-by-doctor-id/${id}`)
}
