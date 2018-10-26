### 0.0.7
### API Changes
- Accept action name in first argument of `action()`
  ``` typescript
  const increase = action<{ amount: number }>('increase')
  ```
- Add `actions()` for auto naming actions
  ```typescript
  export const CountActions = actions('Count', {
      increase: action<{ amount: number }>(), // It names 'Count/increase'
  })
  ```
- `ExtractActionIdentifiersFromObject` renamed to `ActionsOf`

### 0.0.6
#### API Changes
- Allow to any types in Store#rehydrate,dehydrate

### 0.0.5
#### Fixes
- Fix missing async-process waiting for OperationContext#e
xecuteOperation

### 0.0.4
#### API Changes
- Accept storeName: string in AppContext.getStore for improve debuggerbility
  No supports in another context getStore methods. (Usable only AppContext.getStore)

### 0.0.3
#### API Changes
- Accept many listener per Action in one Store
  ```ts
  // invalid in 0.0.2
  class SomeStore extends Store {
      private handleSomeAction = listen(someAction, () => { /* Do something */ })
      private handleSomeAction2 = listen(someAction, () => { /* Do something */ }) // error!
  }

  // Can in 0.0.3
  class SomeStore extends Store {
      private handleSomeAction = listen(someAction, () => { /* Do something */ })
      private handleSomeAction2 = listen(someAction, () => { /* Do something */ })
  }
  ```

### 0.0.2
#### API Changes
- Start changelog.
- Rename `Store#produce` to `Store#updateWith`.
- `static storeName = 'someStoreName'` is required for Store.

#### Fixes
- Broken store rehydration state under the Uglify
