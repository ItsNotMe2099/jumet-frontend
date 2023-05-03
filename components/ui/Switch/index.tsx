import { colors } from '@/styles/variables'
import React from 'react'
import RSwitch from 'react-switch'

interface Props {
  checked: boolean
  onChange: (val: boolean) => void
  height?: number
  width?: number
  offColor?: string
  onColor?: string
  handleDiameter?: number
  unCheckedIcon?: boolean
  checkedIcon?: boolean
  offHandleColor?: string
  onHandleColor?: string
}

export default function Switch(props: Props) {


  return (
      <RSwitch
        onChange={props.onChange}
        checked={props.checked}
        handleDiameter={props.handleDiameter ?? 16}
        uncheckedIcon={props.unCheckedIcon ?? false}
        checkedIcon={props.checkedIcon ?? false}
        height={props.height ?? 24}
        width={props.width ?? 37}
        offColor={props.offColor ?? colors.grey400}
        onColor={props.onColor ?? colors.yellow}
        offHandleColor={props.offHandleColor ?? colors.white}
        onHandleColor={props.onHandleColor ?? colors.white}
      />
  )
}
