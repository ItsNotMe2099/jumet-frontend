import RepresentativeForm from '@/components/for_pages/representative/RepresentativeForm'
//import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'

import styles from './index.module.scss'
interface Props {

}

export default function Representative(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <RepresentativeForm />
      </div>
    </Layout>
  )
}
