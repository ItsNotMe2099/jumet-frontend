import styles from './index.module.scss'
import ProgressBar from "@ramonak/react-progress-bar"

interface Props {
  completed: number
}

export default function Progress(props: Props) {


  return (

    <div className={styles.root}>
      <ProgressBar
        className={styles.progress}
        completed={props.completed}
        isLabelVisible={false}
        bgColor="#CEBBAA"
        baseBgColor="#F0F0F0"
        height="27px"

        borderRadius="2px" />
    </div>

  )
}
