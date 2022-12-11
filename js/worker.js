console.log('worker');

self.importScripts('./fuse.js');

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        const list = jsondata;

        const options = {
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
            keys: [
                "question"
            ]
        };

        const fuse = new Fuse(list, options);

        self.addEventListener('message', event => {
            self.postMessage(fuse.search(event.data));
        });
    });