import FileField from '@/components/fields/FileField'
import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { FileUploadAcceptType, WeekDays } from '@/types/enums'
import Validator from '@/utils/validator'
import { useState } from 'react'
import classNames from 'classnames'
import SwitchField from '@/components/fields/SwitchField'
import ScheduleWeekDaysField from '@/components/fields/Schedule/ScheduleWeekDaysField'
import { ScheduleType } from '@/data/enum/ScheduleType'


interface Props {
  onNextStep: (data?: any) => void
  onBack?: () => void
}

export default function WorkingHoursStep(props: Props) {

  const handleSubmit = async (/*data*/) => {
    props.onNextStep()
  }

  const days = [
    {title: 'Пн', value: WeekDays.monday},
    {title: 'Вт', value: WeekDays.tuesday},
    {title: 'Ср', value: WeekDays.wednesday},
    {title: 'Чт', value: WeekDays.thursday},
    {title: 'Пт', value: WeekDays.friday},
    {title: 'Сб', value: WeekDays.saturday},
    {title: 'Вс', value: WeekDays.sunday},
  ]

  const initialValues = {
    photo: [],
    always: false,
    workingDays: days
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const [option, setOption] = useState<ScheduleType>(ScheduleType.WorkAndWeekends)

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
            <div onClick={() => setOption(ScheduleType.WorkAndWeekends)} className={classNames(styles.option, { [styles.active]: option === ScheduleType.WorkAndWeekends })}>
              Будни и выходные
              <div className={styles.line} />
            </div>
            <div onClick={() => setOption(ScheduleType.ByDays)} className={classNames(styles.option, { [styles.active]: option === ScheduleType.ByDays })}>
              Режим по дням
              <div className={styles.line} />
            </div>
          </div>
          <div className={styles.wrapper}>
            <SwitchField name='always' label='Круглосуточно' />
            {option === ScheduleType.WorkAndWeekends ?
              <>
              </>
              :
              <>
                <div className={styles.options}>
                  <ScheduleWeekDaysField
                    name='workingDays'
                    duration={(formik.values as any).duration ?? 60}
                    validate={Validator.weekScheduleRequired}
                  />
                </div>
              </>
            }
          </div>
        </div>
      </Form>
    </FormikProvider>
  )
}
