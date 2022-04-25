import Fleur, { action, listen, operation, Store } from '@fleur/fleur'

import { connectToStores } from './connectToStores'
import { createElementWithContext } from './createElementWithContext'
import { create, act } from 'react-test-renderer'

describe('connectToStores', () => {
  // Action Identifier
  const ident = action<{ increase: number }>()

  // Operation
  const op = operation((context) => {
    context.dispatch(ident, { increase: 10 })
  })

  // Store
  const TestStore = class extends Store<{ count: number }> {
    public static storeName = 'TestStore'

    public state = { count: 10 }

    get count() {
      return this.state.count
    }

    private increase = listen(ident, (payload) => {
      this.updateWith((d) => (d.count += payload.increase))
    })
  }

  // Component
  const Receiver = (props: { count: number; anotherProp: string }) => null
  const Connected = connectToStores((getStore) => ({
    count: getStore(TestStore).count,
  }))(Receiver)

  // App
  const app = new Fleur({ stores: [TestStore] })

  it('Should passed non connected props', () => {
    const context = app.createContext()
    const element = createElementWithContext(context, Connected, {
      anotherProp: 'anotherProp',
    })
    const { root, update, unmount } = create(element)
    update(element)

    expect(root.findByType(Receiver).props).toMatchObject({
      anotherProp: 'anotherProp',
    })

    unmount()
  })

  it('Should map stores to props', async () => {
    const context = app.createContext()
    const element = createElementWithContext(context, Connected, {
      anotherProp: 'anotherProp',
    })
    const { root, update, unmount } = create(element)
    update(element)

    expect(root.findByType(Receiver).props).toMatchObject({
      anotherProp: 'anotherProp',
      count: 10,
    })

    await act(async () => {
      await context.executeOperation(op)
      await new Promise((r) => requestAnimationFrame(r))
    })

    expect(root.findByType(Receiver).props).toEqual({
      anotherProp: 'anotherProp',
      count: 20,
    })
    unmount()
  })
})
