var Grimoire = function (scriptsRoot, scriptsExtension) {
    this.scripts = [];
    this.loadingScripts = [];
    this.loadedScripts = [];
    this.scriptsRoot = scriptsRoot || '';
    this.scriptsExtension = scriptsExtension || '.js';

    this.add = function (script) {
        script = this.scriptsRoot + script + this.scriptsExtension;
        if (this.scripts.indexOf(script) == -1) {
            this.scripts.push(script);
        }

        return this;
    };

    this.load = function (success) {
        var script;

        while (script = this.scripts.shift()) {
            var scriptElement = document.createElement('script');

            scriptElement.type = 'text/javascript';
            scriptElement.async = true;
            scriptElement.src = script;

            if (typeof success === 'function') {
                scriptElement.onload = function (event) {
                    success(event.target.src);
                };
            }

            this.loadingScripts.push(script);
            document.head.appendChild(scriptElement);
        }
    };

    this.addAndLoad = function (script, success) {
        this.add(script);
        this.load(success);
    }
};