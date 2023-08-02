import styles from './index.module.scss'
import classNames from 'classnames'
import * as React from 'react'
import {IMenuItem} from 'types/types'
import {MenuItem} from '@/components/for_pages/Common/MenuVertical/MenuDropdown/MenuItem'


interface Props<T> {
  items: IMenuItem<T>[]
  onClick: (item: IMenuItem<T>) => void
}

export function MenuDropdown<T>(props: Props<T>){
  return (
    <div className={classNames(styles.root, {

    })}>
      {props.items.map((i, index) => <MenuItem key={i.link} title={i.name} link={i.link} onClick={() => props.onClick(i)}/>
      )}
    </div>
  )
}
