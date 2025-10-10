console.log('worker');

self.importScripts('./fuse.js');

let list = [];

fetch("./data.json")
    .then(response => response.json())
    .then(jsondata => {
        list = jsondata;

        self.addEventListener('message', event => {
            const queries = event.data.queries || [];
            if (queries.length === 0) {
                self.postMessage([]);
                return;
            }

            const fuseOptions = {
                threshold: 0.5,
                minMatchCharLength: 3,
                ignoreLocation: true
            };

            let resultSets = queries.map(q => {
                const fuse = new Fuse(list, { ...fuseOptions, keys: [q.key] });
                return new Set(fuse.search(q.value).map(r => r.item.metadata.id));
            });

            let intersection = resultSets.reduce((a, b) =>
                new Set([...a].filter(x => b.has(x)))
            );

            let finalResults = list
                .filter(item => intersection.has(item.metadata.id))
                .map(item => ({ item })); // Wrappiamo ogni oggetto per compatibilità

            self.postMessage(finalResults);
        });
    });