import {LikeEntityType} from '@/data/enum/LikeEntityType'

export type FavoriteStoreType = {[entityType in LikeEntityType]: number[]}
