import React, {useRef} from 'react'
import {IField, IOption} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import ReceivingPointUserRepository from '@/data/repositories/ReceivingPointUserRepository'
import UserUtils from '@/utils/UserUtils'


interface Props extends IField<number | null> {

}

export default function UserField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadOptions = async (search: string, loadedOptions: IOption<number | null>[], {page}): Promise<{options: IOption<number | null>[], hasMore: boolean, additional?: any | null}> => {
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    const res = await ReceivingPointUserRepository.fetch({
      limit: 5,
      page,
    }, {signal: abortControllerRef.current?.signal})
      const hasMore = res.total > res.data.length + loadedOptions.length
      return {
        options: res.data.map(i => ({
          label: i.user ? UserUtils.getName(i.user) : i.email,
          value: i.id
        })),
        hasMore: hasMore,
        additional: {
          page: (page ?? 0) + 1
        }
      }
}


  return (
   <SelectField<number | null> {...props as any}  async={true} loadOptions={loadOptions} options={[]} initialAsyncData={{page: 1}}/>
   )
}

