import styles from 'components/for_pages/Common/CompanyDetailsFormSection/index.module.scss'
import Validator from '@/utils/validator'
import InputField from '@/components/fields/InputField'
import {ICompany, LegalType} from '@/data/interfaces/ICompany'
import AddressField from '@/components/fields/AddressField'
import {useMemo, useState} from 'react'
import Button from '@/components/ui/Button'
import RadioField from '@/components/fields/RadioField'

interface IInfoItem {
  label: string;
  value: string | null | undefined;
}

interface Props  {
  onEditToggle?: (isEdit: boolean) => void
  company: ICompany
}

export default function CompanyDetailsFormSection(props: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const value = props.company

  const fields = useMemo<IInfoItem[]>(() => {
    return [
      {label: 'Наименование юр. лица', value: value.name},
      {label: 'Форма собственности', value: value.legalType === LegalType.LegalEntity ? 'Юридическое лицо' : 'ИП'},
      {label: 'Юрюдический адрес', value: value.address},
      {label: 'ИНН', value: value.inn},
      {label: 'ОГРН', value: value.ogrn},
      {label: 'КПП', value: value.kpp},
    ]
  }, [value])


  return (
    <div className={styles.root}>
      {!isEdit && <div className={styles.info}>
        {fields.map(i => (<div className={styles.infoField}>
          <div className={styles.infoLabel}>{i.label}</div>
          <div className={styles.infoValue}>{i.value}</div>
        </div>))}
      </div>}
      {isEdit && <div className={styles.form}>
        <InputField
          name={'company.inn'}
          label='ИНН юр.лица*'
          validate={Validator.required}/>
            <InputField
              name={'company.name'}
              label='Наименование юр. лица'
              validate={Validator.required}/>
            <RadioField<LegalType>
              styleType={'default'}
              name={'company.legalType'}
              label='Форма собственности'
              options={[{label: 'Юридическое лицо', value: LegalType.LegalEntity},
                {label: 'Индивидуальный предприниматель', value: LegalType.Ip}]}
              validate={Validator.required}/>
            <AddressField
              name={'company.address'}
              label='Юрюдический адрес'
              isString
              validate={Validator.required}/>
            <InputField
              name={'company.ogrn'}
              label='ОГРН'
              validate={Validator.required}/>
            <InputField
              name={'company.kpp'}
              label='КПП'
              validate={Validator.required}/>
      </div>}
      {!isEdit && <Button onClick={() => {
        setIsEdit(true)
        props.onEditToggle?.(true)
      }} className={styles.change} styleType='large' color='grey' type={'button'}>
        Изменить данные
      </Button>}
    </div>
  )
}
