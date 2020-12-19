module.exports = {
    start: (port = 1337) => {
        const express = require('express');
        const app = express();

        // Como este é o dodo de produção,
        // restringe o acesso às pastas com os sourcemaps
        // /css_map e /js_map
        app.use('/:type(css|js)_map/*', (req, res) => {
            return res.status(403).end('403 Forbidden');
        });

        // Com as restrições acima, torna a pasta './dist' pública
        app.use('/', express.static('./dist'));
        
        app.listen(port, () => {
            // <green>Server online</green>
            console.log(`\n\x1b[32mServer online\x1b[0m`);
        });
    }
}