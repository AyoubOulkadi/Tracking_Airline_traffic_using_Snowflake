from flask import Flask, jsonify, request
import snowflake.connector

# Snowflake connection parameters
snowflake_config = {
    'account': 'rsrnnfw-hr03420',
    'warehouse': 'COMPUTE_WH',
    'database': 'AIRLINE',
    'schema': 'AIRLINE_SCHEMA',
    'role': 'ACCOUNTADMIN',
    'user': 'mehdibahou',
    'password': 'Ma123456789@A'
}

# Initialize Flask app
app = Flask(__name__)

# Define a route to fetch data from Snowflake with filtering options
@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        # Establish a connection to Snowflake
        connection = snowflake.connector.connect(**snowflake_config)

        # Create a cursor object to execute SQL queries
        cursor = connection.cursor()

        # Build the SQL query based on client preferences
        query = "SELECT * FROM Airline_sample_table WHERE 1=1"

        aller_type = request.args.get('aller_type')
        if aller_type:
            query += f" AND ALLER_TYPE = '{aller_type}'"

        return_type = request.args.get('return_type')
        if return_type:
            query += f" AND RETURN_TYPE = '{return_type}'"

        min_price = request.args.get('min_price')
        if min_price:
            query += f" AND PRICE >= {min_price}"

        max_price = request.args.get('max_price')
        if max_price:
            query += f" AND PRICE <= {max_price}"

        season = request.args.get('season')
        if season:
            query += f" AND SEASON = '{season}'"

        # You can add more filter conditions as needed based on client preferences

        # Execute the final SQL query
        cursor.execute(query)

        # Fetch the results
        results = cursor.fetchall()
    
        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to a list of dictionaries for JSON serialization
        L = []
        
        for row in results:
            L.append({
                "AIRLINE_ALLER": str(row[0]),
                "AIRLINE_RETOUR": str(row[1]),
                "ALLER_TYPE": str(row[2]),
                "ARRIVAL_DAY_TYPE": str(row[3]),
                "CITY_ARRIVAL": str(row[4]),
                "CITY_DEPARTURE": str(row[5]),
                "DATE_DE_DEPART": str(row[6]),  # Date is already a strin)g
                "DATE_DE_RETOUR": str(row[7]),  # Date is already a strin)g
                "DEPARTURE_DAY_TYPE": str(row[8]),
                "FLIGHT_DURATION_DEPARTURE": str(row[9]),
                "FLIGHT_DURATION_RETURN": str(row[10]),
                "FLIGHT_ROUTE": str(row[11]),
                "HOR_ARRI": str(row[12]),  # Time is already a strin)g
                "HOR_DEP": str(row[13]),   # Time is already a strin)g
                "HOR_DEP_RETOUR": str(row[14]),  # Time is already a strin)g
                "HOR_RETOUR": str(row[15]),      # Time is already a strin)g
                "PRICE": str(row[16]),
                "PRICE_CATEGORY": str(row[17]),
                "RETURN_TYPE": str(row[18]),
                "SEASON": str(row[19])
            })

        return jsonify(L), 200

    except Exception as e:
        print("Error:", str(e))  # Print the error message
        import traceback
        traceback.print_exc()  # Print the traceback for more details
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
