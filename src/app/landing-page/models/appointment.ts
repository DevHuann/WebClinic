import {Patient} from './patient';
import {ModelSignal} from '@angular/core';
import {Doctor} from './doctor';
import {Clinic} from './clinic';
import {Review} from './review';

export class Appointment{
  id!:string
  appDate!:Date
  appTime!:string
  treatmentType!:string
  patientId!:string
  patient!:Patient
  doctorId!:string
  doctor!:Doctor
  clinicId!:string
  clinic!:Clinic
  status!:number
  consultStatus!:number
  arriveStatus!:number
  isReviewed!:boolean
  reviewId!:string
  review!:Review
}
