import {BonusType} from '@/data/enum/BonusType'

export default interface IBonusSellerState {
  type: BonusType;
  amount: number
}
