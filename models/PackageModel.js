const {TemplateModel} = require('./TemplateModel');

class PackageModel extends TemplateModel {

    constructor() {
        super();
        this.params.name = 'ModuleName';
        this.params.registry = 'https://registry.npmjs.org/';
        this.params.description = 'Npm module';
        this.params.prefix = '';
    }

    set name(value) {
        this.params.name = value;
    }

    set registry(value) {
        this.params.registry = value;
    }

    set description(value) {
        this.params.description = value;
    }

    set prefix(value) {
        this.params.prefix = value;
    }

    get name() {
        return this.params.name;
    }

    get registry() {
        return this.params.registry;
    }

    get description() {
        return this.params.description;
    }

    get prefix() {
        return this.params.prefix;
    }
}

module.exports.PackageModel = PackageModel;