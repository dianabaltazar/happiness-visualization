DROP TABLE IF EXISTS merged;
SELECT c.*, d.school_closures
INTO merged
FROM covidupdated c
INNER JOIN schoolclosuresupdated d
ON c.iso_code = d.iso_code AND c.date = d.date

SELECT iso_code, date, school_closures
FROM schoolclosuresupdated
WHERE iso_code = 'MEX'
AND date = '/1/12/2020'

SELECT iso_code, total_cases, date
FROM merged
WHERE iso_code = 'MEX'
AND date = '/1/12/2020'

/*
DROP TABLE IF EXISTS SchoolClosures;

CREATE TABLE SchoolClosures (
  Country VARCHAR,
  iso_code VARCHAR,
  date VARCHAR,
  school_closures INT
);*/

SELECT * FROM schoolclosures LIMIT 2; /*date: 2020-01-21*/
SELECT iso_code, date FROM covidupdated LIMIT 2; /*date: 24/02/2020*/

SELECT *, CONCAT(RIGHT(date, 2), '/', SUBSTRING(date, 6,2), '/', LEFT(date, 4)) AS datee
INTO schools
FROM schoolclosures;
DROP TABLE IF EXISTS schoolclosures;
ALTER TABLE schools
DROP COLUMN date;

SELECT * FROM schools LIMIT 1

DROP TABLE IF EXISTS merged;
SELECT c.*, d.school_closures
INTO merged
FROM covidupdated c
INNER JOIN schools d
ON c.iso_code = d.iso_code AND c.date = d.datee

SELECT *, CAST(CONCAT(SUBSTRING(date, 4, 2), '/', LEFT(date, 2), '/', RIGHT(date, 4)) AS date) as Date_
INTO merged2
FROM merged
DROP TABLE IF EXISTS merged;

SELECT iso_code, date, Date_ FROM merged2 LIMIT 2
ALTER TABLE merged2
DROP COLUMN date

SELECT * 
INTO merged3
FROM merged2 
ORDER BY date_;
DROP TABLE IF EXISTS merged2;

SELECT *, ROW_NUMBER() OVER(
    PARTITION BY iso_code
    ORDER BY iso_code, date_
) AS Day_num
INTO final
FROM merged3;
DROP TABLE IF EXISTS merged3;







