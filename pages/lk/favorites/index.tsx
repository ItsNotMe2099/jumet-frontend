import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import ReceivingPointCard from '@/components/for_pages/LkPage/Favorites/ReceivingPointCard'
import {FavoriteListWrapper, useFavoriteListContext} from '@/context/favorite_list_state'
import ContentLoader from '@/components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import SortToggleButton from '@/components/ui/Buttons/SortToggleButton'
import {useAppContext} from '@/context/state'
import {SortOrder} from '@/types/enums'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {LkPageBaseLayout} from '@/pages/lk'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'

interface Props {

}

const FavoritesPageInner = (props: Props) => {
  const appContext = useAppContext()
  const favoriteListContext = useFavoriteListContext()

  useEffectOnce(() => {
    favoriteListContext.reFetch()
  })

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
          <SortToggleButton fluid={appContext.isMobile} value={favoriteListContext.sortOrder} onSelect={favoriteListContext.setSortOrder} labels={{
            [SortOrder.Desc]: 'Вначале новые', [SortOrder.Asc] : 'Вначале старыe'
          }}/>

        </div>
        {!favoriteListContext.isLoaded && <ContentLoader isOpen style={'block'}/>}

        <InfiniteScroll
          dataLength={favoriteListContext.data.data.length}
          next={favoriteListContext.fetchMore}
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

const FavoritesPage = (props: Props) => {
  return <FavoriteListWrapper>
    <FavoritesPageInner/>
  </FavoriteListWrapper>
}
FavoritesPage.getLayout = LkPageBaseLayout
export default FavoritesPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Seller)
