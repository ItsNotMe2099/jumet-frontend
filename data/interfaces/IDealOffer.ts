import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import IUser from '@/data/interfaces/IUser'

export interface IDealOffer {
  id?: number;
  receivingPoint: IReceivingPoint;
  receivingPointId: number;
  saleRequest?: ISaleRequest;
  saleRequestId?: number;
  status?: DealOfferStatus;
  coverLetter?: string;
  price: number;
  deliveryPrice: number;
  loadingPrice: number;
  rubbishInPercents: number;
  manager?: IUser;
  ownerId?: string;
  createdAt?: string;
}
