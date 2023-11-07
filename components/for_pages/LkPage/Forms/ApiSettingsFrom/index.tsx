import styles from './index.module.scss'
import { useAppContext } from '@/context/state'
import Button from '@/components/ui/Button'
import { useAboutMeContext} from '@/context/aboutme_state'
import {ModalType, SnackbarType} from '@/types/enums'
import {Nullable, RequestError} from '@/types/types'
import {MouseEventHandler, useEffect, useState} from 'react'
import CurrentUserRepository from '@/data/repositories/CurrentUserRepository'
import useClient from 'components/hooks/useClient'
import CopyData from 'components/ui/CopyData'
import {ConfirmModalArguments} from 'types/modal_arguments'

interface Props {

}

const ApiSettingsForm = (props: Props) => {
  const appContext = useAppContext()
  const aboutMeContext = useAboutMeContext()
  const [apiToken, setApiToken] = useState<Nullable<string>>(null)
  const [loading, setLoading] = useState(false)

  const isClient = useClient()
  useEffect(() => {
    CurrentUserRepository.getApiToken().then(i => {
      setApiToken(i)
    })
  }, [])
  const regenerate = async () => {
    setLoading(true)
    try{
      const res = await CurrentUserRepository.regenerateApiToken()
      setApiToken(res)
      appContext.showSnackbar('Ключ перегенирован', SnackbarType.success)

    }catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setLoading(false)

  }
  const handleSubmit: MouseEventHandler = async (e) => {
    if(apiToken) {
      appContext.showModal(ModalType.Confirm, {
        title: 'Перегенировать ключ?',
        text: 'Текущий ключ перестанет работать и его не возможно будет восстановить',
        onConfirm: async () => {
          regenerate()
        }
      } as ConfirmModalArguments)
    }else{
      regenerate()
    }

  }





  return (
      <div className={styles.root}>
        {isClient && apiToken && <CopyData copyText={'Ключ скопирован'} text={apiToken}/>}
        {!apiToken && <div>Сгенерируйте новый ключ</div>}
       <div> <Button onClick={handleSubmit} spinner={loading} disabled={aboutMeContext.editLoading} type='submit' className={styles.btn} styleType='large' color='blue'>
          {apiToken ? 'Перегенирировать ключ' : 'Сгенерировать ключ'}
        </Button>
       </div>
      </div>
  )
}


export default ApiSettingsForm
