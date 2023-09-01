import styles from 'components/for_pages/LkPage/ReceivingPoint/Cards/CompanyLkCard/index.module.scss'
import {useMemo, useState} from 'react'
import {ICompany, LegalType} from '@/data/interfaces/ICompany'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import ImageHelper from '@/utils/ImageHelper'
import ReceivingPointInfoEditCard from '@/components/for_pages/LkPage/ReceivingPoint/ReceivingPointInfoEditCard'
import {DeepPartial} from '@/types/types'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointCompanyForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointCompanyForm'
import {CompanyOwnerWrapper, useCompanyOwnerContext} from '@/context/company_owner_state'
import DescField from '@/components/ui/DescField'
import FileDownload from '@/components/ui/FileDownload'

interface IInfoItem {
  label: string;
  value: string | null | undefined;
}

interface Props {

}

const CompanyLkCardInner = (props: Props) => {
  const companyContext = useCompanyOwnerContext()
  const company = companyContext.company
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<ICompany>) => {
    setLoading(true)
    const res = await companyContext.editRequest(data)
    setIsEdit(false)
    setLoading(false)
  }


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
    <ReceivingPointInfoEditCard
      title='Реквизиты'
      isEdit={isEdit}
      onSetIsEdit={setIsEdit}
      form={<ReceivingPointCompanyForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading}/>}
                                       company={company} onSubmit={handleSubmit}/>}>
      <div className={styles.root}>
        {fields.map(i => (<DescField label={i.label} value={i.value}/> ))}
        {company?.licenseScan && <FileDownload href={ImageHelper.urlFromFile(company?.licenseScan)} label={'Лицензия ломозаготовителя'}/>}
      </div>
    </ReceivingPointInfoEditCard>
  )
}

export default function CompanyLkCard(props: Props) {
  const receivingPointContext = useReceivingPointOwnerContext()
  const company = receivingPointContext.receivingPoint?.company
  if (!receivingPointContext.receivingPoint?.companyId) {
    return null
  }
  return <CompanyOwnerWrapper companyId={company!.id!}>
    <CompanyLkCardInner/>
  </CompanyOwnerWrapper>
}
