# Tracking_Airline_traffic_using_Snowflake
<h2>Overview</h2>

This project revolves around building a data pipeline that efficiently processes, stores, transforms, and visualizes data. It utilizes a Flask-based API for data retrieval and a combination of AWS S3, Snowflake, and Power BI for data storage, transformation, and visualization.

<h2> 1. Flask API </h2>
A Flask API is developed to handle HTTP requests.
This API exposes endpoints for data retrieval and processing.
<a target="_blank" href="https://imageupload.io/TYnz3P02PH02dNM"><img  src="https://imageupload.io/ib/V4BTZYTeQXBxMzq_1693914259.jpg" alt="output producer.JPG"/></a>

<h2> 2. Data Retrieval </h2>
The Flask API retrieves data from various sources through HTTP requests.
These sources may include web services, databases, or external data providers.

3. Data Processing
Data obtained from external sources is processed within the Flask API.
Processing may encompass data cleaning, aggregation, or any necessary transformations.
4. AWS S3 Data Storage
Processed data is securely stored in AWS S3, a versatile and reliable cloud storage service.
AWS S3 buckets are used for organized and secure data storage.
5. Snowflake Data Transformations
Data is ingested into Snowflake, a cloud-based data warehousing platform.
Snowflake is employed for advanced data transformations, SQL queries, and data analytics.
6. Export to Power BI
The transformed data is exported from Snowflake and integrated with Power BI.
Power BI is employed for data visualization, report generation, and interactive dashboard creation.
