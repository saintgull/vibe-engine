import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Vibe Engine</h3>
            <p className="text-gray-300">
              A systematic approach to understanding, analyzing, and engineering vibes across various domains.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vibes" className="text-gray-300 hover:text-white">
                  Explore Vibes
                </Link>
              </li>
              <li>
                <Link to="/create-vibe" className="text-gray-300 hover:text-white">
                  Create Vibe
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions or feedback? Reach out to us.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/saintgull/vibe-engine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white mr-4"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-300 hover:text-white"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vibe Engine. All rights reserved.</p>
          <p className="mt-2">
            Created by Erin Saint Gull
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;