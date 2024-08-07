import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import DealRepository from '@/data/repositories/DealRepository'


interface Props extends IField<number | null> {
  resettable?: boolean
  onChange: (value: Nullable<number>) => void
}

export default function DealField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadOptions = async (search: string, loadedOptions: IOption<number | null>[], data: any): Promise<{options: IOption<number | null>[], hasMore: boolean, additional?: any | null}> => {
    const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    const res = await DealRepository.fetch({
      limit: 5,
      page,
    ...(search ? {id: parseInt(search, 10)} : {}),
    }, {signal: abortControllerRef.current?.signal})
      const hasMore = res.total > res.data.length + loadedOptions.length
      return {
        options: res.data.map(i => ({
          label: `Сделка № ${i.id}`,
          value: i.id
        })),
        hasMore: hasMore,
        additional: {
          page: (page ?? 0) + 1
        }
      }
}


  return (
   <SelectField<number | null>  {...(props as any)} async={true} loadOptions={loadOptions} options={[]} initialAsyncData={{page: 1}}/>
   )
}

