import {Doctor} from './doctor';
import {Patient} from './patient';
import {Appointment} from './appointment';

export class Review {
  id !: string
  rating !: number
  reviewText !: string
  date !: Date
  doctorId !: string
  doctor !: Doctor
  patientId !: string
  patient !: Patient
  appointmentId !: string
  appointment !: Appointment
}
