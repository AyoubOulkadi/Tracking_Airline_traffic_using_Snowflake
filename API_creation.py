from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load CSV data into memory
csv_data = pd.read_csv('/home/ayoub/Airline_project/ARILINE_DATA.csv')

@app.route('/data', methods=['GET'])
def get_data():
    rows = int(request.args.get('rows', len(csv_data)))
    selected_features = request.args.get('features', None)

    filtered_data = csv_data.head(rows)
    if selected_features:
        selected_columns = selected_features.split(',')
        filtered_data = filtered_data[selected_columns]

    return jsonify(filtered_data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)