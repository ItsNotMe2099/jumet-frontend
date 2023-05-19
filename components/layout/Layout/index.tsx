import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import {IPageable} from '@/types/types'
import { NextSeo } from 'next-seo'
interface Props {
  children?: React.ReactNode
  seo?: IPageable
}

export default function Layout(props : Props) {

  return (
    <div className={styles.root}>
      {props.seo && (
        <NextSeo
          title={props.seo.seoTitle || props.seo.name}
          description={props.seo?.seoDescription ?? ''}
          additionalMetaTags={[
            {
              property: 'keywords',
              content: props.seo.seoKeywords || '',
            },
          ]}
        />
      )}
      <StickyContainer>
        <Header isSticky />
        {props.children}
        <Footer />
      </StickyContainer>
    </div>
  )
}
