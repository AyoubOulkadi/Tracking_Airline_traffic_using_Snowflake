# Tracking_Airline_traffic_using_Snowflake
<h2>Overview</h2>

This project revolves around building a data pipeline that efficiently processes, stores, transforms, and visualizes data. It utilizes a Flask-based API for data retrieval and a combination of AWS S3, Snowflake, and Power BI for data storage, transformation, and visualization.

<h2>Project architecture </h2>
<a target="_blank" href="https://imageupload.io/WYD79mdWD4ApDhz"><img  src="https://imageupload.io/ib/Ke6Ji9oMGxJdZsC_1697310755.png" alt="Data Architecture for Airline project .png"/></a>
<h2> 1. Flask API </h2>
A Flask API is developed to handle HTTP requests.
This API exposes endpoints for data retrieval and processing.

<a target="_blank" href="https://imageupload.io/QZ47yHndhlI5VbN"><img  src="https://imageupload.io/ib/oEEdqIEkobwnYW5_1693914656.jpg" alt="API creation.JPG"/></a>

<h2> 2. Data Retrieval with the producer script  </h2>
We retrieve the data from the API created by a producer script

<a target="_blank" href="https://imageupload.io/WvHB7taASETCwSM"><img  src="https://imageupload.io/ib/T0Xs51DzB1Np0U5_1693914900.jpg" alt="output producer.JPG"/></a>


<h4> Store the data after being consumed to S3 Bucket </h4>
After consuming the data from the producer, we should store it a bucket in AWS S3 supposed to be a data lake of our project 

<a target="_blank" href="https://imageupload.io/22oDDqZ37M8VTjt"><img  src="https://imageupload.io/ib/f5eyc5yiugK5NKc_1693915292.jpg" alt="consumer.JPG"/></a>5. 

and this is the output of our consumer script : 
<a target="_blank" href="https://imageupload.io/8PW3PMXHtWGcLTA"><img  src="https://imageupload.io/ib/tGLihuc9PBnUfim_1693915391.jpg" alt="output consumer.JPG"/></a>

<h5>Then we see the the data is stored in our S3 bucket </h5>

<a target="_blank" href="https://imageupload.io/hDP0X2ZeAYYQV1S"><img  src="https://imageupload.io/ib/BXNRs1PjgWN4C5j_1693915452.jpg" alt="data stored in AWS.JPG"/></a>

<h5> Snowflake Data Transformations </h5>
Data is ingested into Snowflake, a cloud-based data warehousing platform.
Snowflake is employed for advanced data transformations, SQL queries, and data analytics.
First, we create the storage integration 

<a target="_blank" href="https://imageupload.io/SJON0cSkGNizTxT"><img  src="https://imageupload.io/ib/fhH3XVZIMIQtzjU_1693915500.jpg" alt="Creation Storage integration.JPG"/></a>
Then, we can see the description of our external storage creation 

<a target="_blank" href="https://imageupload.io/wx9YYkGbIzrc9VR"><img  src="https://imageupload.io/ib/MsNXIsGaat1xTNT_1693915860.jpg" alt="2nd command of description.JPG"/></a>

<h5>Then, we create a csv file format</h5> 
<a target="_blank" href="https://imageupload.io/lnV2Qt3s3akR5xo"><img  src="https://imageupload.io/ib/1Ix01aRJuJDOf8B_1693915551.png" alt="create of csv file_format.png"/></a>

<h5>Then we create our table : </h5> 
<a target="_blank" href="https://imageupload.io/ttg5fYiAILEfJMh"><img  src="https://imageupload.io/ib/o7AQ0qDYYYUiTxM_1693915598.png" alt="Airline_sample_table creation .png"/></a>
After this, we will retrieve our data 


<a target="_blank" href="https://imageupload.io/AQegCYfLE33ZZXq"><img  src="https://imageupload.io/ib/Gg5nCRlwi1O9lSF_1693915634.png" alt="Sample of our data.png"/></a>

<h5>6. Export to Power BI</h5>

The transformed data is exported from Snowflake and integrated with Power BI.
We can see that the connection between PowerBI and Snwoflake had been done successfully 

<a target="_blank" href="https://imageupload.io/LK4skyIq9l20TbV"><img  src="https://imageupload.io/ib/W2FlOQuMIrcFv4Z_1693915940.jpg" alt="connection avec POWERBI aprs DA.JPG"/></a>
<h3> We will visualize our data in PowerBi Dashboard </h3>
<a target="_blank" href="https://imageupload.io/XL8fn3ty6PNyp2C"><img  src="https://imageupload.io/ib/368SqRZ4DeBSbid_1695474531.jpg" alt="Data.JPG"/></a>

<h3> Finally here is a picture of our web UI  </h3>
<a target="_blank" href="https://imageupload.io/wMpY7KYIqHvJfnv"><img  src="https://imageupload.io/ib/Sdqk6Lj2koh74cz_1695662966.jpeg" alt="WhatsApp Image 2023-09-25 at 18.27.44.jpeg"/</a>

