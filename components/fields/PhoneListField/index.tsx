import {FieldArray, FieldConfig, useField} from 'formik'
import styles from './index.module.scss'
import { IField } from 'types/types'
import { InputStyleType } from '@/types/enums'
import Validator from '@/utils/validator'
import Button from '@/components/ui/Button'
import CirclePlusSvg from '@/components/svg/CirclePlusSvg'
import {colors} from '@/styles/variables'
import PhoneField from '@/components/fields/PhoneField'
import IconButton from '@/components/ui/IconButton'
import TrashSvg from '@/components/svg/TrashSvg'

interface Props extends IField<string[]> {

}

export default function PhoneListField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField<string[]>(props as any)

  return (<FieldArray name={props.name}>
    {arrayHelpers => (
      <div className={styles.root}>
        <div className={styles.fields}>
          {(field.value ?? []).map((i, index) => <div className={styles.field}>
            {props.label && <div className={styles.label}>{props.label}</div> }
            <div className={styles.fieldWrapper}>
            <PhoneField
              className={styles.input}
              styleType={InputStyleType.Default}
              key={index}
              name={`${props.name}[${index}].phone`}
              validate={Validator.phone}
            />
              {index > 0 && <IconButton bgColor={'grey300'} size={'large'} onClick={() => arrayHelpers.remove(index)}><TrashSvg color={colors.blue500}/></IconButton>}
            </div>
            </div>
          )}
        </div>
        <Button onClick={() => arrayHelpers.push({ phone: '' })} type='button' className={styles.add} styleType='large' color='grey'>
          <CirclePlusSvg color={colors.blue500} />
          Добавить еще номер
        </Button>
      </div>
    )}
  </FieldArray>)
}
