import styles from './index.module.scss'
import { ReactElement } from 'react-markdown/lib/react-markdown'

interface Props {
  image: ReactElement
  text: ReactElement
  avatar: ReactElement
}

export default function Advantages(props: Props) {

  return (
    <div className={styles.wrapper} id='#top'>
      <div className={styles.container}>
        <div className={styles.root}>
          {props.image}
          <div>
            {props.avatar}
          </div>
          <div>
            {props.text}
          </div>
        </div>
      </div>
    </div>
  )
}
