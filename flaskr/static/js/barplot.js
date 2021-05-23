
    // var svg = d3.select("#panel-body-map")
    //     .append("svg");
    // d3 = require("d3@6")

    d3.json('/json-data').then(function(data) {
        var selection = d3.select("#panel-body-map");
        var parseDate = d3.timeParse("%m-%d-%Y");
        let dates = Array.from(new Set(data.map(d=>d.date)))
        let locations = new Set(data.map(d => d.location));
        let foo = []
        let k = 10

        let n = 12

        dates.forEach( obs => {
          let subFoo = []
          subFoo.push(new Date(obs))
          let bar = new Map()
          data
            .filter(d => d.date == obs)
            .forEach(d => {
              bar.set(d.location, d.total_cases)
              //subFoo.push(bar)
            })
          subFoo.push(bar)
          foo.push(subFoo)
        })
       

        function rank(value) {
          let data = Array.from(locations, locName => ({locName, value: value(locName)}));
          data.sort((a, b) => d3.descending(a.value, b.value));
          for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
          return data;
        }

        // console.log(foo)

        rankedLoc = rank(location => foo[0][1].get(location))
        // console.log(rankedLoc)

        function keyframes() {
          const keyframes = [];
          let ka, a, kb, b;
          for ([[ka, a], [kb, b]] of d3.pairs(foo)) {
            // console.log(ka)
            // console.log(a)
            // console.log(kb)
            // console.log(b)
            for (let i = 0; i < k; ++i) {
              const t = i / k;
              keyframes.push([
                new Date(ka * (1 - t) + kb * t),
                rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
              ]);
            }
          }
          keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
          return keyframes;
        }

        nameframes = d3.groups(keyframes().flatMap(([, data]) => data), d => d.locName)

        prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))

        next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))


    });
