import styles from './index.module.scss'
import Item from './Item'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import classNames from 'classnames'

interface IItem {
  icon: ReactElement
  text: string
}

interface Props {
  items: IItem[]
  className?: string
  itemClass?: string
}

export default function AdvantagesBlue(props: Props) {

  return (
    <div className={styles.container} id='benefits'>
      <div className={classNames(styles.root, props.className)}>
        <div className={styles.row}>
          {props.items.map((i, index) =>
            <Item className={props.itemClass} icon={i.icon} text={i.text} key={index} />
          )}
        </div>
      </div>
    </div>
  )
}
