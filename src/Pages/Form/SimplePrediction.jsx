import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SimplePrediction = () => {
  const [formData, setFormData] = useState({
    HighBP: '',
    HighChol: '',
    Smoker: '',
    Stroke: '',
    BMI: '',
    Age: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const { HighBP, HighChol, Smoker, Stroke, BMI, Age } = formData;
    if (
      HighBP === '' ||
      HighChol === '' ||
      Smoker === '' ||
      Stroke === '' ||
      BMI === '' ||
      Age === ''
    ) {
      Swal.fire('Error', 'All fields are required', 'error');
      return false;
    }

    if (isNaN(BMI) || isNaN(Age)) {
      Swal.fire('Error', 'BMI and Age must be numbers', 'error');
      return false;
    }

    if (parseInt(Age) !== parseFloat(Age)) {
      Swal.fire('Error', 'Age must be a whole number', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/simple_details_prediction', {
        data: {
          HighBP: parseInt(formData.HighBP),
          HighChol: parseInt(formData.HighChol),
          Smoker: parseInt(formData.Smoker),
          Stroke: parseInt(formData.Stroke),
          BMI: parseFloat(formData.BMI),
          Age: parseInt(formData.Age)
        }
      }, { timeout: 10000 });

      const result = response.data.prediction;

      Swal.fire({
        icon: result === 1 ? 'error' : 'success',
        title: result === 1 ? 'Diabetes Detected' : 'No Diabetes',
        text: result === 1 ? 'This person is likely diabetic.' : 'This person is likely not diabetic.',
        confirmButtonColor: result === 1 ? '#d33' : '#3085d6'
      });
    } catch (error) {
      Swal.fire('Error', 'Prediction failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-2xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Simple Diabetes Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['HighBP', 'HighChol', 'Smoker', 'Stroke'].map((field) => (
          <div key={field}>
            <label className="label">
              <span className="label-text">{field}</span>
            </label>
            <select
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        ))}

        <div>
          <label className="label">
            <span className="label-text">BMI</span>
          </label>
          <input
            type="number"
            step="0.1"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            step="1"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : 'Predict Now'}
        </button>
      </form>
    </div>
  );
};

export default SimplePrediction;
