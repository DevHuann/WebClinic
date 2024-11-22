import {Clinic} from './clinic';

export class ListClinicResponse{
  listClinic!: Clinic[]
  totalPage!: number
  pageIndex!: number
  pageSize!: number
  totalRecords!: number
}
