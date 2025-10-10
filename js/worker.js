console.log('worker');

self.importScripts('./fuse.js');

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        const list = jsondata;
        self.addEventListener('message', event => {
            let options = {
                // isCaseSensitive: false,
                // includeScore: false,
                // shouldSort: true,
                // includeMatches: false,
                // findAllMatches: false,
                minMatchCharLength: 3,
                // location: 0,
                threshold: 0.5,
                // distance: 100,
                // useExtendedSearch: false,
                ignoreLocation: true,
                // ignoreFieldNorm: false,
                // fieldNormWeight: 1,
                keys: event.data.options.keys
            };

            self.postMessage(new Fuse(list, options).search(event.data.query));
        });
    });