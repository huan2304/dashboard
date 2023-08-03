//param: array, find property, if not, noproperty
let getParam = (param, property, noproperty) => {
    if (param[property] !== undefined) return param[property];
    return noproperty;
}

module.exports = getParam;