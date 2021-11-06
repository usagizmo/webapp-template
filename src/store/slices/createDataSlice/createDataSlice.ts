import { GetState, SetState } from 'zustand'
import { State } from '../../useStore'
import createNodeSlice, { NodeSlice } from './createNodeSlice'

export type DataSlice = NodeSlice

const createDataSlice = (set: SetState<State>, get: GetState<State>): DataSlice => ({
  ...createNodeSlice(set, get),
})

export default createDataSlice
