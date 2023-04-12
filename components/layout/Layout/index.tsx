import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {

  return (
    <div className={styles.root}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
