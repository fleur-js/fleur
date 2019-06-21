import Fleur, {
  action,
  listen,
  operation,
  Store,
  AppContext,
} from '@fleur/fleur'
import * as React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'

import { useStore } from './useStore'
import { FleurContext } from './AppContextProvider'

describe('useStore', () => {
  // Action Identifier
  const ident = action<{ increase: number }>()

  // Operation
  const op = operation(context => {
    context.dispatch(ident, { increase: 10 })
  })

  // Store
  const TestStore = class extends Store<{ count: number }> {
    public static storeName = 'TestStore'

    public state = { count: 10 }

    get count() {
      return this.state.count
    }

    private increase = listen(ident, payload => {
      this.updateWith(d => (d.count += payload.increase))
    })
  }

  // App
  const app = new Fleur({ stores: { TestStore } })

  const wrapperFactory = (context: AppContext) => {
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(FleurContext, { value: context }, children)
  }

  it('Should map stores to states', async () => {
    const context = app.createContext()
    const { result, unmount } = renderHook(
      () =>
        useStore(state => ({
          count: state.TestStore.count,
        })),
      { wrapper: wrapperFactory(context) },
    )

    expect(result.current).toMatchObject({ count: 10 })

    act(() => {
      context.executeOperation(op)
    })
    await new Promise(r => requestAnimationFrame(r))

    expect(result.current).toMatchObject({ count: 20 })
    unmount()
  })

  it('Should unlisten on component unmounted', async () => {
    const context = app.createContext()

    const { unmount } = renderHook(() => useStore(() => ({})), {
      wrapper: wrapperFactory(context),
    })

    expect(context.storeContext.listeners['change']).toHaveLength(1)
    unmount()
    expect(context.storeContext.listeners['change']).toHaveLength(0)
  })
})
