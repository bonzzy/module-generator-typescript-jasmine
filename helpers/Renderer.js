const fs = require('fs');

class Renderer {

    render(file, params) {
        let renderedFile = fs.readFileSync(file).toString();

        for (const key in params) {
            let value = params[key];
            const regex = new RegExp('{{'+key+'}}', 'g');
            renderedFile = renderedFile.replace(regex, value);
        }

        return renderedFile;
    }
}

module.exports.Renderer = Renderer;