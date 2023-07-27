import styles from 'components/modals/MapSelectorModal/index.module.scss'

import { useAppContext } from 'context/state'
import {Form, Formik} from 'formik'
import MapField from 'components/fields/MapField'
import Button from 'components/ui/Button'
import {useEffect, useState} from 'react'
import {MapSelectorModalArguments} from '@/types/modal_arguments'
import {ILocation} from '@/data/interfaces/ILocation'
interface IFormData{
  location: ILocation | null
}
interface Props {
  isBottomSheet: boolean
}

export default function MapSelectorModal(props: Props) {
  const appContext = useAppContext()
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowMap(true)
    }, 1500)

  }, [])
  const args = appContext.modalArguments as MapSelectorModalArguments
  const submit = (data: IFormData) => {
    args.onChange(data.location)
  }
  const handleClear = () => {

  }
  const result = (
    <Formik initialValues={{location: args.location ?? null}} onSubmit={submit}>
      {(formik)  => (
        <Form className={styles.form}>
          <div className={styles.mapWrapper}>
          {showMap && <MapField name={'location'} className={styles.map} mapClassName={styles.yaMap} />}
          </div>
          <div className={styles.bottom}>
            <div className={styles.buttons}>
              <Button color="grey" styleType='large'  fluid type="button" onClick={props.isBottomSheet ? appContext.hideBottomSheet : appContext.hideModal}>
                Назад
              </Button>
              <Button color={'blue'} styleType="large"  fluid type="submit">
                Сохранить
              </Button>
            </div>

          </div>
        </Form>
      )}


    </Formik>
  )

  return (
    <div className={styles.root}>
      {result}
    </div>
  )
}

