import { request, config } from 'utils'

const { api } = config
const { userSignup } = api

let Parse = require('parse')

Parse.initialize('2NjRq2vT9iTScCj5Oa95ha1CygCnrcityNbaBYMm')
Parse.serverURL = 'http://192.168.1.14:31337/parse'
Parse.User.enableUnsafeCurrentUser()

export async function signup (data) {
  try {
    Parse.User.logOut()
    let user = new Parse.User()
    user.set('username', data.username)
    user.set('password', data.password)

    user = await user.signUp(null)
    console.info(user)
    console.log('Sign up done.')
    return Promise.resolve({
      success: true,
    })
  } catch (error) {
    console.log(`Error:${error.code} ${error.message}`)
    return Promise.reject({ success: false })
  }
  /*
  return request({
    url: userSignup,
    method: 'post',
    data,
  })
  */
  
}
