import React from "react";

const RegisterWorker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
      <form className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <h2 className="text-3xl font-bold col-span-2 text-center text-indigo-700">
          Register as Worker
        </h2>

        <input type="text" placeholder="Full Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="tel" placeholder="Phone Number" className="input" />
        <input type="date" placeholder="Date of Birth" className="input" />

        <select className="input">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="text" placeholder="Address" className="input" />
        <input type="text" placeholder="City" className="input" />
        <input type="text" placeholder="State" className="input" />
        <input type="text" placeholder="Pincode" className="input" />

        <select className="input">
          <option value="">Select Service Category</option>
          <option>Plumber</option>
          <option>Electrician</option>
          <option>Mechanic</option>
          <option>Painter</option>
          <option>Cleaner</option>
          <option>Carpenter</option>
        </select>

        <input
          type="number"
          placeholder="Years of Experience"
          className="input"
        />

        <div className="col-span-2">
          <label className="block mb-1 text-sm text-gray-600">
            Upload ID Proof
          </label>
          <input type="file" className="w-full border rounded-lg p-2" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 text-sm text-gray-600">
            Upload Profile Picture
          </label>
          <input type="file" className="w-full border rounded-lg p-2" />
        </div>

        <input type="password" placeholder="Password" className="input" />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
        />

        <label className="col-span-2 flex items-center text-sm">
          <input type="checkbox" className="mr-2" /> I agree to the Terms &
          Conditions
        </label>

        <button
          type="button"
          className="col-span-2 bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default RegisterWorker;
