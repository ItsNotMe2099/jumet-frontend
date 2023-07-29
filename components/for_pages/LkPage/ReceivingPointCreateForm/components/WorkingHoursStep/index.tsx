import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/WorkingHoursStep/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, WeekDays} from '@/types/enums'
import Validator from '@/utils/validator'
import {useState} from 'react'
import classNames from 'classnames'
import SwitchField from '@/components/fields/SwitchField'
import ScheduleWeekDaysField from '@/components/fields/Schedule/ScheduleWeekDaysField'
import {ScheduleType} from '@/data/enum/ScheduleType'
import FileListField from '@/components/fields/Files/FileListField'
import ScheduleWorkAndWeekendsField, {
  ScheduleGroupDays
} from '@/components/fields/Schedule/ScheduleWorkAndWeekendsField'
import IFile from '@/data/interfaces/IFile'
import FormStepFooter from '@/components/ui/FormStepFooter'
import {IFormStepProps, IScheduleFieldDayDescription} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface IFormData{
  photos: IFile[],
  workAlways: boolean,
  workTimes: {[key: string | number]: IScheduleFieldDayDescription},
  workAndWeekends: {[key: string | number]: IScheduleFieldDayDescription},
}
interface Props extends IFormStepProps<IReceivingPoint>{

}

export default function WorkingHoursStep(props: Props) {
  const [scheduleType, setScheduleType] = useState<ScheduleType>(ScheduleType.WorkAndWeekends)

  const handleSubmit = async (data: IFormData) => {
    const submitData: any = {
      photosIds: data.photos?.map(i => i.id),
      workTimes: []
    }
    if(data.workAlways) {
      [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday, WeekDays.saturday, WeekDays.sunday].forEach(weekDay => {
        submitData.workTimes.push({weekDay, startAt: '00:00',finishAt: '23:59:59'})
      })
    }else if(scheduleType === ScheduleType.ByDays){
      const value = data.workTimes
      const keys = Object.keys(value)
      for(const weekDay of keys){
        if(value[weekDay].active){
          submitData.workTimes.push({weekDay, startAt: value[weekDay].startAt,finishAt: value[weekDay].finishAt})
        }
      }
    }else if(scheduleType === ScheduleType.WorkAndWeekends){
      const value =  data.workAndWeekends
      const keys = Object.keys(value)
      for(const group of keys){
        if(!value[group].active){
          continue
         }

        switch (group){
          case ScheduleGroupDays.Work:
            for(const weekDay of [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday]){
              submitData.workTimes.push({weekDay, startAt: value[group].startAt,finishAt: value[group].finishAt})
            }
            break
          case ScheduleGroupDays.Sunday:
          case ScheduleGroupDays.Saturday:
            submitData.workTimes.push({weekDay: group, startAt: value[group].startAt,finishAt: value[group].finishAt})
            break

        }
      }
    }
    console.log('submitData', submitData, data)
    props.onSubmit(submitData)

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

  const initialValues: IFormData = {
    photos: [],
    workAlways: false,
    workTimes: {},
    workAndWeekends: {},
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })


  console.log('formik.values', formik.values)
  const handle24HoursChange = (value: boolean) => {
    if(!value){
    return
    }
    const workTimes: any = {}
    for(const day of days) {
      workTimes[day.value] = {
        startTime: '00:00',
        endTime: '23:59:59',
        active: true
      }
    }
    formik.setFieldValue('workTimes', workTimes )
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FileListField
          name='photos'
          accept={[FileUploadAcceptType.Image]}
          label='Фотографии пункта приема'
          validate={Validator.required}
          //text={<>Перетащите сюда или <span>выберите фото</span> пункта<br /> приёма</>}
        />
        <div className={styles.working}>
          <div className={styles.title}>
            Режим работы
          </div>
          <div className={styles.types}>
            <div onClick={() => setScheduleType(ScheduleType.WorkAndWeekends)} className={classNames(styles.option, { [styles.active]: scheduleType === ScheduleType.WorkAndWeekends })}>
              Будни и выходные
              <div className={styles.line} />
            </div>
            <div onClick={() => setScheduleType(ScheduleType.ByDays)} className={classNames(styles.option, { [styles.active]: scheduleType === ScheduleType.ByDays })}>
              Режим по дням
              <div className={styles.line} />
            </div>
          </div>
          <div className={styles.wrapper}>
            <SwitchField name='workAlways' label='Круглосуточно' onChange={handle24HoursChange}/>
            {scheduleType === ScheduleType.ByDays && !formik.values.workAlways &&
              <>
                <div className={styles.options}>
                  <ScheduleWeekDaysField
                    name='workTimes'
                    duration={(formik.values as any).duration ?? 60}
                    validate={Validator.weekScheduleRequired}
                  />
                </div>
              </>
            }
            {scheduleType === ScheduleType.WorkAndWeekends && !formik.values.workAlways &&
              <>
                <div className={styles.options}>
                  <ScheduleWorkAndWeekendsField
                    name='workAndWeekends'
                    duration={(formik.values as any).duration ?? 60}
                    validate={Validator.weekScheduleRequired}
                  />
                </div>
              </>
            }
          </div>
        </div>
        <FormStepFooter hasBack onBack={props.onBack} spinner={props.loading}/>
      </Form>
    </FormikProvider>
  )
}
