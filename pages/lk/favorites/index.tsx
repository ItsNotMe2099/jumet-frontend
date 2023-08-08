import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import ReceivingPointCard from '@/components/for_pages/LkPage/Favorites/ReceivingPointCard'
import SortTopToBottomSvg from '@/components/svg/SortTopToBottomSvg'
import SortBottomToTopSvg from '@/components/svg/SortBottomToTopSvg'
import { colors } from '@/styles/variables'
import {FavoriteListWrapper, useFavoriteListContext} from '@/context/favorite_list_state'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

interface Props {

}

const FavoritesPageInner = (props: Props) => {
  const favoriteListContext = useFavoriteListContext()
  const [data, setData] = useState<any[]>([])


  useEffect(() => {
    favoriteListContext.reFetch()
  }, [])

  const handleScrollNext = () => {
    favoriteListContext.fetchMore()
  }
  const [newFirst, setNewFirst] = useState<boolean>(true)

  const toggleSorting = () => {
    // Reverse the 'data' array when the user clicks on the filter
    setData([...data].reverse())
    setNewFirst(!newFirst)
  }
  const handleDelete = (receivingPoint: IReceivingPoint) => {
    favoriteListContext.deleteFromFavorite(receivingPoint.id)
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
        <InfiniteScroll
          dataLength={favoriteListContext.data.data.length}
          next={handleScrollNext}
          style={{overflow: 'inherit'}}
          loader={favoriteListContext.data.total > 0 ?
            <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
          hasMore={favoriteListContext.data.total > favoriteListContext.data.data.length}
          scrollThreshold={0.6}>
          <div className={styles.container}>
            {favoriteListContext.data.data.map(i =>
              <ReceivingPointCard item={i} key={i.id} onDelete={() => handleDelete(i)}/>)}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  )
}

export default function FavoritesPage(props: Props) {
  return <FavoriteListWrapper>
    <FavoritesPageInner/>
  </FavoriteListWrapper>
}
