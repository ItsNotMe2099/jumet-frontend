import styles from './index.module.scss'
import {colors} from '@/styles/variables'
import {RepresentativeWrapper, useRepresentativeContext} from 'context/representative_state'
import {IRepresentative} from 'data/interfaces/IRepresentative'
import classNames from 'classnames'
import ChevronDownSvg from 'components/svg/ChevronDownSvg'
import * as React from 'react'
import {useState} from 'react'
import Collapsible from 'react-collapsible'
import UserUtils from '@/utils/UserUtils'
import DescField from '@/components/ui/DescField'
import {ModalType} from '@/types/enums'
import { RepresentativeFormModalArguments} from '@/types/modal_arguments'
import {useAppContext} from '@/context/state'
import Formatter from '@/utils/formatter'
import DeleteButton from '@/components/ui/Buttons/DeleteButton'
import EditButton from '@/components/ui/Buttons/EditButton'
import StatusBadgeRaw from '@/components/ui/StatusBadgeRaw'
import RepresentativeCreateSuccess from '@/components/for_pages/LkPage/Representatives/RepresentativeCreateSuccess'
import PassportDataViewSection from '@/components/for_pages/Common/PassportDataViewSection'


interface CardHeaderProps{
  isOpened: boolean
  onClick: () => void
}
const CardHeader = (props: CardHeaderProps) => {

  const representativeContext = useRepresentativeContext()
  return <div className={classNames(styles.header)} onClick={props.onClick}>
    <div className={styles.left}>
      <div className={styles.title}>{UserUtils.getName(representativeContext.representative)}</div>
      <ChevronDownSvg className={classNames(styles.chevron, {[styles.reversed]: props.isOpened})} color={colors.grey500}/>
      {!representativeContext.representative!.isRegistered && <StatusBadgeRaw label={'Без паспортных данных'} color={'redLight'}/>}

    </div>

  </div>
}
interface Props {
  representative: IRepresentative
  className?: string
}

const RepresentativeCardInner = (props: Props) => {
  const appContext = useAppContext()
  const representativeContext = useRepresentativeContext()
  const passportData = representativeContext.representative?.passport
  const [open, setOpen] = useState<boolean>( false)
  const handleClick = () => [
    setOpen(!open)
  ]
  const trigger = (<CardHeader  isOpened={open} onClick={handleClick}/>)
  return (<div className={classNames(styles.root, props.className)}><Collapsible
    open={open}
    trigger={trigger}
    triggerWhenOpen={trigger}
  >
    <div className={styles.content}>
      {!representativeContext.representative!.isRegistered && <RepresentativeCreateSuccess/>}
      <DescField label={'ФИО представителя'} value={`${UserUtils.getName(representativeContext.representative)}`}/>
      <DescField label={'Телефон'} value={<>
        {Formatter.formatPhone(representativeContext.representative?.phone ?? null)}
        {!representativeContext.representative!.isRegistered && <div className={styles.link} onClick={() => representativeContext.resendCode()}>Запросить код повторно</div>}
      </>}/>
      {passportData && <PassportDataViewSection passportData={passportData} scanModalTitle={'Скан паспорта представителя'}/>}
        <div className={styles.buttons}>
        <DeleteButton onClick={() => representativeContext.delete()}>Удалить представителя</DeleteButton>
          {!representativeContext.representative!.isRegistered && <EditButton onClick={() => appContext.showModal(ModalType.RepresentativeForm, {representative: representativeContext.representative} as RepresentativeFormModalArguments)}/>}
      </div>

    </div>
  </Collapsible>
  </div>)
}
export default function RepresentativeCard(props: Props) {
  return <RepresentativeWrapper representative={props.representative} representativeId={props.representative?.id ?? null}>
   <RepresentativeCardInner representative={props.representative} className={props.className}/>
  </RepresentativeWrapper>
}
