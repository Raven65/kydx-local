import { routerRedux } from 'dva/router'
import { signup } from 'services/signup'

export default {
  namespace: 'signup',

  state: {},

  effects: {
    * signup ({
      payload,
    }, { put, call, select }) {
      const data = yield call(signup, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        yield put(routerRedux.push('/login'))
        /*
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/signup') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/login'))
        }*/

      } else {
        throw data
      }
    },
  },

}
