import styles from './index.module.scss'
import {RenderPropSticky} from 'react-sticky-el'
import {useRef, useState} from 'react'
import {usePosition} from '@ernestorb/useposition'
import {useWindowWidth} from '@react-hook/window-size'
import {useAppContext} from '@/context/state'
import Chat from '@/components/for_pages/LkPage/chat/Chat'
import ShowChatMobileToggle from '@/components/for_pages/ReceivingPoint/Tabbar'
import PageModal from '@/components/for_pages/Common/PageModal'
import { RemoveScroll } from 'react-remove-scroll'
import BackButton from '@/components/ui/BackButton'
import {ChatSocketWrapper} from '@/context/chat_socket_state'

interface Props {
  receivingPointId?: number | undefined
  sellerId?: string | undefined
}

const ChatOnPageInner = (props: Props) => {
  const appContext = useAppContext()
  let ref = useRef<HTMLDivElement | null>(null)
  let position = usePosition(ref, {callOnResize: true})
  const windowWidth = useWindowWidth()
  const [showMobile, setShowMobile] = useState(false)
  return (
    <>
      <div ref={ref} className={styles.root}>
        <RenderPropSticky disabled={appContext.isMobile} boundaryElement={`.${styles.root}`} topOffset={0}
                          bottomOffset={84}
                          isIOSFixEnabled={false}
                          hideOnBoundaryHit={false}>
          {({isFixed, wrapperStyles, wrapperRef, holderStyles, holderRef, ...rest}) => (
            <div {...rest} ref={holderRef} style={holderStyles}>
              <div
                {...rest}
                style={
                  isFixed ?
                    {
                      ...wrapperStyles,
                      transform: 'translateY(84px)',
                      display: 'flex',
                      width: windowWidth - (position?.left ?? 0),
                      height: 'calc(100vh - 84px)'
                    } :
                    {
                      ...wrapperStyles,
                      top: 0,
                      position: 'fixed',
                      transform: 'translateY(84px)',
                      display: 'flex',
                      height: 'calc(100vh - 84px)',
                      width: windowWidth - (position?.left ?? 0)
                    }
                }
                ref={wrapperRef}
              >
                <Chat sellerId={props.sellerId} receivingPointId={props.receivingPointId} title={'Чат с пунктом приема'}/>
              </div>
            </div>

          )}
        </RenderPropSticky>
        {showMobile && <RemoveScroll enabled={true}>
          <PageModal className={styles.modalRoot}>
            <div className={styles.chatMobileHeader}>
              <BackButton onClick={() => setShowMobile(false)}>Назад</BackButton>
            </div>
            <div className={styles.chatMobile} >
            <Chat sellerId={props.sellerId}  receivingPointId={props.receivingPointId} title={'Чат с пунктом приема'} onBackClick={() => setShowMobile(false)}/>
            </div>
          </PageModal>
        </RemoveScroll>
        }
      </div>
      {appContext.isMobile && !showMobile && <ShowChatMobileToggle onClick={() => setShowMobile(true)} />}
    </>
  )
}

export default function ChatOnPage(props: Props) {
  return <ChatSocketWrapper>
    <ChatOnPageInner {...props}/>
  </ChatSocketWrapper>
}
