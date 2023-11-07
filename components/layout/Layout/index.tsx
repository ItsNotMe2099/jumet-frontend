import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import {IPageable} from '@/types/types'
import { NextSeo } from 'next-seo'
import {useAppContext} from '@/context/state'
import ContentLoader from '@/components/ui/ContentLoader'
import {ReactElement} from 'react'

const LayoutContentAuth = (props: {children: ReactElement | ReactElement[]}) => {
  const appContext = useAppContext()

  if(!appContext.aboutMe){
    return <ContentLoader isOpen={true} style={'block'}/>
  }
  return <>{props.children}</>

}
interface Props {
  children?: ReactElement | ReactElement[]
  seo?: IPageable
  hasAuth?: boolean
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
        {props.hasAuth ? <LayoutContentAuth>{props.children ?? <></>}</LayoutContentAuth> : props.children}
        <Footer />
      </StickyContainer>
    </div>
  )
}

