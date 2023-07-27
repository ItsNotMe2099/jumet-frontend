import styles from './index.module.scss'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import InputField from '@/components/fields/InputField'
import FileField from '@/components/fields/Files/FileField'


interface Props {

}

export default function PassportFormSection(props: Props) {
  return (
    <div className={styles.root}>
      <InputField
        name='passport.address'
        placeholder='Адрес регистрации'
        validate={Validator.required}/>
      <div className={styles.row}>
        <InputField
          name='passport.series'
          placeholder='Серия паспорта'
          validate={Validator.required}/>
        <InputField
          name='passport.number'
          placeholder='Номер паспорта'
          validate={Validator.required}/>
      </div>
      <InputField
        name='passport.date'
        placeholder='Дата выдачи'
        validate={Validator.required}/>
      <InputField
        name='passport.issuedBy'
        placeholder='Кем выдан'
        validate={Validator.required}/>
      <FileField
        isImage
        name='passport.scan'
        accept={[FileUploadAcceptType.Image]}
        validate={Validator.required}
        vertical
        text={<div>Перетащите сюда или <span>выберите фото</span><br />
          страницы паспорта с фотографией</div>}
      />
    </div>
  )
}
