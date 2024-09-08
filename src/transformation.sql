-- Combine all MODIFY COLUMN commands
ALTER TABLE Airline_sample_table
MODIFY COLUMN hor_dep TIME,
MODIFY COLUMN hor_arri TIME,
MODIFY COLUMN hor_dep_retour TIME,
MODIFY COLUMN hor_retour TIME;

-- Add flight duration and compute it in minutes
ALTER TABLE Airline_sample_table
ADD COLUMN flight_duration_departure INT,
ADD COLUMN flight_duration_return INT;

-- Compute flight duration for departure and return in a single step
UPDATE Airline_sample_table
SET flight_duration_departure = ABS(ROUND(TIMEDIFF('minute', hor_dep, hor_arri))),
    flight_duration_return = ABS(ROUND(TIMEDIFF('minute', hor_dep_retour, hor_retour)))
WHERE TIMEDIFF('minute', hor_dep, hor_arri) IS NOT NULL
AND TIMEDIFF('minute', hor_dep_retour, hor_retour) IS NOT NULL;

-- Remove entries with very short flights (both for departure and return)
DELETE FROM Airline_sample_table
WHERE flight_duration_departure < 15 OR flight_duration_return < 15;

-- Modify date columns with correct types
ALTER TABLE Airline_sample_table
MODIFY COLUMN date_de_depart DATE,
MODIFY COLUMN date_de_retour DATE;

-- Add day types (weekend/weekday) and seasons in one query
ALTER TABLE Airline_sample_table
ADD COLUMN departure_day_type STRING,
ADD COLUMN arrival_day_type STRING,
ADD COLUMN Season STRING;

UPDATE Airline_sample_table
SET departure_day_type = CASE
        WHEN DAYOFWEEK(date_de_depart) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END,
    arrival_day_type = CASE
        WHEN DAYOFWEEK(date_de_retour) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END,
    Season = CASE
        WHEN MONTH(date_de_depart) IN (12, 1, 2) THEN 'Winter'
        WHEN MONTH(date_de_depart) IN (3, 4, 5) THEN 'Spring'
        WHEN MONTH(date_de_depart) IN (6, 7, 8) THEN 'Summer'
        ELSE 'Autumn'
    END;

-- Add price category and flight route in one statement
ALTER TABLE Airline_sample_table
ADD COLUMN price_category STRING,
ADD COLUMN flight_route STRING;

UPDATE Airline_sample_table
SET price_category = CASE 
        WHEN PRICE < 200 THEN 'Budget'
        WHEN PRICE BETWEEN 200 AND 500 THEN 'Standard'
        ELSE 'Premium'
    END,
    flight_route = CONCAT(CITY_DEPARTURE, ' - ', CITY_ARRIVAL);

-- Final selection with all transformations applied
SELECT *,
    TIMEDIFF('hour', hor_dep, hor_arri) AS flight_duration_hours,
    TIMEDIFF('hour', hor_dep_retour, hor_retour) AS flight_duration_return
FROM Airline_sample_table;
