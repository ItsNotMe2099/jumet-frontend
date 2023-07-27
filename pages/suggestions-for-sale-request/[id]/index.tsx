import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { GetServerSideProps } from 'next'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { format } from 'date-fns'
import { useState } from 'react'
import classNames from 'classnames'
import { points } from '@/data/temp/points'
import SuggestionCard from '@/components/for_pages/suggestions-for-sale-request/SuggestionCard'

interface Props {
  saleRequest: ISaleRequest
}

export default function SuggestionsForSaleRequest({ saleRequest }: Props) {

  const [status, setStatus] = useState<'all' | 'new' | 'familiar' | 'declined'>('all')



  const fetchSuggestions = async () => {

  }

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.title}>
          Заявка №245 от {format(new Date(saleRequest.createdAt), 'dd.MM.yyyy')}
        </div>
        <div className={styles.switch}>
          <div onClick={() => setStatus('all')} className={classNames(styles.status, { [styles.active]: status === 'all' })}>
            Все предложения
            {status === 'all' && <div className={styles.line} />}
          </div>
          <div onClick={() => setStatus('new')}
            className={classNames(styles.status, { [styles.active]: status === 'new' })}>
            Новые
            {status === 'new' && <div className={styles.line} />}
          </div>
          <div onClick={() => setStatus('familiar')}
            className={classNames(styles.status, { [styles.active]: status === 'familiar' })}>
            Знакомые
            {status === 'familiar' && <div className={styles.line} />}
          </div>
          <div onClick={() => setStatus('declined')}
            className={classNames(styles.status, { [styles.active]: status === 'declined' })}>
            Отклоненные
            {status === 'declined' && <div className={styles.line} />}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.list}>
            {points.data.map((i, index) =>
              <SuggestionCard key={index} point={i} suggestion={'Вывоз металлолома, вывоз металла, вывоз лома. ПРИНИМАЕМ ДОРОГО ВЫВОЗИМ БЫСТРО ПО ВСЕМ РАЙОНАМ Москвы и обл. Опломбированные весы. Расчет сразу после взвешивания.'} />
            )}
          </div>
          <div className={styles.side}>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const id = context.query?.id

  // Fetch data only if 'id' is present and is a number
  if (id && typeof id === 'string') {
    const res = await SaleRequestRepository.searchById(+id)

    return {
      props: {
        saleRequest: res.data[0] // Assuming res contains the fetched data
      }
    }
  }

  // If 'id' is not present or is not a number, return an empty object
  return {
    props: {}
  }
}