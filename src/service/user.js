import BaseRequest from '@/service/base_request'

export default class UserRequest extends BaseRequest {
  async getFeatures(staffNo) {
    const res = await this.GET(`features/${staffNo}`)
    return res
  }

  async login(params) {
    const res = await this.POST('login/', params)
    return res
  }
}
