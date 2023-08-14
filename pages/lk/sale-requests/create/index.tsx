import styles from 'pages/lk/sale-requests/create/index.module.scss'
import CreateSaleRequestForm from '@/components/for_pages/create-sale-request/Form'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import {SnackbarType} from '@/types/enums'
import {useState} from 'react'
import Button from '@/components/ui/Button'
import {Routes} from '@/types/routes'
import SuccessBlock from '@/components/for_pages/Common/SuccessBlock'
import {DeepPartial} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {LkPageBaseLayout} from '@/pages/lk'

interface Props {

}

const LkSaleRequestCreatePage = (props: Props) => {
  const appContext = useAppContext()
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async (data: DeepPartial<ISaleRequest>) => {
    setLoading(true)
    try {
      await SaleRequestOwnerRepository.create(data)
      setIsSuccess(true)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  return (
      <div className={styles.root}>
        <div className={styles.container}>
          {isSuccess && <SuccessBlock
            title='Ваша заявка создана!'
            text={<>
              Ваша заявка на модерации. Проверка занимает до 1 рабочего<br /> дня. Пока она идёт – ваша заявка не будет отображаться в каталоге.  Однако вы<br /> можете посмотреть, как будет выглядеть страница вашей заявки.
            </>}
            actions={
              <Button href={Routes.lkSaleRequests} styleType='large' color='blue'>
                Мои заявки
              </Button>
            }
          />}
          {!isSuccess && <div>
            <div className={styles.title}>
              Продать лом выгодно
            </div>
            <CreateSaleRequestForm  loading={loading} submit={handleSubmit}/></div>}
        </div>
      </div>
  )
}
LkSaleRequestCreatePage.getLayout = LkPageBaseLayout
export default LkSaleRequestCreatePage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)
