export class BaseResponseModel {
  constructor(success = false, data = null) {
    this.success = success;
    this.data = data;
  }
}