import {createContext, RefObject, useContext, useEffect, useRef, useState} from 'react'
import IChat from 'data/interfaces/IChat'
import ChatRepository from 'data/repositories/ChatRepository'
import {debounce} from 'debounce'
import {useAppContext} from 'context/state'
import {useChatSocketContext} from 'context/chat_socket_state'
import useWindowFocus from 'use-window-focus'

interface IState {
  chats: IChat[]
  currentChatId: number | null,
  totalChats: number
  fetchMore: () => void
  loading: boolean
  search: string | null
  fetchSearch: (value: string) => void
  decreaseUnreadCount: (chatId: number, total: number) => void
  setCurrentChatId: (chatId: number | null) => void,
  scrollableTarget: RefObject<HTMLElement> | null
}


const defaultValue: IState = {
  chats: [],
  totalChats: 0,
  currentChatId: 0,
  fetchMore: () => null,
  loading: false,
  search: null,
  fetchSearch: (value) => null,
  decreaseUnreadCount: (chatId: number, total: number) => null,
  setCurrentChatId: (chatId: number | null) => null,
  scrollableTarget: null
}

const ChatContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function ChatWrapper(props: Props) {
  const appContext = useAppContext()
  const chatSocket = useChatSocketContext()
  const abortControllerRef = useRef<AbortController | null>(null)
  const windowFocused = useWindowFocus()
  const isLogged = appContext.isLogged
  const isLoggedRef = useRef<boolean>(isLogged)
  const searchRef = useRef<string | null>(null)
  const scrollableTarget = useRef<HTMLElement | null>(null)
  const [chats, setChats] = useState<IChat[]>([])
  const [currentChatId, setCurrentChatId] = useState<number | null>(0)
  const [totalChats, setTotalChats] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const windowFocusInit = useRef(false)
  const limit = 30

  const debouncedSearch = debounce(async (value: string) => {
    if (value.length < 2) {
      setSearch(null)
      setPage(1)
      setLoading(true)
      await loadMessages(1)
      setLoading(false)
      return
    }

    setSearch(value)
    setPage(1)
    setLoading(true)
    await loadMessages(1, value)
    setLoading(false)
  }, 400)
  const debouncedReconnect = debounce(async () => {
    const data = await ChatRepository.fetchAll(page, chats.length > limit ? chats.length : limit)
    setChats(data.data ?? [])
    setTotalChats(data.total)
  }, 1000)
  const init = async () => {
    await loadMessages(1)
    setLoading(false)
  }
  const loadMessages = async (page: number, search?: string) => {
    if (abortControllerRef.current) {
      console.log('abortControllerRef.current', abortControllerRef.current)
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      const data = await ChatRepository.fetchAll(page, limit, search, {signal: abortControllerRef.current?.signal})

      abortControllerRef.current = null
      if (search || page === 1) {
        setChats(data.data)
      } else {
        setChats(i => [...i, ...data.data])
      }

      setTotalChats(data.total)
    } catch (e) {
      return
    }

  }
  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])

  useEffect(() => {
    searchRef.current = search
  }, [search])


  useEffect(() => {
    init()
  }, [])


  useEffect(() => {
    if(!currentChatId){
        return
    }
    const subscription = chatSocket.messageAllState$.subscribe((message) => {
      if (searchRef.current) {
        return
      }
      if (chats.find(i => i.id === message.chatId)) {
        setChats(i => i.map(i => i.id === message.chatId ? {
          ...i,
          lastMessageAt: message.createdAt,
          lastMessage: message.message ?? '',
          totalUnread: message.chatId === currentChatId ? i.totalUnread : i.totalUnread + 1
        } : i)
          .sort(
            (objA, objB) => (new Date(objB.lastMessageAt)).getTime() - (new Date(objA.lastMessageAt)).getTime(),
          ))
      } else if (page === 1) {
        loadMessages(1)
      }
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [chats, currentChatId])

  useEffect(() => {
    const subscription = chatSocket.reconnectState$.subscribe(async (val) => {
      if (!searchRef.current) {
        debouncedReconnect()
      }
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [chats])
  useEffect(() => {
    if (!windowFocusInit.current) {
      windowFocusInit.current = true
      return
    }
    if (windowFocused && !searchRef.current) {
      debouncedReconnect()
    }
  }, [windowFocused])
  const fetchMore = async () => {
    await loadMessages(page + 1)
    setPage(page + 1)
  }

  const value: IState = {
    ...defaultValue,
    currentChatId,
    setCurrentChatId,
    chats,
    totalChats,
    loading,
    fetchMore,
    search,
    fetchSearch(value: string) {
      debouncedSearch(value)
    },
    decreaseUnreadCount(chatId: number, total: number) {
      setChats(i => i.map(i => i.id === chatId ? {
        ...i,
        totalUnread: i.totalUnread - total < 0 ? 0 : i.totalUnread - total
      } : i))
    },
    scrollableTarget

  }

  return (
    <ChatContext.Provider value={value}>
      {props.children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  return useContext(ChatContext)
}
