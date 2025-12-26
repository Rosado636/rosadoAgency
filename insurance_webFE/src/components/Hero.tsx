'use client';

import React from 'react';
import { ArrowRight, Shield, Heart, Users } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Protecting Your
                <span className="text-amber-700 block">Future Today</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional life insurance services tailored to your needs. Secure your family&apos;s financial future with comprehensive coverage and expert guidance.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Family-First</h3>
                  <p className="text-sm text-gray-600">Your priorities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Shield className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Trusted</h3>
                  <p className="text-sm text-gray-600">Expert advice</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Heart className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Caring</h3>
                  <p className="text-sm text-gray-600">Personal service</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2 group">
                <span>Book Consultation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/pic1.png"
                alt="Professional Insurance Broker"
                width={600}
                height={800}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-amber-200/30 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

