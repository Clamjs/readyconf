var pathLib = require("path");
var fsLib   = require("fs");
var merge   = require("merge");
var mkdirp  = require("mkdirp");

exports.init = function(confFile, param) {
    var confDir = pathLib.dirname(confFile);
    if (!fsLib.existsSync(confDir)) {
        mkdirp.sync(confDir, {mode: 0777});
    }

    if (!fsLib.existsSync(confFile)) {
        fsLib.writeFileSync(confFile, JSON.stringify(param, null, 4));
    }
    else {
        param = merge(true, param, JSON.parse(fsLib.readFileSync(confFile)));
    }

    return param;
}

exports.merge = merge;