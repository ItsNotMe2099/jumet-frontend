import Layout from '@/components/layout/Layout'
import styles from 'pages/lk/sale-requests/create/index.module.scss'
import CreateSaleRequestForm from '@/components/for_pages/create-sale-request/Form'

interface Props {

}

export default function LkSaleRequestPage(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            Продать лом выгодно
          </div>
          <CreateSaleRequestForm />
        </div>
      </div>
    </Layout>
  )
}
