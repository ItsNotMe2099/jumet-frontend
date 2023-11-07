import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {CookiesType} from '@/types/enums'
import {getAuthServerSideProps} from '@/utils/auth'
import SaleRequestPage from '@/pages/sale-requests/[id]'
import {UserRole} from '@/data/enum/UserRole'

interface Props {
  saleRequest: ISaleRequest
}


export default function SaleRequestPrivatePage({ saleRequest }: Props) {
  console.log('saleRequest', saleRequest)
  return (<SaleRequestPage saleRequest={saleRequest}/>
  )
}
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer, async (context) => {

  const id = parseInt(context.query.id as string, 10)
  const token = context.req.cookies[CookiesType.accessToken]
  try {

    const saleRequest = await SaleRequestRepository.fetchPrivateById(+id, token)
    if(!saleRequest){
      return {notFound: true} as  { notFound: true }
    }
    return {
      props: {
        saleRequest
      }
    }
  }catch (e) {
    console.error(e)
    return {notFound: true} as  { notFound: true }
  }
})
