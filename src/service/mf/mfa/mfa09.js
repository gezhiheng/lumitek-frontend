import BaseRequest from '@/service/base_request'

export default class MFA09Request extends BaseRequest {
  async init(staffNo) {
    const res = await this.GET('mfa09/hold-info/init', {
      staffNo: staffNo
    })
    return res
  }

  async add(params) {
    const res = await this.POST('mfa09/hold-info/', params)
    return res
  }

  async update(params) {
    const res = await this.PUT('mfa09/hold-info/', params)
    return res
  }

  async delete(params) {
    const res = await this.DELETE('mfa09/hold-info/', params)
    return res
  }

  async saveOrder(params) {
    const res = await this.PUT('mfa09/hold-info/order/', params)
    return res
  }
}