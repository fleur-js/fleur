import { actions, action } from '@fleur/fleur'

export const AppAction = actions('App', {
  setEditTodoId: action<{ id: string | null }>(),
})
