import {createContext, RefObject, useContext, useEffect, useRef, useState} from 'react'
import IChat from 'data/interfaces/IChat'
import IChatMessage from 'data/interfaces/IChatMessage'
import {useAppContext} from 'context/state'
import {useChatSocketContext} from 'context/chat_socket_state'
import {v4 as uuidv4} from 'uuid'
import {debounce} from 'debounce'
import {useChatContext} from 'context/chat_state'
import useWindowFocus from 'use-window-focus'
import {IChatMessageFormData} from '@/types/form_data/IChatMessageFormData'
import ChatRepository from '@/data/repositories/ChatRepository'
import ChatMessageRepository from '@/data/repositories/ChatMessageRepository'
import {UserRole} from '@/data/enum/UserRole'

const chatIds: number[] = []
const markReadList: number[] = []

interface IState {
  chat: IChat | null,
  messages: IChatMessage[]
  totalMessages: number
  fetchMore: () => void
  loading: boolean
  sendMessage: (data: IChatMessageFormData) => void
  markRead: (messageId: number) => void
  markReadMulti: (messageIds: number[]) => void,
  scrollableTarget: RefObject<HTMLElement> | null
  isDisabledByOtherManager: boolean
}


const defaultValue: IState = {
  chat: null,
  messages: [],
  totalMessages: 0,
  fetchMore: () => null,
  loading: false,
  sendMessage: (data) => null,
  markRead: (messageId: number) => null,
  markReadMulti: (messageIds: number[]) => null,
  scrollableTarget: null,
  isDisabledByOtherManager: false
}

const ChatDialogContext = createContext<IState>(defaultValue)

interface Props {
  chat?: IChat
  chatId?: number | null
  children: React.ReactNode
  receivingPointId?: number
  sellerId?: string
}

