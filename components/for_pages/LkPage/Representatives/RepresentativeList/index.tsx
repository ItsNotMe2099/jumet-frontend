import styles from './index.module.scss'
import {RepresentativeListWrapper, useRepresentativeListContext} from '@/context/representative_list_state'
import ContentLoader from 'components/ui/ContentLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import RepresentativeCard from '@/components/for_pages/LkPage/Representatives/RepresentativeCard'
import EmptyStub from '@/components/ui/EmptyStub'
interface Props {

}

const RepresentativeListInner = (props: Props) => {
  const representativeListContext = useRepresentativeListContext()

  return (
    <div className={styles.root}>
      {!representativeListContext.isLoaded && <ContentLoader isOpen style={'block'}/>}
      {representativeListContext.isLoaded && representativeListContext.data.total === 0 &&
        <EmptyStub title={'Пока вы не добавили представителей'} text={'Воспользуйте формой выше чтобы добавить представителей'}/>}
     <InfiniteScroll
        dataLength={representativeListContext.data.data.length}
        next={representativeListContext.fetchMore}
        style={{overflow: 'inherit'}}
        loader={representativeListContext.data.total > 0 ?
          <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
        hasMore={representativeListContext.data.total > representativeListContext.data.data.length}
        scrollThreshold={0.6}>
        <div className={styles.list}>
          {representativeListContext.data.data.map((i) => <>
            <RepresentativeCard representative={i} key={i.id} className={styles.card}/></>)}
        </div>
      </InfiniteScroll>
    </div>
  )
}
export default function RepresentativeList(props: Props) {
  return <RepresentativeListWrapper>
    <RepresentativeListInner />
  </RepresentativeListWrapper>
}
