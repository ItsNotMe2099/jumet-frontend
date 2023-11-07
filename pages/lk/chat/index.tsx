import ChatPage from '@/components/for_pages/LkPage/chat'
import {getAuthServerSideProps} from '@/utils/auth'
import {LkPageBaseLayout} from '@/pages/lk'

interface Props {
}

const LkChatPage = (props: Props) => {
  return (
     <ChatPage/>
  )
}
LkChatPage.getLayout = LkPageBaseLayout
export default LkChatPage
export const getServerSideProps = getAuthServerSideProps()
