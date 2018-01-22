const structureGenerator = require('folder-structure-generator');
const {PackageModel} = require('../models/PackageModel');
const {NpmrcModel} = require('../models/NpmrcModel');
const {TsConfigModel} = require('../models/TsConfigModel');
const {JasmineModel} = require('../models/JasmineModel');
const {Renderer} = require('../helpers/Renderer');
const fs = require('fs');
const path = require('path');
const {exec} = require('shelljs');


class Generator {

    constructor() {
        this.rootPath = __dirname;
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
    }

    getTemplatesPath() {
        return path.join(__dirname, '../templates');
    }

    setFolderStructure(json) {
        this.folderStructure = json;
    }

    setPackageModel(packageModel) {
        this.packageModel = packageModel;
    }

    setNpmrcModel(npmrcModel) {
        this.npmrcModel = npmrcModel;
    }

    setTsConfigModel(tsConfigModel) {
        this.tsConfigModel = tsConfigModel;
    }

    setJasmineModel(jasmineModel) {
        this.jasmineModel = jasmineModel;
    }

    generate() {
        if (this.folderStructure === undefined || this.folderStructure === null) {
            return false;
        }

        if (this.packageModel === undefined || this.packageModel === null) {
            return false;
        }

        if (this.npmrcModel === undefined || this.npmrcModel === null) {
            return false;
        }

        this.folderStructure.structure[0].name = this.packageModel.name;

        structureGenerator(this.folderStructure);
        this.prepareTemplates();
        this.prepareTests();
        this.sendWarningAboutGlobalModules();

        return true;
    }

    prepareTemplates() {
        let renderer = new Renderer();
        let packageRendered = renderer.render(`${this.getTemplatesPath()}/package`, this.packageModel.getParams());
        let npmrcRendered = renderer.render(`${this.getTemplatesPath()}/npmrc`, this.npmrcModel.getParams());
        let tsConfigRendered = renderer.render(`${this.getTemplatesPath()}/tsconfig`, this.tsConfigModel.getParams());
        let jasmineRendered = renderer.render(`${this.getTemplatesPath()}/jasmine`, this.jasmineModel.getParams());

        this.writeToFile(path.resolve(`${this.rootPath}/${this.packageModel.name}/package.json`), packageRendered);
        this.writeToFile(path.resolve(`${this.rootPath}/${this.packageModel.name}/.npmrc`), npmrcRendered);
        this.writeToFile(path.resolve(`${this.rootPath}/${this.packageModel.name}/tsconfig.json`), tsConfigRendered);
        this.writeToFile(path.resolve(`${this.rootPath}/${this.packageModel.name}/jasmine.js`), jasmineRendered);
    }

    writeToFile(filePath, content) {
        fs.writeFileSync(filePath, content);
    }

    prepareTests() {
        // exec(`cd ${this.rootPath}/${this.packageModel.name} && jasmine init`);
    }

    sendWarningAboutGlobalModules() {
        setTimeout(() => {
            console.log('----------------------------------------------------');
            console.log('');
            console.log('');
            console.log('Run: ');
            console.log(`cd ${this.rootPath}/${this.packageModel.name} && npm install`);
            console.log('');
            console.log('You have to install jasmine for tests:');
            console.log('npm install -g jasmine');
            console.log('');
            console.log('Init jasmine test framework');
            console.log(`cd ${this.rootPath}/${this.packageModel.name}/src && jasmine init`);
            console.log('')
        }, 1000);
    }
}

module.exports.PackageModel = PackageModel;
module.exports.Generator = Generator;
module.exports.NpmrcModel = NpmrcModel;
module.exports.JasmineModel = JasmineModel;
module.exports.TsConfigModel = TsConfigModel;