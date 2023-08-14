import styles from 'components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointWorkingHoursForm/index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import {FileUploadAcceptType, WeekDays} from '@/types/enums'
import Validator from '@/utils/validator'
import {ReactElement, useMemo, useState} from 'react'
import classNames from 'classnames'
import SwitchField from '@/components/fields/SwitchField'
import ScheduleWeekDaysField from '@/components/fields/Schedule/ScheduleWeekDaysField'
import {ScheduleType} from '@/data/enum/ScheduleType'
import FileListField from '@/components/fields/Files/FileListField'
import ScheduleWorkAndWeekendsField, {
  ScheduleGroupDays
} from '@/components/fields/Schedule/ScheduleWorkAndWeekendsField'
import IFile from '@/data/interfaces/IFile'
import {DeepPartial, IScheduleFieldDayDescription} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointUtils from '@/utils/ReceivingPointUtils'
import FormErrorScroll from '@/components/ui/FormErrorScroll'

interface IFormData {
  photos?: IFile[],
  workAlways: boolean,
  workTimes: { [key: string | number]: IScheduleFieldDayDescription },
  workAndWeekends: { [key: string | number]: IScheduleFieldDayDescription },
}

interface Props {
  hasPhotos?: boolean
  receivingPoint?: IReceivingPoint | null
  footer: ReactElement
  onSubmit: (data: DeepPartial<IReceivingPoint>) => Promise<void>
}

export default function ReceivingPointWorkingHoursForm(props: Props) {

  const handleSubmit = async (data: IFormData) => {
    const submitData: any = {
      ...(props.hasPhotos ? {photosIds: data.photos?.map(i => i.id)} : {}),
      workTimes: []
    }
    if (data.workAlways) {
      [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday, WeekDays.saturday, WeekDays.sunday].forEach(weekDay => {
        submitData.workTimes.push({weekDay, startAt: '00:00', finishAt: '23:59:59'})
      })
    } else if (scheduleType === ScheduleType.ByDays) {
      const value = data.workTimes
      const keys = Object.keys(value)
      for (const weekDay of keys) {
        if (value[weekDay].active) {
          submitData.workTimes.push({
            weekDay: parseInt(`${weekDay}`, 10),
            startAt: value[weekDay].startAt,
            finishAt: value[weekDay].finishAt
          })
        }
      }
    } else if (scheduleType === ScheduleType.WorkAndWeekends) {
      const value = data.workAndWeekends
      const keys = Object.keys(value)
      console.log('ScheduleValue', value)
      for (const group of keys) {
        if (!value[group].active) {
          continue
        }

        console.log('itertageGroups', group, value[group])
        switch (group) {
          case ScheduleGroupDays.Work:
            for (const weekDay of [WeekDays.monday, WeekDays.tuesday, WeekDays.wednesday, WeekDays.thursday, WeekDays.friday]) {
              submitData.workTimes.push({weekDay, startAt: value[group].startAt, finishAt: value[group].finishAt})
            }
            break
          case ScheduleGroupDays.Sunday:
            submitData.workTimes.push({
              weekDay: WeekDays.saturday,
              startAt: value[group].startAt,
              finishAt: value[group].finishAt
            })
            break
          case ScheduleGroupDays.Saturday:
            submitData.workTimes.push({
              weekDay: WeekDays.sunday,
              startAt: value[group].startAt,
              finishAt: value[group].finishAt
            })
            break

        }
      }
    }
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
  const workTimeSettings = useMemo(() => props.receivingPoint ? ReceivingPointUtils.getWorkTimesSettings(props.receivingPoint) : null, [props.receivingPoint])
  const workTimeInitialData = useMemo(() => ReceivingPointUtils.convertWorkTimesToFormData(props.receivingPoint ?? null), [props.receivingPoint])
  const [scheduleType, setScheduleType] = useState<ScheduleType>(workTimeSettings?.isWorkDaysSame ? ScheduleType.WorkAndWeekends : ScheduleType.ByDays)
  const initialValues: IFormData = {
    ...(props.hasPhotos ? {photos: props.receivingPoint?.photos ?? []} : {}),
    workAlways: props.receivingPoint && workTimeSettings ? workTimeSettings.isAlways : false,
    workTimes: props.receivingPoint && workTimeSettings ? !workTimeSettings.isWorkDaysSame && !workTimeSettings.isAlways ? workTimeInitialData : {} : {},
    workAndWeekends: props.receivingPoint && workTimeSettings ? workTimeSettings.isWorkDaysSame && !workTimeSettings.isAlways ? {
      ...(workTimeSettings!.firstWorkDay ? {
        [`${ScheduleGroupDays.Work}`]: {
          active: true,
          startAt: workTimeSettings!.firstWorkDay!.startAt! ?? null,
          finishAt: workTimeSettings!.firstWorkDay!.finishAt!
        }
      } : {}),
      ...(workTimeSettings!.map[WeekDays.saturday] ? {
        [`${ScheduleGroupDays.Saturday}`]: {
          active: !!workTimeSettings!.map[WeekDays.saturday],
          startAt: workTimeSettings!.map[WeekDays.saturday]!.startAt,
          finishAt: workTimeSettings!.map[WeekDays.saturday].finishAt
        }
      } : {}),
      ...(workTimeSettings!.map[WeekDays.sunday] ? {
        [`${ScheduleGroupDays.Sunday}`]: {
          active: !!workTimeSettings!.map[WeekDays.sunday],
          startAt: workTimeSettings!.map[WeekDays.sunday]!.startAt,
          finishAt: workTimeSettings!.map[WeekDays.sunday].finishAt
        }
      } : {}),
    } : {} : {},
  }

  console.log('initialValues', initialValues)

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })

  const handle24HoursChange = (value: boolean) => {
    if (!value) {
      return
    }
    const workTimes: any = {}
    for (const day of days) {
      workTimes[day.value] = {
        startTime: '00:00:00',
        endTime: '23:59:59',
        active: true
      }
    }
    formik.setFieldValue('workTimes', workTimes)
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <FormErrorScroll formik={formik} />
        {props.hasPhotos && <FileListField
          name='photos'
          accept={[FileUploadAcceptType.Image]}
          label='Фотографии пункта приема'
          validate={Validator.required}
          //text={<>Перетащите сюда или <span>выберите фото</span> пункта<br /> приёма</>}
        />}
        <div className={styles.working}>
          {props.hasPhotos && <div className={styles.title}>
            Режим работы
          </div>}
          <div className={styles.types}>
            <div onClick={() => setScheduleType(ScheduleType.WorkAndWeekends)}
                 className={classNames(styles.option, {[styles.active]: scheduleType === ScheduleType.WorkAndWeekends})}>
              Будни и выходные
              <div className={styles.line}/>
            </div>
            <div onClick={() => setScheduleType(ScheduleType.ByDays)}
                 className={classNames(styles.option, {[styles.active]: scheduleType === ScheduleType.ByDays})}>
              Режим по дням
              <div className={styles.line}/>
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
        {props.footer}
      </Form>
    </FormikProvider>
  )
}
