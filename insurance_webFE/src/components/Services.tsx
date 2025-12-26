'use client';

import React from 'react';
import { Shield, Home, CreditCard, PiggyBank } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Life Insurance",
      description: "Comprehensive life insurance policies to protect your loved ones and ensure their financial security for the future.",
      features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance", "Group Life Insurance"]
    },
    {
      icon: Home,
      title: "Mortgage Protection",
      description: "Specialized insurance to protect your home and ensure your mortgage is covered if the unexpected happens.",
      features: ["Mortgage Life Insurance", "Disability Coverage", "Critical Illness Protection", "Family Income Benefit"]
    },
    {
      icon: CreditCard,
      title: "Debt Free Life",
      description: "Strategic planning to eliminate debt and achieve financial freedom while protecting your family's future.",
      features: ["Debt Consolidation Planning", "Credit Protection Insurance", "Financial Planning", "Emergency Fund Strategy"]
    },
    {
      icon: PiggyBank,
      title: "Smart Banking",
      description: "Intelligent banking solutions and financial products to maximize your savings and investment potential.",
      features: ["High-Yield Savings", "Investment Planning", "Retirement Accounts", "Tax-Advantaged Products"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial protection and planning services designed to secure your family&apos;s future and help you achieve your financial goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-amber-700 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your insurance needs and find the perfect coverage for your family.
            </p>
            <button className="bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

