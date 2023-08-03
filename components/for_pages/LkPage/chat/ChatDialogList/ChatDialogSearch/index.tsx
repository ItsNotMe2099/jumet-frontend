import styles from './index.module.scss'
import React, {KeyboardEventHandler} from 'react'
import classNames from 'classnames'
import {colors} from 'styles/variables'
import SearchSvg from '@/components/svg/SearchSvg'

interface Props {
  onChange: (value: string) => void
}

export default function ChatDialogSearch(props: Props){
  const handleKeyDown: KeyboardEventHandler = (e)=>{
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
  //    formik.submitForm()
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value)
  }

    return (
      <div className={classNames({[styles.root]: true, [styles.outlined]: false})} >
        <SearchSvg className={styles.inputIcon} color={colors.grey500}/>
        <input type="text" placeholder="Поиск" onKeyDown={handleKeyDown} className={styles.input}
               onChange={handleChange}
        />
      </div>
    )

}
