import { SetState } from 'zustand'
import produce from 'immer'
import { State } from '../../useStore'
import { EditableNodeProps, Node } from '../../../types/dataTypes'
import { addNormalizedData, deleteNormalizedData, getDataObject } from '../../../utils/stateUtils'

export interface NodeSlice {
  nodeById: { [id: string]: Node | undefined }
  allNodeIds: string[]
  addNodes: (nodes: Node[]) => void
  deleteNode: (nodeId: string) => void
  updateNode: (nodeId: string, props: EditableNodeProps) => void
}

export const addNodeToState = (state: State, node: Node) => {
  addNormalizedData(
    {
      byId: state.nodeById,
      allIds: state.allNodeIds,
    },
    node.id,
    node
  )
}

export const deleteNodeFromState = (state: State, nodeId: string) => {
  // Confirmation of existence
  getDataObject(state, 'nodeById', nodeId)

  deleteNormalizedData(
    {
      byId: state.nodeById,
      allIds: state.allNodeIds,
    },
    nodeId
  )
}

const createNodeSlice = (set: SetState<State>): NodeSlice => ({
  nodeById: {},
  allNodeIds: [],
  addNodes: (nodes: Node[]) => {
    set(
      produce((state: State) => {
        nodes.forEach((node) => {
          addNodeToState(state, node)
        })
      })
    )
  },
  deleteNode: (nodeId: string) => {
    set(
      produce((state: State) => {
        deleteNodeFromState(state, nodeId)
      })
    )
  },
  updateNode: (nodeId: string, props: EditableNodeProps) => {
    set(
      produce((state: State) => {
        const node = getDataObject(state, 'nodeById', nodeId)
        state.nodeById[nodeId] = { ...node, ...props }
      })
    )
  },
})

export default createNodeSlice
