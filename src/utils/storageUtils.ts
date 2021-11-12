import { ref } from 'firebase/storage'
import { storage } from '../libs/firebase'

export const getArticlesStorageRef = (fileName: string) => ref(storage, `articles/${fileName}`)
