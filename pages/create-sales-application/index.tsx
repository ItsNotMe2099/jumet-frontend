import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import CreateSalesApplicationForm from '@/components/for_pages/create-sales-application/Form'

interface Props {

}

export default function CreateSalesApplication(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            Продать лом выгодно
          </div>
          <CreateSalesApplicationForm />
        </div>
      </div>
    </Layout>
  )
}
