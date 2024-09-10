
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)

file_path = "C:\\Users\\DELL_G3\\Desktop\\Diabetes\\APP\\APP\\diabetes.csv"
diabetes_data = pd.read_csv(file_path)
X = diabetes_data.drop(columns='Outcome', axis=1)
Y = diabetes_data['Outcome']
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)
model = LogisticRegression(max_iter=1000)  # Increase the number of iterations
model.fit(X_train, Y_train)

@app.route('/api/predict', methods=['POST'])
def predict_diabetes():
    req_data = request.json
    pregnancies = req_data['pregnancies']
    glucose = req_data['glucose']
    blood_pressure = req_data['bloodPressure']
    skin_thickness = req_data['skinThickness']
    insulin = req_data['insulin']
    bmi = req_data['bmi']
    diabetes_pedigree_function = req_data['diabetesPedigreeFunction']
    age = req_data['age']
    
    user_data = pd.DataFrame({
        'Pregnancies': [pregnancies],
        'Glucose': [glucose],
        'BloodPressure': [blood_pressure],
        'SkinThickness': [skin_thickness],
        'Insulin': [insulin],
        'BMI': [bmi],
        'DiabetesPedigreeFunction': [diabetes_pedigree_function],
        'Age': [age]
    })
    
    prediction_result = model.predict(user_data)
    
    # Convert int64 prediction_result to Python integer
    #prediction_result = int(prediction_result)
    
# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data={

#         "prediction_result":"hiii"
#     }
    
    #return jsonify(prediction_result)

    #return jsonify(model.predict(user_data))

    return jsonify(prediction_result.tolist())
   

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


