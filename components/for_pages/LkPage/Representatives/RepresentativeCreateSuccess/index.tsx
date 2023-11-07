import styles from './index.module.scss'
import * as React from 'react'
import CopyData from '@/components/ui/CopyData'
import {Routes} from '@/types/routes'
import {Nullable} from '@/types/types'
import useClient from '@/components/hooks/useClient'

interface Props {
  code?: Nullable<string>
}
export default function RepresentativeCreateSuccess(props: Props) {

  const isClient = useClient()
  return <div className={styles.root}>
    <div className={styles.text}>
      Для завершения добавления представителя, ему необходимо внести свои паспортные данные. При указании паспортных данных потребуется код, отправленный на номер телефона представителя.
    </div>
    {props.code && <div className={styles.code}>Код из смс: {props.code}</div>}
    {isClient && <CopyData copyText={'Ссылка скопирована'} text={Routes.getGlobal(Routes.representativeRegistration)} buttonName={'Скопировать ссылку'} label={'Ссылка на страницу для ввода паспортных данных'}/>}
  </div>
}
