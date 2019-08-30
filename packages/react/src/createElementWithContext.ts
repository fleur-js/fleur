import { AppContext } from '@fleur/fleur'
import * as React from 'react'

import { FleurContext } from './ComponentContextProvider'

const createElementWithContext = <P>(
  context: AppContext,
  Component: React.ComponentType<P>,
  props?: P,
): React.ReactElement =>
  React.createElement(
    FleurContext,
    { value: context },
    React.createElement(Component, props || ({} as any)),
  )

export { createElementWithContext }
