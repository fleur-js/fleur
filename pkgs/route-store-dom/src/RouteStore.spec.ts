import { RouteStore } from './RouteStore'
import { createRouteStore, RouteStoreClass } from './createRouteStore'

describe('RouteStore', () => {
  let Router: RouteStoreClass<any>
  let store: RouteStore

  beforeEach(() => {
    Router = createRouteStore({
      articlesShow: {
        path: '/articles/:id',
        handler: null,
      },
    })

    store = new Router(null)
  })

  it('Should not route to partialy matched route', async () => {
    const route = store.getRoute('/articles/not/match')
    expect(route).toBe(null)
  })

  it('Should correct make path', () => {
    const path = Router.makePath('articlesShow', { id: 1 })
    expect(path).toBe('/articles/1')
  })

  it('Should correct make path with params', () => {
    const path = Router.makePath('articlesShow', { id: 1 }, { comment: 1 })
    expect(path).toBe('/articles/1?comment=1')
  })

  it('Should get route with hash / query', () => {
    const route = store.getRoute('/articles/1?a=1#anchor')

    expect(route).toMatchObject({
      name: 'articlesShow',
      url: '/articles/1?a=1',
      params: { id: '1' },
      query: { a: '1' },
      handler: null,
      meta: {},
      config: {
        path: '/articles/:id',
        handler: null,
      },
    })
  })

  it('Should get route without hash / query', () => {
    const route = store.getRoute('/articles/1')

    expect(route).toMatchObject({
      name: 'articlesShow',
      url: '/articles/1',
      params: { id: '1' },
      query: {},
      handler: null,
      meta: {},
      config: {
        path: '/articles/:id',
        handler: null,
      },
    })
  })
})
