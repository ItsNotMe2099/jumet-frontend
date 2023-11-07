import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {IDeal} from '@/data/interfaces/IDeal'
import IReview from '@/data/interfaces/IReview'

export enum NotificationType {
  Admin = 'admin',
  AuthPinCode = 'authPinCode',
  RepresentativePinCode = 'representativePinCode',
  EmailVerification = 'emailVerification',
  BuyerRegistered = 'buyerRegistered',
  UserInvitedToReceivingPoint = 'userInvitedToReceivingPoint',
  UserInvitedToAccount = 'userInvitedToAccount',
  PasswordReset = 'passwordReset',
  ReceivingPointModeration = 'receivingPointModeration',
  ReceivingPointApproved = 'receivingPointApproved',
  ReceivingPointRejected = 'receivingPointRejected',
  ReceivingPointWaitingDetails = 'receivingPointWaitingDetails',
  ReceivingPointWaitingBlocked = 'receivingPointWaitingBlocked',
  ChatMessage = 'chatMessage',
  NewDealOffer = 'newDealOffer',
  DealOfferRejected = 'dealOfferRejected',
  DealOfferAccepted = 'dealOfferAccepted',
  NewSaleRequest = 'newSaleRequest',
  SaleRequestRejected = 'saleRequestRejected',
  SaleRequestAccepted = 'saleRequestAccepted',
  DealSetUp = 'dealSetUp',
  DealWeighed = 'dealWeighed',
  DealTerminatedByBuyer = 'dealTerminatedByBuyer',
  DealTerminatedBySeller = 'dealTerminatedBySeller',
  DealWeighingAccepted = 'dealWeighingAccepted',
  DealPaid = 'dealPaid',
  NewReview = 'newReview',
  ReviewAnswered = 'reviewAnswered',
}

export interface INotificationData {
  code?: string;
  phone?: string;
  email?: string;
  receivingPointId?: string | null;
  messageId?: number;
  dealOfferId?: number;
  saleRequestId?: number;
  dealId?: number;
  reviewId?: number;
}

export type NotificationTargetType = 'user' | 'all';
export default interface INotification {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  isRead?: boolean;
  targetType: NotificationTargetType;
  targetTypeName: string;
  createdAt: string;
  link?: string
  data: INotificationData;
  dealOffer: IDealOffer;
  dealOfferId: number;
  saleRequest: ISaleRequest;
  saleRequestId: number;
  deal: IDeal;
  dealId: number;
  review: IReview;
  reviewId: number;
  chatId: number
}


export enum NotificationUnreadType {
  saleRequest = 'saleRequest',
  dealOffer = 'dealOffer',
  deal = 'deal',
  review = 'review',
  message = 'message'
}
export interface INotificationRecord {
  id: number
  type: NotificationUnreadType
  time: Date
}
export interface INotificationUnreadStoreItem {
  eId: number
  id: number
}

export type NotificationUnreadStoreType = {[entityType in NotificationUnreadType]: INotificationUnreadStoreItem[]}
