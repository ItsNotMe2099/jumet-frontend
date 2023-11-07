import { colors } from '@/styles/variables'
import {ButtonProps} from '@/components/ui/Button'
import {MouseEventHandler} from 'react'
import {SnackbarType} from '@/types/enums'
import ShareSvg from '@/components/svg/ShareSvg'
import {useAppContext} from '@/context/state'
import IconButton from '@/components/ui/IconButton'
interface Props extends ButtonProps{
  shareLink: string
}

export default function ShareLinkButton(props: Props) {
  const appContext = useAppContext()
  const handleShareClick: MouseEventHandler = (e) => {
    const shareLink = props.shareLink.includes('https') || props.shareLink.includes('http') ? props.shareLink : `${window.location.host}${props.shareLink}`
    navigator.clipboard.writeText(props.shareLink)
    appContext.showSnackbar('Ссылка скопирована', SnackbarType.success)
  }
  return (
    <IconButton size='medium' bgColor='grey300' onClick={handleShareClick}>
      <ShareSvg color={colors.blue500}/>
    </IconButton>
  )
}

