import { ref } from 'firebase/storage'
import { ulid } from 'ulid'
import { storage } from '@/libs/firebase'

export const getArticlesStorageRef = () => ref(storage, `articles/${ulid()}`)
