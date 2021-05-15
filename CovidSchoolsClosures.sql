DROP TABLE IF EXISTS SchoolClosures, CountryDistance;

CREATE TABLE SchoolClosures (
  Country VARCHAR,
  iso_code VARCHAR,
  date VARCHAR,
  school_closures INT
  PRIMARY KEY(Country,date)
);

CREATE TABLE CountryDistance (
  iso_code VARCHAR,
  continent varchar,
  location varchar,
  date date,
  total_cases int,
  new_cases int,
  total_deaths int,
  new_deaths int,
  total_cases_per_million float,
  new_cases_per_million float,
  total_deaths_per_million float,
  new_deaths_per_million float,
  hosp_patients int,
  hosp_patients_per_million float,
  weekly_icu_admissions float,
  weekly_icu_admissions_per_million float,
  weekly_hosp_admissions float,
  weekly_hosp_admissions_per_million float,
  new_tests int,
  total_tests int,
  total_tests_per_thousand float,
  new_tests_per_thousand float,
  positive_rate float,
  total_vaccinations int,
  people_vaccinated int,
  people_fully_vaccinated int,
  new_vaccinations int,
  stringency_index float,
  population int,
  population_density float,
  median_age float,
  aged_65_older float,
  aged_70_older float,
  gdp_per_capita float,
  extreme_poverty float,
  cardiovasc_death_rate float,
  diabetes_prevalence float,
  hospital_beds_per_thousand float,
  life_expectancy float,
  human_development_index float
  PRIMARY KEY(location,date)
  FOREIGN KEY(location,date) REFERENCES SchoolClosures (Country);

);