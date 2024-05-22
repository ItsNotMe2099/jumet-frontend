import {BonusType} from '@/data/enum/BonusType'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

export default interface IBonusTransaction {
  type: BonusType;
  receivingPoint: IReceivingPoint;
  dealId: number;
  amount: number;
  description: string;
  createdAt: string;
}
