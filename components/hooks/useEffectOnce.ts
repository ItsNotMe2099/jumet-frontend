import {useEffect, useState} from 'react'

export const useEffectOnce = ( effect )=> {
  const [needToCall, setNeedToCall] = useState(false)

  useEffect(()=> {
    if (needToCall) {
      effect()
    }
    else {
      setNeedToCall(true)
    }
  }, [needToCall])
}
