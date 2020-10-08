let trim = (x) => {
    let value = String(x);
    return value.replace(/^\s+|\s+$/gm, '')
} 

let isEmpty = (x) => {
    if(x === undefined || x === null ||  trim(x) === '' || x === ''){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    isEmpty : isEmpty
}