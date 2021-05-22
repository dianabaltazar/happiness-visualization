
    // var svg = d3.select("#panel-body-map")
    //     .append("svg");
    // d3 = require("d3@6")

    d3.json('/json-data').then(function(data) {
        var selection = d3.select("#panel-body-map");
        var parseDate = d3.timeParse("%m-%d-%Y");
        let dates = Array.from(new Set(data.map(d=>d.date)))
        let locations = new Set(data.map(d => d.location));
        let foo = []
        dates
          .forEach(date => {
            let bar = new Map()
            let obj = {}
            data
              .filter(d => d.date == date)
              .forEach(d => {
                bar.set(d.location, d.total_cases)
              })
            obj[date] = bar
            foo.push(obj)
          })
        console.log(foo)
      }).catch(function(error) {
        console.log(error);

        // function rank(value) {
        //     const data = Array.from(locations, name => ({name, value: total_cases(location)}));
        //     data.sort((a, b) => d3.descending(a.value, b.value));
        //     for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
        //     return data;
        //   }
          
        //   rank(name => datevalues[0][1].get(name))

        //   rank(name => datevalues[0][1].get(location))

        // keyframes = {
        //     const keyframes = [];
        //     let ka, a, kb, b;
        //     for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
        //       for (let i = 0; i < k; ++i) {
        //         const t = i / k;
        //         keyframes.push([
        //           new Date(ka * (1 - t) + kb * t),
        //           rank(name => (a.get(location) || 0) * (1 - t) + (b.get(location) || 0) * t)
        //         ]);
        //       }
        //     }
        //     keyframes.push([new Date(kb), rank(name => b.get(location) || 0)]);
        //     return keyframes;
        //   }

        // nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.location)

        // prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))

        // next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))

    });
