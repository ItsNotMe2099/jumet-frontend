import {BonusType} from '@/data/enum/BonusType'

export default interface IBonusTariff {
  type: BonusType;
  amount: number;
  fromWeight: number;
  perWeight: number;
}
