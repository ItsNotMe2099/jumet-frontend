import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import Banner from '@/components/for_pages/MainPage/Banner'
import { useState } from 'react'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'
import OrgCard from '@/components/for_pages/MainPage/OrgCard'

export default function Index() {

  const data = {
    data: [
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: false, opens: '9', closes: '23', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8'
      },
    ],
    total: 100,
    page: 1
  }


  const [filter, setFilter] = useState<string>('low')

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
            <div className={styles.top}>
              <div className={styles.total}>
                {data.total} пункта приема
              </div>
              <div className={styles.filter} onClick={() => setFilter(filter === 'high' ? 'low' : 'high')}>
                {filter === 'low' ?
                  <>
                    <div className={styles.text}>Вначале с большей ценой</div>
                    <SortTopToBottomSvg color={colors.dark500} />
                  </>
                  :
                  <>
                    <div className={styles.text}>Вначале с меньшей ценой</div>
                    <SortBottomToTopSvg color={colors.dark500} />
                  </>}
              </div>
            </div>
            <div className={styles.list}>
              {data.data.map((i, index) =>
                <OrgCard item={i} key={index} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
