import { ref } from 'firebase/storage'
import { storage } from '../libs/firebase'

export const getNodeFileRef = (nodeId: string, fileName: string) =>
  ref(storage, `nodes/${nodeId}/${fileName}`)
