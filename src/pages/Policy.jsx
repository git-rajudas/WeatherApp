import React from 'react'
import { Link } from 'react-router-dom'

function Policy() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-gray-600 mb-4">
        Last updated: May 2026
      </p>

      <p className="mb-4 text-gray-700">
        This Privacy Policy explains how we collect, use, and protect your information
        when you use our Weather App.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-gray-700 mb-4">
        We may collect basic information such as location (if you allow it), search queries,
        and device information to improve app performance.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="text-gray-700 mb-4">
        We use your data to provide accurate weather results, improve user experience,
        and fix app issues.
      </p>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Location Access</h2>
      <p className="text-gray-700 mb-4">
        Location is optional. We only use it to show weather in your current area.
        You can disable location anytime in your browser settings.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Storage</h2>
      <p className="text-gray-700 mb-4">
        We do not sell your data. Some preferences may be stored locally in your browser
        (localStorage) for better experience.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="text-gray-700 mb-4">
        We may use third-party APIs (like weather providers) to fetch data.
        These services may have their own privacy policies.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Security</h2>
      <p className="text-gray-700 mb-4">
        We take reasonable measures to protect your data, but no system is 100% secure.
      </p>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. Updates will be posted on this page.
      </p>

      {/* Contact */}
      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p className="text-gray-700">
        If you have questions about this Privacy Policy, contact us at:
      </p>

      <p className="mt-2 text-white">
        work.rajudas@gamil.com
      </p>
      <Link to={"/"} className="mt-2 text-blue-400">
        Home
      </Link>

    </div>
  )
}

export default Policy
