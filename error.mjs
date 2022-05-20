export const errorCodes = {
    INVALID_ARGUMENT: 1000,
    NOT_FOUND: 1001,
    REPEATED_VALUE: 1002,
    INVALID_TOKEN:1003,
    INVALID_USER:1004
}

export const errors = {
    INVALID_ARGUMENT : (argumentName) => {
        return {
            code: errorCodes.INVALID_ARGUMENT,
            message : `Invalid ${argumentName}`
        }
    },
    NOT_FOUND : (errorMessage = '') => {
        errorMessage = errorMessage ? errorMessage + '' : errorMessage
        if(errorMessage) {
            return{
                code: errorCodes.NOT_FOUND,
                message: `${errorMessage} Not found`
            }
        }
        return {
            code: errorCodes.NOT_FOUND,
            message: `Not found`
        }
    },
    REPEATED_VALUE : (argumentId) => {
        return {
            code: errorCodes.REPEATED_VALUE,
            message: `Group already has recipe with id = ${argumentId}`
        }
    },
    INVALID_TOKEN: () => {
        return {
            code: errorCodes.INVALID_TOKEN,
            message: `Invalid token`
        }
    },
    INVALID_USER:() => {
        return{
            code: errorCodes.INVALID_USER,
            message: `Invalid user`
        }
    }

}