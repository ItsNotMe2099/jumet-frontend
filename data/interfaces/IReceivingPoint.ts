import {ReceivingPointStatus} from '@/data/enum/ReceivingPointStatus'
import {ICompany} from '@/data/interfaces/ICompany'
import {ILocation} from '@/data/interfaces/ILocation'
import {IDeliveryArea} from '@/data/interfaces/IDeliveryArea'
import IFile from '@/data/interfaces/IFile'
import {ScheduleType} from '@/data/enum/ScheduleType'
import {IReceivingPointWorkTime} from '@/data/interfaces/ReceivingPointWorkTime'
import {IPriceDescription} from '@/data/interfaces/IPriceDescription'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {IAddress} from '@/data/interfaces/IAddress'
import IUser from '@/data/interfaces/IUser'

export interface IReceivingPoint {
  id: number;
  name?: string;
  status?: ReceivingPointStatus;
  company: ICompany;
  companyId: number;
  location: ILocation;
  timezone?: string;
  deliveryAreas: IDeliveryArea[];
  photos: IFile[];
  photosIds: number[];
  scheduleType?: ScheduleType;
  workTimes: IReceivingPointWorkTime[];
  prices: IPriceDescription[];
  scrapMetalCategories: ScrapMetalCategory[];
  users: IUser[];
  hasDelivery: boolean;
  hasLoading: boolean;
  contacts: any[];
  address: IAddress;
  rating: number
  phones?: string[];
  ownerId?: string;
  distance: number;
  workNow: boolean;
  price: number;
  createdAt: Date;
}
