const STATUS_CODE = {
    OKE: 200,
    CREATED: 201
}

const REASON_STATUS = {
    OKE: "Success",
    CREATED: 'Created'
}

class SuccessResponse {

    constructor(
        {
            message,
            statusCode = STATUS_CODE.OKE,
            reasonStatus = REASON_STATUS.OKE,
            metadata = {}}
    ) {
        this.message =  message ? message : reasonStatus
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}){
        return res.status(this.status).json(this)
    }

}

class Success extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata});
    }
}

class Created extends SuccessResponse {
    constructor({message, statusCode = STATUS_CODE.CREATED, reasonStatus = REASON_STATUS.CREATED, metadata}) {
        super({message, statusCode, reasonStatus, metadata});
    }
}

module.exports = {
    Success,
    Created,
    SuccessResponse
}
