const utils = require('../../utils/utils');
module.exports = {
    //挂载utils
    error(...args){
        utils.error(this,...args);
    },
    //校验
    validate(rules, data) {
        data = data || this.request.body;
        const schema = this.app.validator;
        const validator = new schema(rules);
        validator.validate(data, (errors, fields) => {
            if(errors) {
                this.throw(422,"invalid param",{
                    code: 'invalid param',
                    message:errors[0].message
                });
            }
        });
    },
    
};