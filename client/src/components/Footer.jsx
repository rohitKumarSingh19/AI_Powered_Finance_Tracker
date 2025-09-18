export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8 p-6 text-center md:text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Finance Tracker</h3>
          <p className="text-gray-500 text-sm">
            Track your income, expenses, and savings with AI-powered insights.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-gray-700">About</a></li>
            <li><a href="#" className="hover:text-gray-700">Contact</a></li>
            <li><a href="#" className="hover:text-gray-700">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-3">
            <a href="#" className="text-gray-500 hover:text-gray-700">🐦 Twitter</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">💼 LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">📷 Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-400 text-xs mt-6 border-t pt-4">
        © {new Date().getFullYear()} Finance Tracker. Built with ❤️ by Rohit.
      </div>
    </footer>
  );
}
