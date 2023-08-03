import Layout from '@/components/layout/Layout'
import ChatPage from '@/components/for_pages/LkPage/chat'
import {getAuthServerSideProps} from '@/utils/auth'

interface Props {
}

export default function LkChatPage(props: Props) {
  return (
    <Layout>
     <ChatPage/>
    </Layout>
  )
}

export const getServerSideProps = getAuthServerSideProps()
