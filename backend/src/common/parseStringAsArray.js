module.exports = (arrayAsString)=>{
    return arrayAsString.split(",").map(e => e.trim());
};
