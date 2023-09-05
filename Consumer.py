import json
import pandas as pd
from kafka import KafkaConsumer
import boto3
from io import StringIO

# Define Kafka broker address and topic name
KAFKA_BROKER = 'localhost:9092'
KAFKA_TOPIC = 'port-data'

# AWS S3 credentials and bucket information
AWS_ACCESS_KEY_ID = 'YOUR_ACCESS_KEY_ID'
AWS_SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY'
AWS_BUCKET_NAME = 'airline2023'
S3_PREFIX = 'load/'  # Prefix for S3 object keys

# Create an S3 client
s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

# Create a KafkaConsumer instance
consumer = KafkaConsumer(
    KAFKA_TOPIC,
    bootstrap_servers=KAFKA_BROKER,
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

# Initialize an empty list to store the consumed data
consumed_data = []

# Initialize the CSV buffer outside the loop
csv_buffer = StringIO()

try:
    for message in consumer:
        consumed_value = message.value  
        print("Consumed:", consumed_value)
        consumed_data.append(consumed_value)
        df = pd.DataFrame(consumed_data)
        print(df)

        # Save the DataFrame to a CSV file in-memory
        df.to_csv(csv_buffer, index=False)

        # Upload the CSV file to S3 in the "load" folder
        s3_key = S3_PREFIX + 'Airline_sample_data.csv'  
        s3_client.put_object(
            Bucket=AWS_BUCKET_NAME,
            Key=s3_key,
            Body=csv_buffer.getvalue()
        )

        # Reset the CSV buffer for the next iteration
        csv_buffer.seek(0)
        csv_buffer.truncate(0)

except KeyboardInterrupt:
    print("Script terminated by user.")
finally:
    consumer.close()
