import { IdMap } from '../types/types'

export const deleteFromList = <T>(list: T[] | undefined, target: T): void => {
  if (!list) return
  const index = list.indexOf(target)
  if (index > -1) {
    list.splice(index, 1)
  }
}

export const addNormalizedData = <T, U extends T | true>(
  keys: { byId: { [id: string]: U | undefined }; allIds: string[] },
  id: string,
  value: U
) => {
  if (!keys.byId[id]) {
    keys.allIds.push(id)
  }
  keys.byId[id] = value
}

export const deleteNormalizedData = <T, U extends T | true>(
  keys: { byId: { [id: string]: U | undefined }; allIds: string[] },
  id: string
) => {
  deleteFromList(keys.allIds, id)
  delete keys.byId[id]
}

export const toggleIdMap = (idMap: IdMap, id: string) => {
  const is = idMap[id]
  if (is) {
    delete idMap[id]
  } else {
    idMap[id] = true
  }
}
