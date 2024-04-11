import Mock from 'mockjs'
import features from './data/features.json'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const staffNo = 'admin'

Mock.mock(`${apiBaseUrl}login/`, 'post', (options) => {
  const { staffNo, password } = JSON.parse(options.body)
  if (staffNo === 'admin' && password === '123') {
    console.log('success')
    return {
      code: 200,
      message: '登录成功',
      staffNo: 'admin',
      username: '管理员',
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    }
  }
})

Mock.mock(`${apiBaseUrl}features/${staffNo}`, 'get', features)
