const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              SIL<span className="text-gray-400">ENT</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your dream house is our top priority. We make process efficient to
              house hunting.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs">in</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Home Buying Process</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Buyer consultation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Property hunting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Financing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Closing
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Awards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Offices
                </a>
              </li>
            </ul>
          </div>

          {/* Featured */}
          <div>
            <h3 className="font-semibold mb-4">Featured</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Copyright © 2024 SilentCo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
