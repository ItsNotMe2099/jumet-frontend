import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function IndexPage() {

  const router = useRouter()

  useEffect(() => {
    router.push('/1')
  }, [])

  return (
    <></>
  )
}
