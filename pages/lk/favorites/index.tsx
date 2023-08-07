import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import FavoriteRepository from '@/data/repositories/FavoriteRepository'
import { LikeEntityType } from '@/data/enum/LikeEntityType'
import { IFavoriteRecord } from '@/data/interfaces/IFavoriteRecord'
import ReceivingPointCard from '@/components/for_pages/LkPage/Favorites/ReceivingPointCard'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'

interface Props {

}

export default function FavoritesPage(props: Props) {

  const [data, setData] = useState<any[]>([])

  const fetchFavorites = async () => {
    await FavoriteRepository.fetchByType<IFavoriteRecord>(LikeEntityType.receivingPoint).then(data => {
      if (data) {
        setData(data.data)
      }
    }
    )
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const [newFirst, setNewFirst] = useState<boolean>(true)

  const toggleSorting = () => {
    // Reverse the 'data' array when the user clicks on the filter
    setData([...data].reverse())
    setNewFirst(!newFirst)
  }

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>
            Избранное
          </div>
          <div className={styles.filter} onClick={toggleSorting}>
            {newFirst ?
              <>
                <div className={styles.text}>Вначале старые</div>
                <SortTopToBottomSvg color={colors.dark500} />
              </>
              :
              <>
                <div className={styles.text}>Вначале новые</div>
                <SortBottomToTopSvg color={colors.dark500} />
              </>}
          </div>
        </div>
        <div className={styles.container}>
          {data.map((i, index) =>
            <ReceivingPointCard item={i} key={index} />
          )}
        </div>
      </div>
    </Layout>
  )
}

