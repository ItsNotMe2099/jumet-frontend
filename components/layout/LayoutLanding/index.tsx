import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import { IPageable } from '@/types/types'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'
import FooterLanding from '../FooterLanding'
import HeaderLanding from '../HeaderLanding'

interface Props {
  children?: ReactElement | ReactElement[]
  seo?: IPageable
}

export default function LayoutLanding(props: Props) {

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
        <HeaderLanding isSticky />
        {props.children}
        <FooterLanding />
      </StickyContainer>
    </div>
  )
}

