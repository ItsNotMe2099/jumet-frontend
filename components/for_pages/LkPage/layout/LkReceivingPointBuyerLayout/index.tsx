import {ReceivingPointOwnerWrapper, useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import {ReactElement} from 'react'
import {LkLayoutBackData, LkLayoutTitleData} from '@/context/lk_layout_content'
import {useRouter} from 'next/router'
import {Routes} from '@/types/routes'

interface Props {
  receivingPointId?: number
  title?: string
  actions?: ReactElement[]
  children: ReactElement
}

const LkReceivingPointBuyerLayoutInner = (props: Props) => {

  const receivingPointContext = useReceivingPointOwnerContext()
  return (<>
      <LkLayoutTitleData title={receivingPointContext.receivingPoint?.name ?? ''}/>
      <LkLayoutBackData title={'Пункты приема'} href={Routes.lkReceivingPoints}/>
      {props.children}
    </>
  )
}


export default function LkReceivingPointBuyerLayout(props: Props){
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  return (
    <ReceivingPointOwnerWrapper receivingPointId={parseInt(router.query.id as string, 10)}>
      <LkReceivingPointBuyerLayoutInner receivingPointId={id} title={props.title} actions={props.actions}>{props.children}</LkReceivingPointBuyerLayoutInner>
    </ReceivingPointOwnerWrapper>)
}

