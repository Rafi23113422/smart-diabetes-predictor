import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FullDetailsPredictionForm = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    HighBP: '',
    HighChol: '',
    Smoker: '',
    Stroke: '',
    BMI: '',
    Age: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '' || value === null) {
        newErrors[key] = 'This field is required';
      } else if (
        ['Pregnancies', 'Glucose', 'BloodPressure', 'BMI', 'Age'].includes(key)
      ) {
        if (isNaN(value) || Number(value) < 0) {
          newErrors[key] = 'Enter a valid non-negative number';
        } else if (key === 'Age' && value % 1 !== 0) {
          newErrors[key] = 'Age must be a whole number';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['Pregnancies', 'Glucose', 'BloodPressure', 'BMI', 'Age'];

    if (numericFields.includes(name)) {
      setFormData({ ...formData, [name]: value.replace(/[^\d.]/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/full_details_prediction', {
        data: {
          ...formData,
          Pregnancies: Number(formData.Pregnancies),
          Glucose: Number(formData.Glucose),
          BloodPressure: Number(formData.BloodPressure),
          BMI: Number(formData.BMI),
          Age: Number(formData.Age),
          HighBP: Number(formData.HighBP),
          HighChol: Number(formData.HighChol),
          Smoker: Number(formData.Smoker),
          Stroke: Number(formData.Stroke),
        },
      });

      const result = response.data.prediction === 1
        ? {
            title: 'Diabetes Detected!',
            icon: 'warning',
            text: 'The model predicts a high risk of diabetes.',
            confirmButtonColor: '#d33',
          }
        : {
            title: 'No Diabetes',
            icon: 'success',
            text: 'The model predicts a low risk of diabetes.',
            confirmButtonColor: '#3085d6',
          };

      Swal.fire(result);
    } catch (err) {
      Swal.fire('Error', 'Failed to get prediction. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Full Details Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: 'Pregnancies', name: 'Pregnancies' },
            { label: 'Glucose Level', name: 'Glucose' },
            { label: 'Blood Pressure', name: 'BloodPressure' },
            { label: 'BMI', name: 'BMI' },
            { label: 'Age', name: 'Age' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="label">
                <span className="label-text">{label}</span>
              </label>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="any"
              />
              {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
            </div>
          ))}

          {[
            { label: 'High BP (0 = No, 1 = Yes)', name: 'HighBP' },
            { label: 'High Cholesterol (0 = No, 1 = Yes)', name: 'HighChol' },
            { label: 'Smoker (0 = No, 1 = Yes)', name: 'Smoker' },
            { label: 'Stroke History (0 = No, 1 = Yes)', name: 'Stroke' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="label">
                <span className="label-text">{label}</span>
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Predict Now'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FullDetailsPredictionForm;
