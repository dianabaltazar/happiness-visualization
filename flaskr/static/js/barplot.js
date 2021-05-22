
    // var svg = d3.select("#panel-body-map")
    //     .append("svg");
    // d3 = require("d3@6")

    d3.json('/json-data').then(function(data) {
        var selection = d3.select("#panel-body-map");
        //locations = new Set(data.map(d => d.locations))

        locations = new Set(data.map(d => d.location));
        // var locations = response['location'];
        // console.log(data)     

        // var date = response[0]['date'];
        // var total_cases = response[0]['total_cases'];
        // locations = new Set(data.map(d => d.countries))
        
        datevalues = Array.from(d3.rollup(data, ([d]) => d.total_cases, d => +d.date, d => d.location))
            .map(([date, data]) => [new Date(date), data])
            .sort(([a], [b]) => d3.ascending(a, b));
        
        console.log(datevalues) 

        // function rank(value) {
        //     const data = Array.from(locations, name => ({name, value: total_cases(location)}));
        //     data.sort((a, b) => d3.descending(a.value, b.value));
        //     for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
        //     return data;
        //   }

        //   rank(name => datevalues[0][1].get(name))

        // keyframes = {
        //     const keyframes = [];
        //     let ka, a, kb, b;
        //     for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
        //       for (let i = 0; i < k; ++i) {
        //         const t = i / k;
        //         keyframes.push([
        //           new Date(ka * (1 - t) + kb * t),
        //           rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
        //         ]);
        //       }
        //     }
        //     keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
        //     return keyframes;
        //   }

        // nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)

        // prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))

        // next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))

    });


