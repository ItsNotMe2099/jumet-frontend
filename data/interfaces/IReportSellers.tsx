import {IPagination, Nullable} from '@/types/types'
export interface IReportSellerItem{
  phone: string
  firstName: Nullable<string>
  lastName: Nullable<string>
  patronymic: Nullable<string>
  scrapMetalCategory: Nullable<string>
  weight: Nullable<number>
  subTotal: Nullable<number>
}
export  interface IReportSellers extends IPagination<IReportSellerItem>{

}
