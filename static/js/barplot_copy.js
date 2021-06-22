// var svg = d3.select("#panel-body-map")
//     .append("svg");
// d3 = require("d3@6")
let svgWidth = 850;
let svgHeight = 500;

let margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

let svg = d3
  .select("#race-chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



// function xScale(data, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
//       d3.max(data, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

d3.json('/json-data').then(function (SchoolData, err) {
  if (err) throw err;

  SchoolData.forEach(d => {
    d.total_cases = +d.total_cases;
  });


  mar20 = [];
  apr20 = [];
  may20 = [];
  jun20 = [];
  jul20 = [];
  aug20 = [];
  sep20 = [];
  oct20 = [];
  nov20 = [];
  dec20 = [];
  jan21 = [];
  feb21 = [];
  mar21 = [];
  apr21 = [];
  apr22 = [];
  months = [mar20, apr20, may20, jun20, jul20, aug20, sep20,
    oct20, nov20, dec20, jan21, feb21, mar21];

  SchoolData.forEach(d => {
    monthly = {};
    if (d.date === "3/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      mar20.push(monthly);
    } else if (d.date === "4/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      apr20.push(monthly);
    } else if (d.date === "5/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      may20.push(monthly);
    } else if (d.date === "6/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      jun20.push(monthly);
    } else if (d.date === "7/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      jul20.push(monthly);
    } else if (d.date === "8/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      aug20.push(monthly);
    } else if (d.date === "9/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      sep20.push(monthly);
    } else if (d.date === "10/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      oct20.push(monthly);
    } else if (d.date === "11/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      nov20.push(monthly);
    } else if (d.date === "12/10/2020") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      dec20.push(monthly);
    } else if (d.date === "1/10/2021") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      jan21.push(monthly);
    } else if (d.date === "2/10/2021") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      feb21.push(monthly);
    } else if (d.date === "3/10/2021") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      mar21.push(monthly);
    } else if (d.date === "4/10/2021") {
      monthly["date"] = d.date;
      monthly["country"] = d.location;
      monthly["schools"] = d.school_closures;
      monthly["cases"] = d.total_cases;
      apr21.push(monthly);
    };

  });
  // monthTop = []
  // months.forEach(d => {
  //   top10 = []
  //   d.forEach( i => {

  //   })
  //   mar20Top["country"] = mar20.country

  // })

  mar20_values = mar20.map(d => d.cases)
  mar20_values.sort(function (a, b) {
    return b - a;
  });

  apr20_values = apr20.map(d => d.cases)
  apr20_values.sort(function (a, b) {
    return b - a;
  });

  may20_values = may20.map(d => d.cases)
  may20_values.sort(function (a, b) {
    return b - a;
  });

  jun20_values = jun20.map(d => d.cases)
  jun20_values.sort(function (a, b) {
    return b - a;
  });

  jul20_values = jul20.map(d => d.cases)
  jul20_values.sort(function (a, b) {
    return b - a;
  });

  aug20_values = aug20.map(d => d.cases)
  aug20_values.sort(function (a, b) {
    return b - a;
  });

  sep20_values = sep20.map(d => d.cases)
  sep20_values.sort(function (a, b) {
    return b - a;
  });

  oct20_values = oct20.map(d => d.cases)
  oct20_values.sort(function (a, b) {
    return b - a;
  });

  nov20_values = nov20.map(d => d.cases)
  nov20_values.sort(function (a, b) {
    return b - a;
  });

  dec20_values = dec20.map(d => d.cases)
  dec20_values.sort(function (a, b) {
    return b - a;
  });

  jan21_values = jan21.map(d => d.cases)
  jan21_values.sort(function (a, b) {
    return b - a;
  });

  feb21_values = feb21.map(d => d.cases)
  feb21_values.sort(function (a, b) {
    return b - a;
  });

  mar21_values = mar21.map(d => d.cases)
  mar21_values.sort(function (a, b) {
    return b - a;
  });

  apr21_values = apr21.map(d => d.cases)
  apr21_values.sort(function (a, b) {
    return b - a;
  });

  mar20Limit = mar20_values.slice(9, 10)
  apr20Limit = apr20_values.slice(9, 10)
  may20Limit = may20_values.slice(9, 10)
  jun20Limit = jun20_values.slice(9, 10)
  jul20Limit = jul20_values.slice(9, 10)
  aug20Limit = aug20_values.slice(9, 10)
  sep20Limit = sep20_values.slice(9, 10)
  oct20Limit = oct20_values.slice(9, 10)
  nov20Limit = nov20_values.slice(9, 10)
  dec20Limit = dec20_values.slice(9, 10)
  jan21Limit = jan21_values.slice(9, 10)
  feb21Limit = feb21_values.slice(9, 10)
  mar21Limit = mar21_values.slice(9, 10)
  apr21Limit = apr21_values.slice(9, 10)

  mar20Top = []
  mar20.forEach(d => {
    dict = {};
    if (d.cases >= mar20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      mar20Top.push(dict);
    }
  });

  apr20Top = []
  apr20.forEach(d => {
    dict = {};
    if (d.cases >= apr20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      apr20Top.push(dict);
    }
  });

  may20Top = []
  may20.forEach(d => {
    dict = {};
    if (d.cases >= may20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      may20Top.push(dict);
    }
  });

  jun20Top = []
  jun20.forEach(d => {
    dict = {};
    if (d.cases >= jun20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      jun20Top.push(dict);
    }
  });

  jul20Top = []
  jul20.forEach(d => {
    dict = {};
    if (d.cases >= jul20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      jul20Top.push(dict);
    }
  });

  aug20Top = []
  aug20.forEach(d => {
    dict = {};
    if (d.cases >= aug20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      aug20Top.push(dict);
    }
  });

  sep20Top = []
  sep20.forEach(d => {
    dict = {};
    if (d.cases >= sep20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      sep20Top.push(dict);
    }
  });

  oct20Top = []
  oct20.forEach(d => {
    dict = {};
    if (d.cases >= oct20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      oct20Top.push(dict);
    }
  });

  nov20Top = []
  nov20.forEach(d => {
    dict = {};
    if (d.cases >= nov20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      nov20Top.push(dict);
    }
  });

  dec20Top = []
  dec20.forEach(d => {
    dict = {};
    if (d.cases >= dec20Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      dec20Top.push(dict);
    }
  });

  jan21Top = []
  jan21.forEach(d => {
    dict = {};
    if (d.cases >= jan21Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      jan21Top.push(dict);
    }
  });

  feb21Top = []
  feb21.forEach(d => {
    dict = {};
    if (d.cases >= feb21Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      feb21Top.push(dict);
    }
  });

  mar21Top = []
  mar21.forEach(d => {
    dict = {};
    if (d.cases >= mar21Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      mar21Top.push(dict);
    }
  });

  apr21Top = []
  apr21.forEach(d => {
    dict = {};
    if (d.cases >= apr21Limit) {
      dict["date"] = d.date;
      dict["country"] = d.country;
      dict["schools"] = d.schools;
      dict["cases"] = d.cases;
      apr21Top.push(dict);
    }
  });
  selector = d3.select(".selector")
  selectedMonth = "";
  cases = SchoolData.map(d => d.total_cases)
  function Search() {

    chartGroup.html("")

    if (selector.property("value") === "mar20") {
      selectedMonth = mar20Top;
    } else if (selector.property("value") === "apr20") {
      selectedMonth = apr20Top;
    } else if (selector.property("value") === "may20") {
      selectedMonth = may20Top;
    } else if (selector.property("value") === "jun20") {
      selectedMonth = jun20Top;
    } else if (selector.property("value") === "jul20") {
      selectedMonth = jul20Top;
    } else if (selector.property("value") === "aug20") {
      selectedMonth = aug20Top;
    } else if (selector.property("value") === "sep20") {
      selectedMonth = sep20Top;
    } else if (selector.property("value") === "oct20") {
      selectedMonth = oct20Top;
    } else if (selector.property("value") === "nov20") {
      selectedMonth = nov20Top;
    } else if (selector.property("value") === "dec20") {
      selectedMonth = dec20Top;
    } else if (selector.property("value") === "jan21") {
      selectedMonth = jan21Top;
    } else if (selector.property("value") === "feb21") {
      selectedMonth = feb21Top;
    } else if (selector.property("value") === "mar21") {
      selectedMonth = mar21Top;
    } else if (selector.property("value") === "apr21") {
      selectedMonth = apr21Top;
    }

    // console.log(apr21.slice(0,10));
    // locations = SchoolData.map(d => d.location)
    // top10_locations = SchoolData.map

    let yBandScale = d3.scaleBand()
      .domain(selectedMonth.map(d => d.country))
      .range([height, 0])
      .padding(0.1);

    let xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(selectedMonth, d => d.cases)])
      .range([0, width])

    let bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
    let leftAxis = d3.axisLeft(yBandScale);

    chartGroup.exit().remove()

    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    return chartGroup.selectAll(".bar")
      .data(selectedMonth)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => yBandScale(d.country))
      .attr("x", 1)
      .attr("height", yBandScale.bandwidth())
      .attr("width", d => xLinearScale(d.cases))
      .style("fill", "rgb(12,240,233)")

  }

  d3.select("#monthSelect").on("change", Search)
  //selector.on('change',Search)

}).catch(function (error) {
  console.log(error);
})

