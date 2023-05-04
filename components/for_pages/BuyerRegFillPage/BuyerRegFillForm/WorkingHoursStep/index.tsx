import FileField from '@/components/fields/FileField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType } from '@/types/enums'
import Validator from '@/utils/validator'
import { useState } from 'react'
import classNames from 'classnames'
import { SwitchState } from '@/data/enum/SwitchState'
import SwitchField from '@/components/fields/SwitchField'
import SelectField from '@/components/fields/SelectField'
// @ts-ignore
import ReactCheckBox from 'react-custom-checkbox'
import CheckBoxSvg from '@/components/svg/CheckBoxSvg'
import { colors } from '@/styles/variables'


interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
}

export default function WorkingHoursStep(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const initialValues = {
    photo: [],
    always: false,
    workingHoursEntireWeekFrom: { value: '', label: '' },
    workingHoursEntireWeekTo: { value: '', label: '' },
    
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const [option, setOption] = useState<SwitchState>(SwitchState.FirstOption)

  const [workingHoursEntireWeekCheck, setWokingHoursEntireWeekCheck] = useState<boolean>(false)

  console.log('formik.values', formik.values)

  const hoursOptions = [
    { value: '00:00', label: '00:00' },
    { value: '01:00', label: '01:00' },
    { value: '02:00', label: '02:00' },
    { value: '03:00', label: '03:00' },
    { value: '04:00', label: '04:00' },
    { value: '05:00', label: '05:00' },
    { value: '06:00', label: '06:00' },
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' },
    { value: '19:00', label: '19:00' },
    { value: '20:00', label: '20:00' },
    { value: '21:00', label: '21:00' },
    { value: '22:00', label: '22:00' },
    { value: '23:00', label: '23:00' },
  ]

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FileField
          name='photo'
          accept={[FileUploadAcceptType.Image]}
          label='Фотографии пункта приема'
          validate={Validator.required}
          text={<>Перетащите сюда или <span>выберите фото</span> пункта<br /> приёма</>}
        />
        <div className={styles.working}>
          <div className={styles.title}>
            Режим работы
          </div>
          <div className={styles.types}>
            <div onClick={() => setOption(SwitchState.FirstOption)} className={classNames(styles.option, { [styles.active]: option === SwitchState.FirstOption })}>
              Будни и выходные
              <div className={styles.line} />
            </div>
            <div onClick={() => setOption(SwitchState.Secondoption)} className={classNames(styles.option, { [styles.active]: option === SwitchState.Secondoption })}>
              Режим по дням
              <div className={styles.line} />
            </div>
          </div>
          <div className={styles.wrapper}>
            {option === SwitchState.FirstOption ?
              <>
                <SwitchField name='always' label='Круглосуточно' />
                <div className={styles.options}>
                  <div className={styles.fields}>
                    <SelectField
                      className={styles.select}
                      options={hoursOptions.filter(i =>
                        formik.values.workingHoursEntireWeekTo.value ? i.value < formik.values.workingHoursEntireWeekTo.value : i)}
                      name={'workingHoursEntireWeekFrom'}
                      placeholder='С' />
                    <SelectField
                      className={styles.select}
                      options={hoursOptions.filter(i => i.value > formik.values.workingHoursEntireWeekFrom.value)}
                      name={'workingHoursEntireWeekTo'}
                      placeholder='До' />
                    <ReactCheckBox
                      checked={workingHoursEntireWeekCheck}
                      onChange={() => setWokingHoursEntireWeekCheck(!workingHoursEntireWeekCheck)}
                      icon={<div className={styles.checkboxWrapper}><CheckBoxSvg className={styles.icon} color={colors.dark500} /></div>}
                      borderColor={colors.yellow}
                      borderRadius={4}
                      size={16}
                      label='Будни'
                      containerClassName={styles.checkbox}
                    />
                  </div>
                  <div className={styles.fields}>
                    <SelectField
                      className={styles.select}
                      options={hoursOptions.filter(i =>
                        formik.values.workingHoursEntireWeekTo.value ? i.value < formik.values.workingHoursEntireWeekTo.value : i)}
                      name={'workingHoursEntireWeekFrom'}
                      placeholder='С' />
                    <SelectField
                      className={styles.select}
                      options={hoursOptions.filter(i => i.value > formik.values.workingHoursEntireWeekFrom.value)}
                      name={'workingHoursEntireWeekTo'}
                      placeholder='До' />
                    <ReactCheckBox
                      checked={workingHoursEntireWeekCheck}
                      onChange={() => setWokingHoursEntireWeekCheck(!workingHoursEntireWeekCheck)}
                      icon={<div className={styles.checkboxWrapper}><CheckBoxSvg className={styles.icon} color={colors.dark500} /></div>}
                      borderColor={colors.yellow}
                      borderRadius={4}
                      size={16}
                      label='Суббота'
                      containerClassName={styles.checkbox}
                    />
                  </div>
                </div>
              </>
              :
              <>
              </>
            }
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
