import {Clinic} from './clinic';
import {Doctor} from './doctor';

export class ListDoctorResponse{
  listDoctor!: Doctor[]
  totalPage!: number
  pageIndex!: number
  pageSize!: number
  totalRecords!: number
}
