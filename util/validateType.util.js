const validateType = (givenObject, schema) => {
    let nonStandardFields=[];
    let valid = true;
    const typeFields = Object.keys(schema);
    const fields = Object.keys(givenObject);
    
    nonStandardFields = fields.filter( (el) => {
        const got = typeFields.find( crEl => crEl===el );
        return (typeof got==='undefined');
    });
    
    if(nonStandardFields && nonStandardFields.length>0){
       valid = false;        
    }

    return {nonStandardFields, valid};
};

module.exports = validateType;

