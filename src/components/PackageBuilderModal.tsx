import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, CheckCircle } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  price: number;
}

const AVAILABLE_ADDONS: Addon[] = [
  { id: 'seo', name: 'SEO Setup & Optimization', price: 100 },
  { id: 'fast', name: 'Extra Fast Delivery (3 Days)', price: 150 },
  { id: 'source', name: 'Source Code Files', price: 50 },
];

export const PackageBuilderModal = ({ 
  isOpen, 
  onClose, 
  selectedPackage 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedPackage: { name: string; price: number }; 
}) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Calculate Total Price
  const totalPrice = selectedPackage.price + selectedAddons.reduce((total, addonId) => {
    const addon = AVAILABLE_ADDONS.find(a => a.id === addonId);
    return total + (addon ? addon.price : 0);
  }, 0);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activeAddonsList = selectedAddons
      .map(id => AVAILABLE_ADDONS.find(a => a.id === id))
      .map(a => `- ${a?.name} (+$${a?.price})`)
      .join('\n');

    // 1. Send Email via EmailJS
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Step 1 eken gatta Service ID eka danna
        'YOUR_TEMPLATE_ID', // Step 1 eken gatta Template ID eka danna
        {
          user_name: formData.name,
          user_email: formData.email,
          package_name: `${selectedPackage.name} ($${selectedPackage.price})`,
          addons: activeAddonsList || 'No add-ons selected',
          total_price: totalPrice,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY' // Step 1 eken gatta Public Key eka danna
      );
      
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Email sending failed:', error);
      // Email eka fail unath api whatsapp yawanna try karanawa
    }

    // 2. Format & Send via WhatsApp
    const whatsappNumber = "9477XXXXXXX"; // Oyage WhatsApp number eka (country code ekka, + nathiwa)
    
    const whatsappMessage = `*New Order Request!* 🚀\n\n*Client Name:* ${formData.name}\n*Email:* ${formData.email}\n*Package:* ${selectedPackage.name} ($${selectedPackage.price})\n\n*Add-ons:*\n${activeAddonsList || 'None'}\n\n*Total Price:* $${totalPrice}\n\n*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    setIsSubmitting(false);
    onClose();
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black z-10">
          <X size={24} />
        </button>

        {/* Left Side: Configuration */}
        <div className="w-full md:w-3/5 p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Customize Your Package</h2>
          
          <div className="mb-6 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
            <h3 className="font-bold text-lg">{selectedPackage.name}</h3>
            <p className="text-gray-600">Base Price: ${selectedPackage.price}</p>
          </div>

          <h3 className="font-bold mb-4">Select Add-ons:</h3>
          <div className="space-y-3">
            {AVAILABLE_ADDONS.map(addon => (
              <label key={addon.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => handleAddonToggle(addon.id)}
                />
                <div className="ml-3 flex-1 flex justify-between">
                  <span className="font-medium text-gray-700">{addon.name}</span>
                  <span className="text-gray-900 font-bold">+${addon.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary & Form */}
        <div className="w-full md:w-2/5 p-8 bg-white border-l">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Base Package</span>
            <span className="font-bold">${selectedPackage.price}</span>
          </div>
          
          {selectedAddons.map(id => {
            const addon = AVAILABLE_ADDONS.find(a => a.id === id);
            return addon ? (
              <div key={id} className="flex justify-between mb-2 text-sm text-gray-500">
                <span>+ {addon.name}</span>
                <span>${addon.price}</span>
              </div>
            ) : null;
          })}

          <div className="border-t mt-4 pt-4 flex justify-between items-center mb-8">
            <span className="font-bold text-lg">Total Due</span>
            <span className="font-bold text-2xl text-blue-600">${totalPrice}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" required placeholder="Your Name" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" required placeholder="Your Email" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              required placeholder="Any specific requirements?" rows={3}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
            />
            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 transition flex justify-center items-center gap-2"
            >
              {isSubmitting ? 'Processing...' : (
                <><CheckCircle size={20} /> Request via Email & WhatsApp</>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};