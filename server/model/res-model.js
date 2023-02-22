// 基本返回数据模型
class BaseModel {
    constructor(data, message) {
        if (typeof data === "string") {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// 成功code = 0
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 0;
    }
}

// 失败code = -1
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};