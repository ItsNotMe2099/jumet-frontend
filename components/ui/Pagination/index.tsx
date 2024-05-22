import styles from './index.module.scss'
import ReactPaginate from 'react-paginate'

interface Props {
  pageCount: number
  page: number
  onSetPage: (page: number) => void
}



export default function Pagination(props: Props) {
  console.log('props.page', props.page, props.pageCount)
  return (
    <ReactPaginate
      breakLabel={<p className={styles.paginationLink}>...</p>}
      breakClassName={styles.item}
      nextLabel={null}
      activeLinkClassName={styles.item_active}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.item}
      onClick={(el)=>{
        //@ts-ignore
        props.onSetPage(el.nextSelectedPage + 1)
      }}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={props.pageCount}
      forcePage={props.page - 1}
      previousLabel={null}
      renderOnZeroPageCount={null}
    />  )
}
