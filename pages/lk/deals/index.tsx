import Select from '@/components/fields/Select'
import Layout from '@/components/layout/Layout'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import DealOfferOwnerRepository from '@/data/repositories/DealOfferOwnerRepository'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import SaleRequestCard from '@/components/for_pages/scrap-for-sale/SaleRequestCard'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'

interface Props {

}

export default function LkDealsPage(props: Props) {

  const [points, setPoints] = useState<IReceivingPoint[]>([])
  const [offers, setOffers] = useState<IDealOffer[]>([])
  const [point, setPoint] = useState<number | null | undefined>(null)
  const [status, setStatus] = useState<'all' | 'applied' | 'accepted' | 'rejected' | 'fromSellers'>('all')

  const fetchReceivingPoints = async () => {
    await ReceivingPointOwnerRepository.fetch().then(data => {
      if (data) {
        setPoints(data)
      }
    })
  }

  const fetchDealOffers = async () => {
    await DealOfferOwnerRepository.fetch().then(data => {
      if (data) {
        setOffers(data)
      }
    })
  }

  const fetchDealOffersByPoint = async () => {
    await DealOfferOwnerRepository.fetchByPoint(point as number).then(data => {
      if (data) {
        setOffers(data)
      }
    })
  }

  useEffect(() => {
    fetchReceivingPoints()
    fetchDealOffers()
  }, [])

  useEffect(() => {
    if (point === null) {
      fetchDealOffers()
    }
    else {
      fetchDealOffersByPoint()
    }
  }, [status, point])

  const options = [
    { label: 'Все пункты приёма', value: null }, // New object added at the beginning of the array
    ...points.map(i => ({ label: i.name, value: i.id })) // Existing options from data array
  ]

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            Предложения лома
          </div>
          <Select options={options} value={point} onChange={(value) => setPoint(value)} />
        </div>
        <div className={styles.switch}>
          <div className={styles.wrapper}>
            <div onClick={() => setStatus('all')} className={classNames(styles.status, { [styles.active]: status === 'all' })}>
              Все предложения
              {status === 'all' && <div className={styles.line} />}
            </div>
            <div onClick={() => setStatus('applied')}
              className={classNames(styles.status, { [styles.active]: status === 'applied' })}>
              На рассмотрении
              {status === 'applied' && <div className={styles.line} />}
            </div>
            <div onClick={() => setStatus('accepted')}
              className={classNames(styles.status, { [styles.active]: status === 'accepted' })}>
              Принятые
              {status === 'accepted' && <div className={styles.line} />}
            </div>
            <div onClick={() => setStatus('rejected')}
              className={classNames(styles.status, { [styles.active]: status === 'rejected' })}>
              Отклоненные
              {status === 'rejected' && <div className={styles.line} />}
            </div>
            <div onClick={() => setStatus('fromSellers')}
              className={classNames(styles.status, { [styles.active]: status === 'fromSellers' })}>
              Прямые предложения от продавцов
              {status === 'fromSellers' && <div className={styles.line} />}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.list}>
            {offers.filter(i => status !== 'all' ? 
              i.status === status : i
            ).map((i, index) =>
              <SaleRequestCard dealOffer={i} item={i.saleRequest as ISaleRequest} key={index} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
