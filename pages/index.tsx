import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'

export default function Index() {
  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Пункты приёма лома
        </div>
        <div className={styles.container}>
          <div className={styles.left}>

          </div>
          <div className={styles.right}>
            <Banner />
          </div>
        </div>
      </div>
    </Layout>
  )
}
