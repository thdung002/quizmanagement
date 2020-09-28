'use strict';
const VariableBaseTypeChecking = function ( value, type, length )
{
    let bResult;
    let minLength = 0;
    if(length !== null && length !== undefined){
        minLength = length;
    }
    bResult = !(typeof value !== type || value == null || value.length <= minLength);
    return bResult;
};
module.exports = {
    VariableBaseTypeChecking
};