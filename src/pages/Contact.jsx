import React, { useState } from 'react'

function Contact() {

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [submitted, setSubmitted] = useState(false);


   const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showToast("Please fill all fields");
      return;
    }


    setSubmitted(true);

    setForm(
      {
        name: "",
        email: "",
        message: "",
      }
    )
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Help & Support</h1>
      <p className="text-gray-600 mb-6">
        Need help? Check FAQs or contact us below.
      </p>


      <div className="mb-8 space-y-3">
        <details className="p-4 bg-blue-200 rounded-2xl">
          <summary className="cursor-pointer font-medium">
            How does the weather app work?
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            It fetches real-time weather data using API based on your location or search city.
          </p>
        </details>

        <details className="p-4 bg-blue-200 rounded-2xl">
          <summary className="cursor-pointer font-medium">
            Why location is not working?
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            Please allow location permission in your browser settings.
          </p>
        </details>

        <details className="p-4 bg-blue-200 rounded-2xl">
          <summary className="cursor-pointer font-medium">
            Can I use this app offline?
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            Only basic UI works offline. Weather data requires internet.
          </p>
        </details>
      </div>



      <div className="bg-white shadow-md rounded-xl p-6 border hidden">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 font-medium">
            Message sent successfully ✔
          </p>
        )}
      </div>

    </div>
  )
}

export default Contact
