import requests
import kafka
import json
import time
import pandas as pd
import os
from dotenv import load_dotenv
load_dotenv()
url = 'http://127.0.0.1:5000/data?rows=1400'  

response = requests.get(url)

if response.status_code == 200:
    data = response.json()

    # Display the received data (limited to 10000 rows)
    for i, item in enumerate(data):
        print(f"Row {i + 1}: {item}")
else:
    print('Error:', response.status_code)

# Define Kafka broker address and topic name
KAFKA_BROKER = os.getenv("KAFKA_HOST") + ':' + '9092'
KAFKA_TOPIC = 'port-data'

# Create a KafkaProducer instance
producer = kafka.KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    key_serializer=lambda k: k.encode('utf-8'), 
    value_serializer=lambda v: json.dumps(v).encode('utf-8')  
)
data_for_dataframe = []

def send_data_to_kafka():
    for index, message in enumerate(data):
        key = f"record_{index}"  
        print(f"Sending: Key={key}, Value={message}")
        producer.send(KAFKA_TOPIC, key=key, value=message)
        
        # Add the message to the list for DataFrame
        data_for_dataframe.append(message)

if __name__ == "__main__":
    try:
        send_data_to_kafka()
    except KeyboardInterrupt:
        print("Producer interrupted.")
    finally:
        producer.close()

# Convert the accumulated data into a pandas DataFrame
df = pd.DataFrame(data_for_dataframe)
print("DataFrame created successfully.")
print(df)