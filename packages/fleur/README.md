# 🌼 Fleur 🌼 [![npm version](https://badge.fury.io/js/%40ragg%2Ffleur.svg)](https://www.npmjs.com/package/@ragg/fleur) [![travis](https://travis-ci.org/ra-gg/fleur.svg?branch=master)](https://travis-ci.org/ra-gg/fleur)
An Fully-typed Flux framework inspired by Fluxible.
Runs on Node / Web.

(No dependence to React. see [this](https://www.npmjs.com/package/@ragg/fleur-react) if you want to use with React.)

## Example

``` typescript
// actions.ts (Action typings)
import { action } from '@ragg/fleur'

export const CounterActions = actions('CounterAction', {
    increase: action<{ amount: number }>(),
    decrease: action<{ amount: number }>(),
}
```

``` typescript
// store.ts (Store)
import { listen, Store } from '@ragg/fleur'
import { CounterActions } from './actions.ts'

export default class SomeStore extends Store {
    public state: { count: number } = { count: 0 }

    private handleIncrease = listen(CounterActions.increase, (payload) => {
        // `this.updateWith` is immutable changing `this.state` with `immer.js`
        this.updateWith(draft => draft.count += payload.amount)
    })

    private handleDecrease = listen(CounterActions.decrease, (payload) => {
        this.updateWith(draft => draft.count -= payload.amount)
    })

    public getCount() {
        return this.state.count
    }
}
```

``` typescript
// operations.ts (Action Creator)
import { operation } from '@ragg/fleur'
import { CounterActions } from './actions.ts'

export const increaseOperation = operation((ctx, { amount }: { amount: number }) => {
    ctx.dispatch(CounterActions.increase, { amount })
})

export const decreaseOperation = operation((ctx, { amount }: { amount: number }) => {
    ctx.dispatch(CounterActions.decrease, { amount })
})
```

``` typescript
// app.ts
import Fleur from '@ragg/fleur'
import SomeStore from './store.ts'

const app = new Fleur({
    stores: [SomeStore],
})

const ctx = app.createContext()
ctx.executeOperation(increaseOperation, { amount: 10 })
console.log(ctx.getStore(SomeStore).getCount()) // => 10
```

## How to use with React?
See [`@ragg/fleur-react`](https://www.npmjs.com/package/@ragg/fleur-react).
