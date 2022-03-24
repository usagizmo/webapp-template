import { ref } from 'firebase/storage'
import { ulid } from 'ulid'
import { storage } from '@/lib/firebase'

export const getArticlesStorageRef = () => ref(storage, `articles/${ulid()}`)
