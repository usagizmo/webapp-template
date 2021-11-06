import { SetState } from 'zustand'
import produce from 'immer'
import { IdMap } from '../../types/types'
import { addNormalizedData, deleteNormalizedData } from '../../utils/stateUtils'
import { State } from '../useStore'

export interface SelectedRelationNodeSlice {
  selectedRelationNodeIdMap: IdMap
  allSelectedRelationNodeIds: string[]
  selectRelationNode: (relationNodeId: string) => void
  releaseRelationNode: (relationNodeId: string) => void
  toggleSelectedRelationNode: (relationNodeId: string) => void
  resetSelectedRelationNode: () => void
}

export const selectRelationNodeToState = (state: State, relationNodeId: string) => {
  addNormalizedData(
    {
      byId: state.selectedRelationNodeIdMap,
      allIds: state.allSelectedRelationNodeIds,
    },
    relationNodeId,
    true
  )
}

export const releaseRelationNodeFromState = (state: State, relationNodeId: string) => {
  deleteNormalizedData(
    {
      byId: state.selectedRelationNodeIdMap,
      allIds: state.allSelectedRelationNodeIds,
    },
    relationNodeId
  )
}

const createSelectedRelationNodeSlice = (set: SetState<State>): SelectedRelationNodeSlice => ({
  selectedRelationNodeIdMap: {},
  allSelectedRelationNodeIds: [],
  selectRelationNode: (relationNodeId: string) => {
    set(
      produce((state: State) => {
        selectRelationNodeToState(state, relationNodeId)
      })
    )
  },
  releaseRelationNode: (relationNodeId: string) => {
    set(
      produce((state: State) => {
        releaseRelationNodeFromState(state, relationNodeId)
      })
    )
  },
  toggleSelectedRelationNode: (relationNodeId: string) => {
    set(
      produce((state: State) => {
        if (state.selectedRelationNodeIdMap[relationNodeId]) {
          releaseRelationNodeFromState(state, relationNodeId)
        } else {
          selectRelationNodeToState(state, relationNodeId)
        }
      })
    )
  },
  resetSelectedRelationNode: () => {
    set({
      selectedRelationNodeIdMap: {},
    })
  },
})

export default createSelectedRelationNodeSlice
