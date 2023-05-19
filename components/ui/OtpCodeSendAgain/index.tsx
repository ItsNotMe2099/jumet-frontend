import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from '@/components/for_pages/Common/Timer'

interface Props {
  remainSec: number | null
  onSendAgainClick: () => void
}

export default function OtpCodeSendAgain(props: Props) {
   const handleSendAgain = () => {
    if(!props.remainSec  || props.remainSec === 0){
      props.onSendAgainClick()
    }
  }
  console.log('props.remainSec', props.remainSec, )
    return (
      <div className={styles.root}>
        Код не пришел?<br/>
        <span onClick={handleSendAgain}
                                 className={classNames({[styles.link]: true, [styles.active]: (props.remainSec ?? 0) <= 0})}>Запросить код повторно</span>
        {(props.remainSec ?? 0) > 0 && <> через <Timer seconds={props.remainSec ?? 0}/> сек.</>}
      </div>
    )

  return null
}

