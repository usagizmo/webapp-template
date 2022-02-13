import { storage } from '@/libs/firebase'
import { ref } from 'firebase/storage'
import { ulid } from 'ulid'

export const getArticlesStorageRef = () => ref(storage, `articles/${ulid()}`)
