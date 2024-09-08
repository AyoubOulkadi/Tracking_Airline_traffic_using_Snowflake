import os

config = {
        'KAFKA_BROKER': os.getenv("KAFKA_HOST") + ':9092',
        'KAFKA_TOPIC': 'port-data',
        'AWS_ACCESS_KEY_ID': os.getenv('ACCESS_KEY_ID'),
        'AWS_SECRET_ACCESS_KEY': os.getenv('SECRET_ACCESS_KEY'),
        'AWS_BUCKET_NAME': 'airline2023',
        'S3_PREFIX': 'load/',
    }

    
config_kafka = {
        'FLASK_HOST': os.getenv("FLASK_SERVER_HOST"),
        'KAFKA_BROKER': os.getenv("KAFKA_HOST") + ':9092',
        'KAFKA_TOPIC': 'port-data',
        'FLASK_URL': f"http://{os.getenv('FLASK_SERVER_HOST')}:5000/data"
    }