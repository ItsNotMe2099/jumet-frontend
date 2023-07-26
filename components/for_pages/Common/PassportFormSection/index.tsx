import styles from './index.module.scss'
import Validator from '@/utils/validator'
import {FileUploadAcceptType} from '@/types/enums'
import TextField from '@/components/fields/TextField'
import AttachSvg from '@/components/svg/AttachSvg'
import {colors} from '@/styles/variables'
import FileField from '@/components/fields/Files/FileField'


interface IFormData {
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string;

}

interface Props {

}

export default function PassportFormSection(props: Props) {
  return (
    <div className={styles.root}>
      <TextField
        name='passport.address'
        placeholder='Адрес регистрации'
        validate={Validator.required}/>
      <div className={styles.row}>
        <TextField
          name='passport.series'
          placeholder='Серия паспорта'
          validate={Validator.required}/>
        <TextField
          name='passport.number'
          placeholder='Номер паспорта'
          validate={Validator.required}/>
      </div>
      <TextField
        name='passport.date'
        placeholder='Дата выдачи'
        validate={Validator.required}/>
      <TextField
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
        image={<AttachSvg color={colors.dark500}/>}
      />
    </div>
  )
}
