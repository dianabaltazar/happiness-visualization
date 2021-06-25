d3.json('/json-data').then(function (SchoolData, err) {
    if (err) throw err;
  
    SchoolData.forEach(d => {
      d.total_cases = +d.total_cases;
    });