
    // var svg = d3.select("#panel-body-map")
    //     .append("svg");
    // d3 = require("d3@6")

    d3.json('/json-data').then(function(data) {
        var selection = d3.select("#panel-body-map");
        //locations = new Set(data.map(d => d.locations))

        locations = new Set(data.map(d => d.location));
        // var locations = response['location'];
        

        // var date = response[0]['date'];
        // var total_cases = response[0]['total_cases'];
        // locations = new Set(data.map(d => d.countries))
        
        // datevalues = Array.from(d3.rollup(data, ([d]) => d.total_cases, d => +d.date, d => d.country))
        //     .map(([date, data]) => [new Date(date), data])
        //     .sort(([a], [b]) => d3.ascending(a, b));

        console.log(locations)

        // function rank(value) {
        //     const data = Array.from(locations, name => ({name, value: total_cases(location)}));
        //     data.sort((a, b) => d3.descending(a.value, b.value));
        //     for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
        //     return data;
        //   }

    });


