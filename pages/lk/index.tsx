import Layout from '@/components/layout/Layout'
import {nestLayout} from '@/utils/nestLayout'
import LkLayout from '@/components/for_pages/LkPage/layout'
import LkReceivingPointBuyerLayout from '@/components/for_pages/LkPage/layout/LkReceivingPointBuyerLayout'
import {ReactElement} from 'react'

export const LkPageBaseLayout = (page: ReactElement) => <Layout hasAuth={true}>{page}</Layout>
const LkReceivingPageLayoutInner = (page: ReactElement) => {
  return <LkReceivingPointBuyerLayout>
      {page}
  </LkReceivingPointBuyerLayout>
}

const LkPageLayoutInner = (page: ReactElement) => {
  return (<LkLayout>
      {page}
    </LkLayout>)
}

export const LkPageLayout = nestLayout(LkPageBaseLayout, LkPageLayoutInner)
export const LkReceivingPageLayout = nestLayout(LkPageLayout, LkReceivingPageLayoutInner)
export default function LkPage(){
  return null
}
