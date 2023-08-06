import Layout from '@/components/layout/Layout'
import {ReceivingPointListWrapper} from '@/context/receiving_point_list_state'
import {nestLayout} from '@/utils/nestLayout'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkReceivingPointBuyerLayout from '@/components/for_pages/LkPage/layout/LkReceivingPointBuyerLayout'
import {ReactElement} from 'react'

export const LkPageBaseLayout = (page: ReactElement) => <Layout>{page}</Layout>




const LkReceivingPageLayoutInner = (page: ReactElement) => {
  return <LkReceivingPointBuyerLayout>
      {page}
  </LkReceivingPointBuyerLayout>
}

const LkPageLayoutInner = (page: ReactElement) => {
  return <ReceivingPointListWrapper>
    <LkLayout>
      {page}
    </LkLayout>

  </ReceivingPointListWrapper>
}

export const LkPageLayout = nestLayout(LkPageBaseLayout, LkPageLayoutInner)
export const LkReceivingPageLayout = nestLayout(LkPageLayout, LkReceivingPageLayoutInner)
