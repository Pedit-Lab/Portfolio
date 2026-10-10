import { Check } from 'lucide-react';

// Me data tika oyata oni widiyata wenas karaganna
export const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 150,
    features: ['1 Landing Page', 'Basic SEO', 'Mobile Responsive', '3 Days Delivery'],
  },
  {
    id: 'standard',
    name: 'Standard Package',
    price: 300,
    features: ['3 Pages', 'Advanced SEO', 'Contact Form', 'Mobile Responsive', '5 Days Delivery'],
    isPopular: true, // Meka highlight wenawa
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 500,
    features: ['Up to 5 Pages', 'E-commerce Setup', 'Advanced SEO', 'Payment Gateway', 'Priority Support'],
  }
];

export const Pricing = ({ onSelectPackage }: { onSelectPackage: (pkg: any) => void }) => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Package</h2>
          <p className="text-gray-600">Select the best plan for your project and customize it with add-ons.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col relative ${
                pkg.isPopular ? 'border-2 border-blue-600 transform md:-translate-y-4' : 'border border-gray-200'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              )}
              
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${pkg.price}</span>
              </div>
              
              <ul className="mb-8 flex-1 space-y-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="text-green-500 mr-2" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectPackage(pkg)}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  pkg.isPopular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Select {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};