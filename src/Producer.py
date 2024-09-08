import requests
import kafka
import json
import time
import pandas as pd
import os
from dotenv import load_dotenv
from configs.config import config_kafka



def load_config():
    """Load environment variables and define configurations."""
    load_dotenv()

    return config_kafka


def fetch_data(url):
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Successfully fetched {len(data)} rows of data.")
        return data
    else:
        print(f"Error fetching data: {response.status_code}")
        return None


def create_kafka_producer(kafka_broker):
    return kafka.KafkaProducer(
        bootstrap_servers=kafka_broker,
        key_serializer=lambda k: k.encode('utf-8'),
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )


def send_data_to_kafka(data, producer, kafka_topic):
    data_for_dataframe = []
    
    for index, message in enumerate(data):
        key = f"record_{index}"
        print(f"Sending: Key={key}, Value={message}")
        producer.send(kafka_topic, key=key, value=message)
        data_for_dataframe.append(message)
    
    return data_for_dataframe


if __name__ == "__main__":
    config = load_config()
    
    data = fetch_data(config['FLASK_URL'])
    
    if data:
        producer = create_kafka_producer(config['KAFKA_BROKER'])
        
        try:
            data_for_dataframe = send_data_to_kafka(data, producer, config['KAFKA_TOPIC'])
            
        except KeyboardInterrupt:
            print("Producer interrupted by user.")
        finally:
            producer.close()
            print("Producer closed.")
        
        df = pd.DataFrame(data_for_dataframe)
        print("DataFrame created successfully.")
        print(df)
    else:
        print("No data to process.")