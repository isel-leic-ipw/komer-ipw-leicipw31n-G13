export const errorCodes = {
    INVALID_ARGUMENT: 1000,
    NOT_FOUND: 1001,
    REPEATED_VALUE: 1002
}

export const errors = {
    INVALID_ARGUMENT : (argumentName) => {
        return {
            code: errorCodes.INVALID_ARGUMENT,
            message : `Invalid ${argumentName}`
        }
    },
    NOT_FOUND : (errorMessage) => {
        if(errorMessage) {
            return{
                code: errorCodes.NOT_FOUND,
                message: `${errorMessage}`
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
    }

}