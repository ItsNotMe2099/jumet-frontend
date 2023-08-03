import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import React, {KeyboardEventHandler, useRef, useState} from 'react'
import cx from 'classnames'
import {useChatDialogContext} from 'context/chat_dialog_state'
import {RequestError} from 'types/types'
import {SnackbarType} from 'types/enums'
import {useAppContext} from 'context/state'
import {IChatMessageFormData} from '@/types/form_data/IChatMessageFormData'
import TextAreaChatField from '@/components/fields/TextAreaChatField'
import IconButton from '@/components/ui/IconButton'
import {colors} from '@/styles/variables'
import SendSvg from '@/components/svg/SendSvg'

interface Props {
}

export default function ChatMessageForm() {
  const appContext = useAppContext()
  const chatContext = useChatDialogContext()
  const [sending, setSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handleSubmit = async (data: IChatMessageFormData) => {
  if(!data.message?.replace(/\s+/g, ' ').trim()){
    return
  }
  setSending(true)
    try {
     await chatContext.sendMessage(data)
      formik.resetForm({
        values: {
          message: '',
        },
      })
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)


    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    setSending(false)
  }

  const formik = useFormik<IChatMessageFormData>({
    initialValues: {
     message: ''
    },

    onSubmit: handleSubmit,
  })
  const handleKeyDown: KeyboardEventHandler = (e)=>{
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formik.submitForm()
    }
  }

    return (
      <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={styles.field}>
          <TextAreaChatField
            ref={inputRef}
            name={'message'}
            disabled={sending}
            placeholder={'Сообщение'}
            styleType={'message'}
            onKeyDown={handleKeyDown}
            className={cx(styles.textarea)}
          />
            <IconButton bgColor={'blue500'} disabled={!formik.values.message?.replace(/\s+/g, ' ').trim() || sending} spinner={sending}>
              <SendSvg color={colors.white}/>
            </IconButton>
         </div>
        </Form>
      </FormikProvider>
    )

}

