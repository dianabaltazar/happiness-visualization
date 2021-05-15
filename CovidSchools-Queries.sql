SELECT cd.*, sc.school_closures
FROM CovidData cd
INNER JOIN  SchoolClosures sc
ON  sc.obs_date = cd.obs_date AND sc.iso_code = cd.iso_code