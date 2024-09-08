import json
import pandas as pd
from kafka import KafkaConsumer
import boto3
from io import StringIO
import os
from dotenv import load_dotenv
from configs import config



def load_config():
    load_dotenv()
    
    return config


def create_s3_client(aws_access_key_id, aws_secret_access_key):
    return boto3.client('s3', 
                        aws_access_key_id=aws_access_key_id, 
                        aws_secret_access_key=aws_secret_access_key)


def consume_messages(consumer, s3_client, bucket_name, s3_prefix, batch_size=10):
    # Initialize an empty list to store the consumed data and CSV buffer
    consumed_data = []
    csv_buffer = StringIO()
    s3_key = s3_prefix + 'Airline_sample_data.csv'

    try:
        for message in consumer:
            consumed_value = message.value  
            print("Consumed:", consumed_value)
            consumed_data.append(consumed_value)

            # Upload batch of messages to S3
            if len(consumed_data) >= batch_size:
                df = pd.DataFrame(consumed_data)
                df.to_csv(csv_buffer, index=False)

                # Upload the CSV file to S3
                s3_client.put_object(
                    Bucket=bucket_name,
                    Key=s3_key,
                    Body=csv_buffer.getvalue()
                )

                # Reset the CSV buffer and consumed data for the next batch
                csv_buffer.seek(0)
                csv_buffer.truncate(0)
                consumed_data.clear()

    except KeyboardInterrupt:
        print("Script terminated by user.")
    except Exception as e:
        print(f"Error during processing: {e}")
    finally:
        consumer.close()


if __name__ == "__main__":
    # Load configuration
    config = load_config()

    # Create S3 client
    s3_client = create_s3_client(config['AWS_ACCESS_KEY_ID'], config['AWS_SECRET_ACCESS_KEY'])

    # Create KafkaConsumer instance
    consumer = KafkaConsumer(
        config['KAFKA_TOPIC'],
        bootstrap_servers=config['KAFKA_BROKER'],
        value_deserializer=lambda v: json.loads(v.decode('utf-8'))
    )

    # Consume messages and upload in batches
    consume_messages(consumer, s3_client, config['AWS_BUCKET_NAME'], config['S3_PREFIX'])
