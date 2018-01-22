import { config } from 'utils'

const { appId, secretId } = config

let Parse = require('parse')

Parse.initialize('2NjRq2vT9iTScCj5Oa95ha1CygCnrcityNbaBYMm')
Parse.serverURL = 'http://192.168.1.14:31337/parse'
Parse.User.enableUnsafeCurrentUser()

export function getAccessToken (responseCode) {
  // ToastUtil.showShort(responseCode, true);
  let AccessTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secretId}&code=${responseCode}&grant_type=authorization_code`
  // console.log('AccessTokenUrl=',AccessTokenUrl);
  fetch(AccessTokenUrl, {
    method: 'GET',
    timeout: 2000,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(response => response.json())
    .then((responseData) => {
      console.log('responseData.refresh_token=', responseData)
      this.getRefreshToken(responseData.refresh_token)
    })
    .catch((error) => {
      if (error) {
        console.log('error=', error)
      }
    })


}
export async function wechatLogin (data) {
  try {
    let myAuthData = {
      id: openid,
      access_token: access_token,
    }
    let user = new Parse.User()
    user = await user._linkWith('wechat', myAuthData)
    console.info(user)
    console.log('Sign up done.')
    return Promise.resolve({
      success: true,
    })
  } catch (error) {
    console.log(`Error:${error.code} ${error.message}`)
    return Promise.reject({ success: false })
  }
}

/*
    <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
        <script>
            var obj = new WxLogin({
              id: "login_container",
              appid: "wxed782be999f86e0e",
              scope: "snsapi_login",
              redirect_uri: encodeURIComponent("http://" + window.location.host + "/login.php"),
              state: Math.ceil(Math.random()*1000),
              style: "black",
              href: ""});
        </script>
*/
