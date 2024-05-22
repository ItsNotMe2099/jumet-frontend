import {AgreementType} from '@/data/enum/AgreementType'

export default interface IAgreement {
  type: AgreementType;
  number: string;

}
