/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterFormData } from '@/app/Types/registePageTypes';

export default function RegisterForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegisterFormData>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      category: '',
      mobile: '',
      education: '',
      description: '',
      interests: '',
      departMent: '',
      profilePic: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e: any) => {
      setFormData((prev: any) => ({
        ...prev,
        profilePic: e.target.files[0],
      }));
    };
  
    const nextStep = () => {
      if (currentStep === 1) {
        // Validate first step
        if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
          setError('Please fill all required fields correctly.');
          return;
        }
      }
      setCurrentStep((prev) => prev + 1);
      setError('');
    };
  
    const prevStep = () => {
      setCurrentStep((prev) => prev - 1);
      setError('');
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      // Convert interests string to array
      const interestsArray = formData.interests.split(',').map((interest: string) => interest.trim());
      
      // Create form data for file upload
      const registerData: any = new FormData();
      for (const key in formData) {
        if (key === 'interests') {
          interestsArray.forEach((interest: string) => {
            registerData.append('interests[]', interest);
          });
        } else if (key === 'profilePic') {
          if (formData.profilePic) {
            registerData.append('profilePic', formData.profilePic);
          }
        } else if (key !== 'confirmPassword') {
          registerData.append(key, formData[key]);
        }
      }
      
      try {
        // Replace with your actual register API call
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          body: registerData,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
        
        // Redirect to login page on successful registration
        router.push('/login');
      } catch (err: any) {
        setError(err.message || 'Something went wrong during registration');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center">
          <div className={`flex-1 border-t-2 ${currentStep >= 1 ? 'border-indigo-500' : 'border-gray-300'}`}></div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentStep >= 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500'
          } mx-2`}>1</div>
          <div className={`flex-1 border-t-2 ${currentStep >= 2 ? 'border-indigo-500' : 'border-gray-300'}`}></div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentStep >= 2 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500'
          } mx-2`}>2</div>
          <div className="flex-1 border-t-2 border-gray-300"></div>
        </div>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="teacher">Teacher</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="education"
                  name="education"
                  type="text"
                  required
                  value={formData.education}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="departMent" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1">
                <input
                  id="departMent"
                  name="departMent"
                  type="text"
                  value={formData.departMent}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                Interests (comma separated)
              </label>
              <div className="mt-1">
                <input
                  id="interests"
                  name="interests"
                  type="text"
                  placeholder="e.g. coding, music, reading"
                  value={formData.interests}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1">
                <input
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  </div>
  );
}