export function ChatDialogWrapper(props: Props) {
  const appContext = useAppContext()
  const chatSocket = useChatSocketContext()
  const chatContext = useChatContext()
  const windowFocused = useWindowFocus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const reconnectRef = useRef<boolean>(false)

  const scrollableTarget = useRef<HTMLElement | null>(null)
  const messagesRef = useRef<IChatMessage[]>([])
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [totalMessages, setTotalMessages] = useState<number>(100000000)
  const [page, setPage] = useState<number>(1)
  const [chat, setChat] = useState<IChat | null>(props.chat ?? null)
  const [error, setError] = useState(null)
  const[isDisabledByOtherManager, setIsDisabledByOtherManager] = useState(false)
  const [loading, setLoading] = useState(false)
  const windowFocusInit = useRef(false)
  const chatIdRef = useRef<number | null>(null)

  const limit = 30
  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    chatIdRef.current = props.chatId ?? null
  }, [props.chatId])
  useEffect(() => {
    const isDisabled = !!(appContext.aboutMe?.role === UserRole.Buyer && chat?.managerId && ((chat?.manager?.id ?? chat?.managerId) !== appContext.aboutMe!.id))
    setIsDisabledByOtherManager(isDisabled)
  }, [props.chat])
  const init = async () => {
   let _chat: IChat | null = null
    if (!props.chatId) {
      if (appContext.aboutMe && props.receivingPointId && props.sellerId && (chat?.receivingPointId !== props.receivingPointId || chat?.sellerId !== props.sellerId)) {
        const _chat = await ChatRepository.fetchChatBySellerIdAndReceivingPointId({
          receivingPointId: props.receivingPointId!,
          sellerId: props.sellerId!
        })
        console.log('GetChat112', _chat)
        setChat(_chat)
        if (_chat?.messages) {
          processLoadedMessages(_chat!.messages!.data, _chat!.messages!.total, true)
        } else if (_chat) {
          await loadMessages()
        } else {
          processLoadedMessages([], 0, true)
        }
      } else {
        setChat(null)
        setLoading(false)
        setMessages([])
        setTotalMessages(0)
      }

      return
    }
    if (!chat || chat.id !== props.chatId) {
      _chat = props.chatId ? await ChatRepository.fetchChatById(props.chatId) : null
      setChat(_chat)
    }
    setLoading(true)
    setMessages([])
    setTotalMessages(100000000)
    if (_chat?.messages) {
      processLoadedMessages(_chat!.messages!.data, _chat!.messages!.total)
    } else {
      await loadMessages()
    }
  }
  const markRead = (messageId: number) => {
    markReadList.push(messageId)
    debouncedMarkRead()
  }
  const markReadMulti = (messageIds: number[]) => {
    for (const id of messageIds) {
      if (!markReadList.includes(id)) {
        markReadList.push(id)
      }
    }
    debouncedMarkRead()
  }
  const processLoadedMessages = (data: IChatMessage[], total: number | null, fromInit: boolean = false) => {
    console.log('processLoadedMessages', total)
    if (total === 0) {
      setTotalMessages(messages.length)
    }
    const readIds: number[] = (data ?? []).filter(i => i.id && i.userStates?.some(i => !i.read)).map(i => i.id!)
    if (readIds.length > 0) {
      chatContext.decreaseUnreadCount(props.chatId!, readIds.length)
      markReadMulti(readIds)
    }
    setMessages(i => fromInit ? data : [...i, ...data])
  }
  const loadMessages = async (lastCreatedAt?: string) => {
    const data = await ChatMessageRepository.fetchAll(props.chatId!, lastCreatedAt, limit)
    processLoadedMessages(data.data, data.total)
  }
  const fetchMore = async () => {
    if (!props.chatId) {
      return
    }
    await loadMessages(messages[messages.length - 1]?.createdAt)
    setPage(page + 1)
  }

  const sendMessage = async (data: IChatMessageFormData) => {
    if (!appContext.aboutMe) {
      return
    }
    const sid = uuidv4()
    if ((props.receivingPointId && props.sellerId) && !chat?.id) {
      setTotalMessages(i => i + 1)
      setMessages((i) => [{
        ...data as IChatMessage,
        sid,
        id: 0,
        userId: appContext.aboutMe?.id,
        createdAt: (new Date()).toISOString(),
      }, ...i])
      const chat = await ChatRepository.createChat({
        receivingPointId: props.receivingPointId,
        sellerId: props.sellerId
      })
      setChat(chat)

      ChatMessageRepository.create({...data, chatId: chat!.id, sid})
    } else {
      ChatMessageRepository.create({...data, chatId: chat!.id, sid})
    }
    if (!chat?.id) {
      return
    }


    setTotalMessages(i => i + 1)
    setMessages((i) => [{
      ...data as IChatMessage,
      sid,
      id: 0,
      userId: appContext.aboutMe?.id,
      createdAt: (new Date()).toISOString(),
    }, ...i])
  }
  const debouncedMarkRead = debounce(async () => {
    if (isLoggedRef.current && markReadList.length > 0) {
      const ids = [...markReadList]
      try {
        await ChatMessageRepository.setReadIds(markReadList)
        markReadList.length = 0
      } catch (e) {
        console.error('ErrorMarkRead', e)
      }
    }
  }, 500)
  const debouncedScroll = debounce(async () => {
    if (!scrollableTarget?.current) {
      return
    }
    scrollableTarget?.current?.scroll({
      top: scrollableTarget?.current?.scrollHeight,
      behavior: 'smooth',
    })
  }, 500)
  const debouncedReconnect = debounce(async () => {
    if (!reconnectRef.current) {
      return
    }

    const data = await ChatMessageRepository.fetchAll(props.chatId!, null, limit)

    if (!reconnectRef.current) {
      return
    }
    const lastIds = data.data.map(i => i.id)
    const currentIds = messagesRef.current.map(i => i.id)
    const existsIds = currentIds.filter(i => lastIds.includes(i))
    const newIds = lastIds.filter(i => !existsIds.includes(i))
    if (newIds.length > 0) {
      setMessages(i => ([...lastIds.map(a => data.data.find(i => i.id === a)).filter(i => !!i) as IChatMessage[], ...i]))
      debouncedScroll()
    }
  }, 1000)
  useEffect(() => {
    if (chat) {
      chatSocket.join(chat.id)
    }
    return () => {
      if (chat) {
        chatSocket.leave(chat.id)
      }
    }
  }, [chat])

  useEffect(() => {
    reconnectRef.current = false
    if (props.chatId) {
      chatContext.setCurrentChatId(props.chatId)
    }
    if (appContext.aboutMeLoaded && appContext.aboutMe) {
      init()
    }
  }, [props.receivingPointId, props.sellerId, appContext.aboutMeLoaded, props.chatId])
  useEffect(() => {
    if (!chat) {
      return
    }
    const subscription = chatSocket.messageState$.subscribe((message) => {
      if (message.chatId === chat.id && !messages.find(i => i.id === message.id)) {
        markRead(message.id!)

        if (message.sid && messages.find(i => i.sid === message.sid)) {
          setMessages(i => i.map(i => i.sid === message.sid ? {...i, ...message} : i))
        } else {
          setMessages(i => [message, ...i])
          setTotalMessages(i => i + 1)
        }
        if (message.userId === appContext.aboutMe!.id || (scrollableTarget.current?.scrollTop ?? 0) < 50) {
          debouncedScroll()
        }


      }
    })

    const subscriptionChatUpdate = chatSocket.chatUpdateState$.subscribe((updated) => {
      if (chat.id === updated.id) {
        setChat((i) => ({...i,...updated}))
      }
    })
    return () => {
      subscription.unsubscribe()
      subscriptionChatUpdate.unsubscribe()
    }

  }, [chat, messages])


  useEffect(() => {

    if (!props.chatId) {
      return
    }
    const subscription = chatSocket.reconnectState$.subscribe(async (message) => {
      reconnectRef.current = true
      debouncedReconnect()
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [messages, props.chatId])
  useEffect(() => {
    if (!chatIdRef?.current) {
      return
    }
    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused) {
      reconnectRef.current = true
      debouncedReconnect()
    }
  }, [windowFocused])
  const value: IState = {
    ...defaultValue,
    chat,
    messages,
    totalMessages,
    fetchMore,
    loading,
    sendMessage,
    markRead,
    markReadMulti,
    scrollableTarget,
    isDisabledByOtherManager

  }

  return (
    <ChatDialogContext.Provider value={value}>
      {props.children}
    </ChatDialogContext.Provider>
  )
}

export function useChatDialogContext() {
  return useContext(ChatDialogContext)
}
