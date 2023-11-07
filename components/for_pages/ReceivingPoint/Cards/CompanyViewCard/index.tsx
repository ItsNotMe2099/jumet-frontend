import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointViewCard from '@/components/for_pages/ReceivingPoint/ReceivingPointViewCard'
import {useMemo} from 'react'
import {LegalType} from '@/data/interfaces/ICompany'
import styles from './index.module.scss'
import DescField from '@/components/ui/DescField'
import FileDownload from '@/components/ui/FileDownload'
import ImageHelper from '@/utils/ImageHelper'
interface IInfoItem {
  label: string;
  value: string | null | undefined;
}

interface Props {
  receivingPoint: IReceivingPoint
}

export default function CompanyViewCard(props: Props) {
  const {receivingPoint} = props
  const company = receivingPoint?.company
  const fields = useMemo<IInfoItem[]>(() => {
    return [
      {label: 'Наименование юр. лица', value: company?.name},
      {label: 'Форма собственности', value: company?.legalType === LegalType.LegalEntity ? 'Юридическое лицо' : 'ИП'},
      {label: 'Юридический адрес', value: company?.address},
      {label: 'ИНН', value: company?.inn},
      {label: 'ОГРН', value: company?.ogrn},
      {label: 'КПП', value: company?.kpp},
    ]
  }, [company])
  return (
    <ReceivingPointViewCard title='Реквизиты'>
      <div className={styles.root}>
        {fields.map(i => (<DescField label={i.label} value={i.value}/> ))}
        {company?.licenseScan && <FileDownload href={ImageHelper.urlFromFile(company?.licenseScan)} label={'Лицензия ломозаготовителя'}/>}
      </div>

    </ReceivingPointViewCard>
  )
}
