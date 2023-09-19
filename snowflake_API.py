from flask import Flask, jsonify, request
import snowflake.connector
from flask_cors import CORS
snowflake_config = {
    'account': 'rsrnnfw-hr03420',
    'warehouse': 'COMPUTE_WH',
    'database': 'AIRLINE',
    'schema': 'AIRLINE_SCHEMA',
    'role': 'ACCOUNTADMIN',
    'user': 'mehdibahou',
    'password': 'Ma123456789@A'
}

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/get_total_pages', methods=['GET'])
def get_total_pages():
    try:
        # Establish a connection to Snowflake
        connection = snowflake.connector.connect(**snowflake_config)

        # Create a cursor object to execute SQL queries
        cursor = connection.cursor()

        # Build the SQL query to count the total number of pages
        query = "SELECT COUNT(*) FROM Airline_sample_table WHERE 1=1"

        aller_type = request.args.get('aller_type')
        
        if aller_type:
            query += f" AND AIRLINE_ALLER = '{aller_type}'"

        return_type = request.args.get('return_type')
        if return_type:
            query += f" AND AIRLINE_RETOUR = '{return_type}'"

        min_price = request.args.get('min_price')
        if min_price:
            query += f" AND PRICE >= {min_price}"

        max_price = request.args.get('max_price')
        if max_price:
            query += f" AND PRICE <= {max_price}"

        season = request.args.get('season')
        if season:
            query += f" AND SEASON = '{season}'"

        cursor.execute(query)
        total_records = cursor.fetchone()[0]
        total_pages = (total_records + 9) // 10  # Assuming 10 records per page

        cursor.close()
        connection.close()

        return jsonify({'total_pages': total_pages}), 200

    except Exception as e:
        print("Error:", str(e))  # Print the error message
        import traceback
        traceback.print_exc()  # Print the traceback for more details
        return jsonify({'error': str(e)}), 500

@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        connection = snowflake.connector.connect(**snowflake_config)
        cursor = connection.cursor()
        query = "SELECT * FROM Airline_sample_table WHERE 1=1"

        aller_type = request.args.get('aller_type')
        if aller_type:
            query += f" AND AIRLINE_ALLER = '{aller_type}'"

        return_type = request.args.get('return_type')
        if return_type:
            query += f" AND AIRLINE_RETOUR = '{return_type}'"

        min_price = request.args.get('min_price')
        if min_price:
            query += f" AND PRICE >= {min_price}"

        max_price = request.args.get('max_price')
        if max_price:
            query += f" AND PRICE <= {max_price}"

        season = request.args.get('season')
        if season:
            query += f" AND SEASON = '{season}'"

        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)
        offset = (page - 1) * per_page
        query += f" OFFSET {offset} ROWS FETCH NEXT {per_page} ROWS ONLY"
        print(query)
        cursor.execute(query)

        results = cursor.fetchall()

        cursor.close()
        connection.close()

        L = []

        for row in results:
            row_dict = {
                "AIRLINE_ALLER": str(row[0]),
                "AIRLINE_RETOUR": str(row[1]),
                "HOR_DEP": str(row[2]),
                "HOR_ARRI": str(row[3]),
                "PRICE": str(row[4]),
                "ALLER_TYPE": str(row[5]),
                "RETURN_TYPE": str(row[6]),  
                "DATE_DE_DEPART": str(row[7]),  
                "DATE_DE_RETOUR": str(row[8]),
                "CITY_DEPARTURE": str(row[9]),
                "CITY_ARRIVAL": str(row[10]),
                "HOR_DEP_RETOUR": str(row[11]),
                "HOR_RETOUR": str(row[12]),  
                "FLIGHT_DURATION_DEPARTURE": str(row[13]),   
                "FLIGHT_DURATION_RETURN": str(row[14]),  
                "SEASON": str(row[15]),      
                "DEPARTURE_DAY_TYPE": str(row[16]),
                "ARRIVAL_DAY_TYPE": str(row[17]),
                "PRICE_CATEGORY": str(row[18]),
                "FLIGHT_ROUTE": str(row[19])
            }
            L.append(row_dict)

        return jsonify(L), 200

    except Exception as e:
        print("Error:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
