import { useCallback } from 'react'
import clsx from 'clsx'
import { useMethods } from 'react-use'
import { LOGIN_FIELDS_TYPE } from './LoginFields'

const initialTabState: {
  activeTabId: LOGIN_FIELDS_TYPE
  tabs: { id: LOGIN_FIELDS_TYPE; label: string }[]
} = {
  activeTabId: LOGIN_FIELDS_TYPE.LOGIN,
  tabs: [
    {
      id: LOGIN_FIELDS_TYPE.LOGIN,
      label: 'Login',
    },
    {
      id: LOGIN_FIELDS_TYPE.SIGN_UP,
      label: 'Sign up',
    },
  ],
}

function createTabMethods(state: typeof initialTabState) {
  return {
    setCurrent: (nextTabId: LOGIN_FIELDS_TYPE) => ({
      ...state,
      activeTabId: nextTabId,
    }),
  }
}

export const useTab = () => {
  const [tabState, tabMethods] = useMethods(createTabMethods, initialTabState)

  const Tab = useCallback(
    () => (
      <nav className="flex space-x-2" aria-label="Tabs">
        {tabState.tabs.map((tab) => {
          const isActive = tabState.activeTabId === tab.id
          return (
            <button
              type="button"
              key={tab.id}
              className={clsx(
                isActive
                  ? 'bg-gray-100 font-medium'
                  : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => tabMethods.setCurrent(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    ),
    [tabMethods, tabState]
  )

  return { activeTabId: tabState.activeTabId, Tab }
}
