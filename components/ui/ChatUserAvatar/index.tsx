import * as React from 'react'
import { useMemo} from 'react'
import IUser from '@/data/interfaces/IUser'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import IFile from '@/data/interfaces/IFile'
import {Nullable} from '@/types/types'
import {IAddress} from '@/data/interfaces/IAddress'
import AvatarCircular from '@/components/ui/AvatarCircular'
import UserSvg from '@/components/svg/UserSvg'
import {colors} from '@/styles/variables'

enum AvatarType {
  Initials = 'initials',
  Image = 'image',
  Stub = 'stub'
}

const avatarColors = [
  '#FFB900',
  '#D83B01',
  '#B50E0E',
  '#E81123',
  '#B4009E',
  '#5C2D91',
  '#0078D7',
  '#00B4FF',
  '#008272',
  '#107C10'
]

function calculateColor(email: string): string {
  let sum = 0
  for (const index in email.split('')) {
    sum += email.charCodeAt(Number(index))
  }
  return avatarColors[sum % avatarColors.length]
}

const initialsFromFirstLastName = (firstName: string | null, lastName: string | null) =>
  (`${firstName?.length ? firstName[0] : ''}${lastName?.length ? lastName[0] : ''}`).toUpperCase()
const initialsFromAddress = (address: IAddress) => {
  const first = address.city || address.region || address.street
  const second = [address.street, address.region, address.city].find(i => i !== first)
  return (`${first?.length ? first[0] : ''}${second?.length ? second[0] : ''}`).toUpperCase()

}


interface Props {
  user?: Nullable<IUser>;
  receivingPoint?: Nullable<IReceivingPoint>,
  file?: Nullable<IFile>
  type: 'user' | 'receivingPoint'
}

export default function ChatUserAvatar(props: Props) {

  const getStrForColor = (): string => {
    switch (props.type) {
      case 'user':
        return getInitials() ?? props.user?.phone ?? ''
      case 'receivingPoint':
        return getInitials() ?? `${props.receivingPoint?.address?.address}` ?? ''
    }
  }
  const getInitials = (): string | null | undefined => {
    switch (props.type) {
      case 'user':
        if (props.user?.firstName || props.user?.lastName) {
          return initialsFromFirstLastName(props.user.firstName, props.user.lastName)
        }
        break
      case 'receivingPoint':
        if (props.receivingPoint?.address?.address) {
          return initialsFromAddress(props.receivingPoint.address)
        }
    }
  }
  const avatarType = useMemo<AvatarType>(() => {
    switch (props.type) {
      case 'user':
        if (props.file) {
          return AvatarType.Image
        } else if ((props.user?.firstName || props.user?.lastName) && getInitials()) {
          return AvatarType.Initials
        } else {
          return AvatarType.Stub
        }
      case 'receivingPoint':
        if (props.file) {
          return AvatarType.Image
        } else if (props.receivingPoint?.address?.address && getInitials()) {
          return AvatarType.Initials
        } else {
          return AvatarType.Stub
        }
      default:
        return AvatarType.Stub
    }
  }, [props.file, props.user, props.receivingPoint, props.type])

  const size = 48
  const color = calculateColor(getStrForColor())
  switch (avatarType) {
    case AvatarType.Image:
      return <AvatarCircular color={color} size={size} file={props.file ?? null}/>
    case AvatarType.Initials:
      return <AvatarCircular color={color} size={size} initials={getInitials()}/>
    case AvatarType.Stub:
      return <AvatarCircular color={color} size={size} icon={<UserSvg color={colors.white} />}/>
  }
}
