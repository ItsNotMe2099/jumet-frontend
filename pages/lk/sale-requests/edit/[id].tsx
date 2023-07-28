import Layout from '@/components/layout/Layout'
import styles from 'pages/lk/sale-requests/index.module.scss'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import { SaleRequestStatus } from '@/data/enum/SaleRequestStatus'
import SaleRequestCard from '@/components/for_pages/my-sale-requests/SaleRequestCard'

interface Props {

}

export default function LkSaleRequestEditPage(props: Props) {

  const [status, setStatus] = useState<'active' | 'completed'>('active')
  const [data, setData] = useState<ISaleRequest[]>([])

  const fetchSaleRequests = async () => {
    await SaleRequestOwnerRepository.fetch().then(data => {
      if (data) {
        const dataActive = data.filter(i => i.status !== SaleRequestStatus.Completed)
        const dataCompleted = data.filter(i => i.status === SaleRequestStatus.Completed)
        if (status === 'active') {
          setData(dataActive)
        }
        else {
          setData(dataCompleted)
        }
      }
    })
  }

  useEffect(() => {
    fetchSaleRequests()
  }, [])

  useEffect(() => {
    fetchSaleRequests()
  }, [status])

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Мои заявки на продажу
        </div>
        <div className={styles.switch}>
          <div onClick={() => setStatus('active')} className={classNames(styles.status, { [styles.active]: status === 'active' })}>
            Активные
            {status === 'active' && <div className={styles.line} />}
          </div>
          <div onClick={() => setStatus('completed')}
            className={classNames(styles.status, { [styles.active]: status === 'completed' })}>
            Завершенные
            {status === 'completed' && <div className={styles.line} />}
          </div>
        </div>
        <div className={styles.list}>
          {data.map((i, index) =>
            <SaleRequestCard number={1} item={i} key={i.id} />
          )}
        </div>
      </div>
    </Layout>
  )
}
