import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-100 to-accent-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif text-gray-900">
              Engineer Your <span className="text-primary-600">Perfect Vibe</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Systematically analyze, deconstruct, and recreate aesthetic experiences with our powerful vibe engineering toolkit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/vibes"
                className="btn-primary"
              >
                Explore Vibes
              </Link>
              <Link
                to="/create-vibe"
                className="btn-secondary"
              >
                Create Your Own
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 md:opacity-40 pointer-events-none">
          {/* Abstract wave pattern SVG as background decoration */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4a9fd8" d="M42.5,-70.3C55.4,-63.6,66.6,-52.8,74.8,-39.4C82.9,-25.9,88.1,-9.9,85.9,4.9C83.7,19.8,74.2,33.4,63.6,45.1C53,56.8,41.3,66.5,27.7,71.7C14,76.9,-1.6,77.7,-14.9,72.8C-28.2,67.9,-39.3,57.3,-50.1,46.2C-60.9,35.1,-71.5,23.5,-75.2,9.8C-78.9,-3.9,-75.7,-19.7,-67.7,-31.9C-59.7,-44.1,-46.8,-52.8,-33.9,-59.4C-21,-66.1,-8.1,-70.7,4.7,-78.7C17.4,-86.6,29.7,-77,42.5,-70.3Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Vibe Engineering Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Vibe Analysis</h3>
              <p className="text-gray-600">
                Break down any vibe into its core components with our systematic analysis framework. Understand the elements that create specific aesthetic experiences.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Vibe Visualization</h3>
              <p className="text-gray-600">
                See vibes come to life with interactive visual representations. Compare different vibes and understand their subtle distinctions.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-primary-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Vibe Implementation</h3>
              <p className="text-gray-600">
                Apply vibes across different domains with practical implementation guides. Create consistent experiences in physical spaces, digital media, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Capture the Vibe</h3>
                  <p className="text-gray-600">
                    Document your target vibe through multiple modalities - photos, descriptions, references, or examples.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Analyze Components</h3>
                  <p className="text-gray-600">
                    Break down the vibe into its core dimensions - sensory elements, emotional resonance, cultural context, and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Map Relationships</h3>
                  <p className="text-gray-600">
                    Create a visual map showing how different elements interact and reinforce each other.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Implement Strategy</h3>
                  <p className="text-gray-600">
                    Develop practical strategies to recreate the vibe in your chosen domain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Engineer Your Vibe?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of vibe engineers and start creating intentional aesthetic experiences.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-white text-primary-600 font-bold rounded-md hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;