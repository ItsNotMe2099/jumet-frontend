import styles from './index.module.scss'

import HtmlText from 'components/ui/HtmlText'
import classNames from 'classnames'
import IPage from 'data/interfaces/IPage'
import PagesRepository from 'data/repositories/PagesRepository'
import Layout from '@/components/layout/Layout'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'

interface Props {
  page: IPage
}

export default function PageItemPage(props: Props) {
  return (
    <Layout seo={props.page}>
      <CenterLayout>

          <HtmlText className={classNames({
            [styles.root]: true,
          })}>
            {props.page.body}
          </HtmlText>
      </CenterLayout>
    </Layout>
  )
}


export const getServerSideProps = async (context: any ) => {
 if(context.query.page === 'index'){
   return {
     props: {},
     notFound: true
   }
 }
  const page = await PagesRepository.fetchBySlug(context.query.page as string)
  console.log('Page11', page)
  return {
    props: {
      page,
    } as Props,
    notFound: !page
  }
}
