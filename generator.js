#!/usr/bin/env node

const GeneratorModule = require('./index');
const Generator = GeneratorModule.Generator;
const PackageModel = GeneratorModule.PackageModel;
const NpmrcModel = GeneratorModule.NpmrcModel;
const TsConfigModel = GeneratorModule.TsConfigModel;
const JasmineModel = GeneratorModule.JasmineModel;
const argv = require('minimist')(process.argv.slice(2));
const {resolve} = require('path');

let jsonStructure = require('./structures/privateModule.json');

let packageModel = new PackageModel();
let npmrcModel = new NpmrcModel();
let tsConfigModel = new TsConfigModel();
let jasmineModel = new JasmineModel();
let generator = new Generator();

if (paramExists('name') || argv._.length >= 1) {
    packageModel.name = getParamValue('name') || argv._[0];
}

if (paramExists('registry')) {
    packageModel.registry = getParamValue('registry');
}

console.log('  ');
console.log('Creating module:', resolve(process.cwd()));
console.log(packageModel.getParams());

generator.setFolderStructure(jsonStructure);
generator.setPackageModel(packageModel);
generator.setNpmrcModel(npmrcModel);
generator.setTsConfigModel(tsConfigModel);
generator.setJasmineModel(jasmineModel);
generator.setRootPath(resolve(process.cwd()));
generator.generate();


function paramExists(key) {
    return (argv[key] !== undefined || argv[key[0]] !== undefined);
}

function getParamValue(key) {
    return argv[key] || argv[key[0]];
}