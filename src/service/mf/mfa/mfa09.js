import BaseRequest from '@/service/base_request'

export default class MFA09Request extends BaseRequest {
  async init(staffNo) {
    const res = await this.GET(`mfa09/hold-info/init?staffNo=${staffNo}`)
    return res
  }
}