/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Register.jsx
'use client'
import React from 'react';
import Link from 'next/link';
import RegisterForm from '@/app/Components/Auth/RegisterForm';

export default function Register() {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}