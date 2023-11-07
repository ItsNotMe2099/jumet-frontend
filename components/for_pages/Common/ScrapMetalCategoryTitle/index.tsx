import styles from './index.module.scss'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import QuestionPopover from '@/components/ui/QuestionPopover'
import {useDataContext} from '@/context/data_state'
import classNames from 'classnames'


interface Props  {
  category: ScrapMetalCategory
  className?: string
}

export default function ScrapMetalCategoryTitle(props: Props) {
    const dataContext = useDataContext()

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.title}>Лом категории {dataContext.scrapMetalCategoriesMap[props.category]?.name ?? props.category}</div>
      {dataContext.scrapMetalCategoriesMap[props.category]?.description && <QuestionPopover info={dataContext.scrapMetalCategoriesMap[props.category]?.description!} />}
    </div>
  )
}
