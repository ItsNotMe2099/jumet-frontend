import FileField from '@/components/fields/FileField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType } from '@/types/enums'
import Validator from '@/utils/validator'
import { useState } from 'react'
import classNames from 'classnames'
import { SwitchState } from '@/data/enum/SwitchState'
import SwitchField from '@/components/fields/SwitchField'
import ScheduleWeekDaysField from '@/components/fields/Schedule/ScheduleWeekDaysField'


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
    workingDays: null
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const [option, setOption] = useState<SwitchState>(SwitchState.FirstOption)

  console.log('formik.values', formik.values)

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
                  <ScheduleWeekDaysField
                    name='workingDays'
                    duration={(formik.values as any).duration ?? 60}
                    validate={Validator.weekScheduleRequired}
                  />
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
