import {Doctor} from './doctor';

export class Clinic{
  id!:string
  email!: string
  phoneNumber!: string
  address!: string
  clinicName!: string
  clinicUrl!: string
  openWeek!: string
  closeWeek!: string
  openSat!: string
  closeSat!: string
  openSun!: string
  closeSun!: string
  dateCreated!: string
  doctors!:Doctor[]
}
