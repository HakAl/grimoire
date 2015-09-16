/**
 * @param root
 * @param extension
 * @constructor
 */
var ScriptLoader = function (root, extension) {
    this.scripts = [];
    this.scriptsToLoad = [];
    this.loadedScripts = [];
    this.root = root || '';
    this.extension = extension || '.js';

    /**
     * @param script
     * @param success
     */
    this.loadScript = function (script, success) {
        this.add(script);
        this.load(success);
    };

    /**
     * @param script
     * @returns {ScriptLoader}
     */
    this.add = function (script) {
        script = this.root + script + this.extension;

        if (this.scripts.indexOf(script) == -1) {
            this.scripts.push(script);
        }
        return this;
    };

    /**
     * @param success
     */
    this.load = function (success) {
        var script;

        // The shift() method removes the first element from an array and returns that element.
        // This method changes the length of the array.
        while (script = this.scripts.shift()) {

            var scriptElement = document.createElement('script'); //add an element named 'script' to document
            scriptElement.type = 'text/javascript';
            scriptElement.async = true;
            scriptElement.src = script;

            /*
             * var.onload is most often used to execute a script once a web page has completely loaded all content
             * If success is a function
             * When onload() is called on scriptElement, execute function success((which points back to scriptElement))
             * scriptElement contains the script passed in load()
             */
            if (typeof success === 'function') {
                scriptElement.onload = function (event) {
                    success(event.target.src);
                };
            } else {
                //this.complete(success);
            }

            //adds one or more elements to the end of an array and returns the new length of the array.
            this.scriptsToLoad.push(script);
            document.head.appendChild(scriptElement); // scriptElement to ?
        }
    };

    /**
     *
     */
    this.complete = function (script) {
        this.loadedScripts.push(script);
        this.scriptsToLoad.pop();
        //this.scriptsToLoad.splice(this.scriptsToLoad.indexOf(script, 1));
        //this.scriptsToLoad = this.scriptsToLoad.splice(this.scriptsToLoad.indexOf(script, 1))
    };
};
