
    // var svg = d3.select("#panel-body-map")
    //     .append("svg");
    // d3 = require("d3@6")

    d3.json('/json-data').then(function(data) {
        var selection = d3.select("#panel-body-map");
        var parseDate = d3.timeParse("%m-%d-%Y");
        let dates = Array.from(new Set(data.map(d=>d.date)))
        let foo = []
<<<<<<< HEAD
        let n = 12

        dates.forEach( obs => {
          let subFoo = []
          subFoo.push(obs)
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
        console.log(foo)

        function rank(value) {
          let data = Array.from(locations, locName => ({locName, value: value(locName)}));
          data.sort((a, b) => d3.descending(a.value, b.value));
          for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
          return data;
        }

        rankedLoc = rank(location => foo[0][1].get(location))
        console.log(rankedLoc)
        // dates
        //   .forEach(date => {
        //     let bar = new Map()
        //     let obj = {}
        //     data
        //       .filter(d => d.date == date)
        //       .forEach(d => {
        //         bar.set(d.location, d.total_cases)
        //       })
        //     obj[date] = bar
        //     foo.push(obj)
        //   })
        

        // foo.forEach(d => console.log(d.entries))

        


      // }).catch(function(error) {
      //   console.log(error);      

        function rank(total_cases) {
            let data1 = Array.from(locations, location => ({location, total_cases: total_cases(location)}));
            return data1;

        //     var arr = [79, 5, 18, 5, 32, 1, 16, 1, 82, 13];
        //     var sorted = arr.slice().sort(function(a,b){return b-a})
        //     var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
        //     console.log(ranks);

        //     let data1 = Array.from(locations, x => ({x, y: y(location)}));
        //     data1.sort((a, b) => d3.descending(a.y, b.y));
        //     for (let i = 0; i < data1.length; ++i) data1[i].rank = Math.min(n, i);
        //     return data1;
        }
        
        console.log(rank(location => foo[0][1].get(location)))


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
