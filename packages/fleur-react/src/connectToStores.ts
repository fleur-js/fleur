import { ComponentContext } from '@fleur/fleur'
import * as React from 'react'

import { useStore } from './useStore'
import { WithRef } from './WithRef'

export type StoreGetter = ComponentContext['getStore']

type StoreToPropMapper<P, T> = (state: any, props: P) => T

type ConnectedComponent<Props, MappedProps> = React.ComponentType<
  WithRef<Pick<Props, Exclude<keyof Props, keyof MappedProps>>>
>

export const connectToStores = <Props, MappedProps = {}>(
  mapStoresToProps: StoreToPropMapper<Props, MappedProps>,
) => <ComponentProps extends object>(
  Component: React.ComponentType<ComponentProps>,
): ConnectedComponent<ComponentProps, MappedProps> => {
  return React.forwardRef((props: any, ref) => {
    const mappedProps = useStore(state => mapStoresToProps(state, props))

    return React.createElement(Component, { ref, ...props, ...mappedProps })
  })
}
