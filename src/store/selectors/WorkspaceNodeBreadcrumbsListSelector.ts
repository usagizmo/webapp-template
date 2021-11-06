import { BreadcrumbsList } from '../../types/localDataTypes'
import { State } from '../useStore'
import breadcrumbSelector from './breadcrumbs/breadcrumbSelector'
import breadcrumbsListSelector from './breadcrumbs/breadcrumbsListSelector'

const workspaceNodeBreadcrumbsListSelector = (state: State, nodeId: string): BreadcrumbsList => {
  const breadcrumb = breadcrumbSelector(state, nodeId)
  const breadcrumbsList = breadcrumbsListSelector(state, [[breadcrumb]], {
    [breadcrumb.nodeId]: true,
  })
  return breadcrumbsList
}

export default workspaceNodeBreadcrumbsListSelector
