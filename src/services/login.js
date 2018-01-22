import { request, config } from 'utils'

const { api } = config
const { userLogin } = api

let Parse = require('parse')

Parse.initialize('2NjRq2vT9iTScCj5Oa95ha1CygCnrcityNbaBYMm')
Parse.serverURL = 'http://192.168.1.14:31337/parse'
Parse.User.enableUnsafeCurrentUser()

export async function login (data) {
  try {
    console.info('login => ', data)
    let user = await Parse.User.logIn(data.username, data.password)
    console.log('Login done.')
    let currentUser = Parse.User.current()
    console.log(`The current user is ${currentUser.get('username')}`)
    return Promise.resolve({
      success: true,
    });
  } catch (error) {
    console.log(`Error:${  error.code  } ${  error.message}`)
    return Promise.reject({ success: false });
  }


  /*
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
  */
}
