const {TemplateModel} = require('./TemplateModel');

class NpmrcModel extends TemplateModel{

    constructor() {
        super();
        this.params = {};
        this.params.registry = 'registry=https://registry.npmjs.org/';
    }

    set registry(value) {
        this.params.registry = value;
    }

    get registry() {
        return this.params.registry;
    }
}

module.exports.NpmrcModel = NpmrcModel;