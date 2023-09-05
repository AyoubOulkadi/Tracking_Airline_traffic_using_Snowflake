ALTER TABLE Airline_sample_table
MODIFY COLUMN hor_dep TIME;

ALTER TABLE Airline_sample_table
MODIFY COLUMN hor_arri TIME;

SELECT
    hor_dep,
    hor_arri,
    TIMEDIFF('hour', hor_dep, hor_arri) AS flight_duration_hours
FROM
    Airline_sample_table;

ALTER TABLE Airline_sample_table
ADD COLUMN flight_duration INT; 

UPDATE Airline_sample_table
SET flight_duration = ROUND(TIMEDIFF('minute', hor_dep, hor_arri));

UPDATE Airline_sample_table
SET flight_duration = REPLACE(flight_duration, '-', '');

ALTER TABLE Airline_sample_table
RENAME COLUMN flight_duration TO flight_duration_departure;



SELECT * FROM AIRLINE_SAMPLE_TABLE ; 


ALTER TABLE Airline_sample_table
MODIFY COLUMN hor_dep_retour TIME;

ALTER TABLE Airline_sample_table
MODIFY COLUMN hor_retourTIME;

SELECT
    hor_dep,
    hor_arri,
    TIMEDIFF('hour', hor_dep, hor_arri) AS flight_duration_return
FROM
    Airline_sample_table;

ALTER TABLE Airline_sample_table
ADD COLUMN flight_duration_return INT; 

UPDATE Airline_sample_table
SET flight_duration_return = ROUND(TIMEDIFF('minute', hor_dep_retour, hor_retour));

UPDATE Airline_sample_table
SET flight_duration_return = REPLACE(flight_duration_return, '-', '');

DELETE FROM Airline_sample_table
WHERE flight_duration_return < 15;
DELETE FROM Airline_sample_table
WHERE flight_duration_departure < 15;

ALTER TABLE AIRLINE_SAMPLE_TABLE
ALTER COLUMN date_de_depart TYPE DATE;
ALTER COLUMN date_de_retour TYPE DATE;



SELECT
    *,
    CASE
        WHEN DAYOFWEEK( date_de_depart) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END AS departure_day_type,
    CASE
        WHEN DAYOFWEEK( date_de_retour) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END AS arrival_day_type
 FROM
    AIRLINE_SAMPLE_TABLE;

ALTER TABLE AIRLINE_SAMPLE_TABLE
ADD COLUMN Season STRING; 

UPDATE AIRLINE_SAMPLE_TABLE
SET Season = CASE
    WHEN MONTH(date_de_depart) IN (12, 1, 2) THEN 'Winter'
    WHEN MONTH(date_de_depart) IN (3, 4, 5) THEN 'Spring'
    WHEN MONTH(date_de_depart) IN (6, 7, 8) THEN 'Summer'
    WHEN MONTH(date_de_depart) IN (9, 10, 11) THEN 'Autumn'
END;

ALTER TABLE AIRLINE_SAMPLE_TABLE
ADD COLUMN departure_day_type STRING,
ADD COLUMN arrival_day_type STRING;

UPDATE AIRLINE_SAMPLE_TABLE
SET
    departure_day_type = CASE
        WHEN DAYOFWEEK(date_de_depart) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END,
    arrival_day_type = CASE
        WHEN DAYOFWEEK(date_de_retour) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END;




ALTER TABLE Airline_sample_table
ADD COLUMN price_category STRING;

UPDATE Airline_sample_table
SET price_category = CASE 
                       WHEN PRICE < 200 THEN 'Budget'
                       WHEN PRICE BETWEEN 200 AND 500 THEN 'Standard'
                       ELSE 'Premium'
                     END;

ALTER TABLE Airline_sample_table
ADD COLUMN flight_route STRING;
SELECT *,
       CONCAT(CITY_DEPARTURE, ' - ', CITY_ARRIVAL) AS flight_route
FROM Airline_sample_table;
UPDATE Airline_sample_table
SET flight_route = CONCAT(CITY_DEPARTURE, ' - ', CITY_ARRIVAL);