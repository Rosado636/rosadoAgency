import React from 'react';
import Image from 'next/image';
import { Shield, Heart, Users, Award, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Rosado Agency
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in securing financial peace of mind for you and your loved ones across Texas.
          </p>
        </div>

        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section */}
          <div className="relative">
            <Image
              src="/pic2.png"
              alt="Machelle Rosado - Insurance Professional"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Protecting Texas Families Since Day One
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              At Rosado Agency, we understand that life insurance isn&apos;t just about policies it&apos;s about protecting the people and dreams that matter most to you. Led by Machelle Rosado, our agency has been dedicated to providing personalized insurance solutions that give Texas families the security and peace of mind they deserve.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              With years of experience in the insurance industry, we specialize in life insurance, mortgage protection, debt elimination strategies, and smart banking solutions. Our approach is built on trust, transparency, and a deep understanding of your unique financial goals and family needs.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We believe that everyone deserves access to quality insurance protection, regardless of their current financial situation. That&apos;s why we work with multiple top-rated insurance carriers to find the best coverage options at competitive rates for each client.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re guided by core principles that put your family&apos;s financial security first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-700" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Protection First</h4>
              <p className="text-gray-600">
                Your family&apos;s financial security is our top priority. We design comprehensive protection strategies that safeguard your loved ones&apos; future, no matter what life brings.
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-700" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Personal Care</h4>
              <p className="text-gray-600">
                We treat every client like family. Our personalized approach ensures you receive individual attention and insurance solutions tailored specifically to your unique needs and circumstances.
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-700" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h4>
              <p className="text-gray-600">
                As a Texas-based agency, we understand the unique needs of our local communities. We&apos;re committed to building lasting relationships and supporting families throughout the Lone Star State.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Rosado Agency?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Licensed & Experienced</h4>
                    <p className="text-gray-600">Fully licensed insurance professional with extensive knowledge of Texas insurance regulations and market conditions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multiple Carrier Options</h4>
                    <p className="text-gray-600">We work with top-rated insurance companies to provide you with the best coverage options and competitive rates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Consultations</h4>
                    <p className="text-gray-600">No-obligation consultations to assess your needs and provide personalized recommendations for your family&apos;s protection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                    <p className="text-gray-600">We provide continuous service and support throughout the life of your policies, including claims assistance and policy reviews.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                    <p className="text-gray-600">Deep understanding of Texas families&apos; needs and the local insurance landscape to provide relevant, practical solutions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Our Commitment</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="font-medium text-gray-900">Client Satisfaction</span>
                  <span className="text-amber-700 font-bold">100%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="font-medium text-gray-900">Response Time</span>
                  <span className="text-amber-700 font-bold">&lt; 24 Hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="font-medium text-gray-900">Free Consultations</span>
                  <span className="text-amber-700 font-bold">Always</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="font-medium text-gray-900">Service Area</span>
                  <span className="text-amber-700 font-bold">All Texas</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 italic">
                  &quot;Your peace of mind is our highest priority&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;