'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { WaitingListFormData, WaitingListResponse } from '@/Interface/WaitingList';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/** Form data structure for waiting list signup */
interface FormData {
  email: string;
  name: string;
  interest: string;
  location: string;
  newsletter: boolean;
}

/** Form state for loading, success, and error handling */
interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  emailError: boolean;
}

/**
 * Waiting list section with email signup form and benefits display.
 * Features form validation, loading states, and success/error messaging.
 * Currently uses mock API - ready for Supabase integration.
 * @returns The waiting list section with signup form and benefits
 */
export default function WaitingListSection() {
  /** Form input data state */
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    interest: '',
    location: '',
    newsletter: true
  });

  /** Form UI state management */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    emailError: false
  });

  // const supabase = createClientComponentClient();

  /**
   * Validates email format using regex pattern.
   * @param email - Email string to validate
   * @returns True if email format is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles form input changes and real-time email validation.
   * @param field - The form field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time email validation feedback
    if (field === 'email' && typeof value === 'string') {
      setFormState(prev => ({ 
        ...prev, 
        emailError: !validateEmail(value) && value.length > 0 
      }));
    }
  };

  /**
   * Handles form submission with API call to our backend
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setFormState(prev => ({ ...prev, emailError: true }));
      return;
    }

    setFormState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null, 
      emailError: false 
    }));

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: WaitingListResponse = await response.json();

      if (!response.ok || !result.success) {
        // Handle specific errors
        if (result.error === 'DUPLICATE_EMAIL') {
          setFormState(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: 'This email is already registered in our waiting list.' 
          }));
        } else if (result.error === 'INVALID_EMAIL') {
          setFormState(prev => ({ 
            ...prev, 
            isLoading: false, 
            emailError: true 
          }));
        } else {
          setFormState(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: result.message || 'Something went wrong. Please try again.' 
          }));
        }
        return;
      }

      // Success state
      setFormState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSuccess: true 
      }));

      // Reset form after successful submission
      setFormData({
        email: '',
        name: '',
        interest: '',
        location: '',
        newsletter: true
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ 
          ...prev, 
          isSuccess: false 
        }));
      }, 5000);

    } catch (error) {
      console.error('Submit error:', error);
      setFormState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Network error. Please check your connection and try again.' 
      }));
    }
  };

  return (
    <footer className="footer text-white min-h-screen flex items-center py-16" style={{ backgroundColor: '#1E2F3F' }}>
      <div className="container mx-auto px-4">
        <div className="waiting-list-section max-w-4xl mx-auto">
          <div className="cta-header text-center mb-12">
            <h2 className="cta-title text-3xl md:text-4xl font-bold mb-4">
              Join Beta Waiting List
            </h2>
            <p className="cta-description text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Be among the first to access shared ownership opportunities when we launch. 
              Get early access to properties and exclusive benefits.
            </p>
            
            <div className="benefits-list grid md:grid-cols-3 gap-6 mt-8 mb-8">
              <div className="benefit-item text-center">
                <div className="benefit-icon text-2xl mb-2">🎯</div>
                <div className="benefit-text text-sm text-gray-300">
                  Early access to premium properties
                </div>
              </div>
              <div className="benefit-item text-center">
                <div className="benefit-icon text-2xl mb-2">💰</div>
                <div className="benefit-text text-sm text-gray-300">
                  Exclusive beta pricing and offers
                </div>
              </div>
              <div className="benefit-item text-center">
                <div className="benefit-icon text-2xl mb-2">📧</div>
                <div className="benefit-text text-sm text-gray-300">
                  Priority updates and announcements
                </div>
              </div>
            </div>
          </div>
          
          <div className="registration-form-container bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            {/* Success/Error Messages */}
            {(formState.isSuccess || formState.error) && (
              <div className="form-messages mb-6">
                {formState.isSuccess && (
                  <div className="success-msg bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <div className="flex items-center">
                      <span className="mr-2">✅</span>
                      <span>Thank you! You&apos;ve been successfully added to our waiting list. Check your email for confirmation.</span>
                    </div>
                  </div>
                )}
                
                {formState.error && (
                  <div className="error-msg bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <div className="flex items-center">
                      <span className="mr-2">❌</span>
                      <span>{formState.error}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="waiting-list-form">
              <div className="form-fields grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="field-group">
                  <Label htmlFor="email" className="field-label block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input w-full px-4 py-4 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-200 ${
                      formState.emailError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {formState.emailError && (
                    <div className="field-error text-red-400 text-sm mt-2">
                      Please enter a valid email address
                    </div>
                  )}
                </div>
                
                <div className="field-group">
                  <Label htmlFor="name" className="field-label block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-gray-500 text-xs">(Optional)</span>
                  </Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="field-group">
                  <Label htmlFor="interest" className="field-label block text-sm font-medium text-gray-300 mb-2">
                    I&apos;m interested in <span className="text-gray-500 text-xs">(Optional)</span>
                  </Label>
                  <select 
                    id="interest" 
                    name="interest"
                    value={formData.interest}
                    onChange={(e) => handleInputChange('interest', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
                  >
                    <option value="" className="bg-gray-700 text-white">Select your interest level</option>
                    <option value="first-time-buyer" className="bg-gray-700 text-white">First-time homebuyer</option>
                    <option value="upgrading" className="bg-gray-700 text-white">Upgrading my current home</option>
                    <option value="investment" className="bg-gray-700 text-white">Investment property</option>
                    <option value="relocation" className="bg-gray-700 text-white">Relocating to new area</option>
                    <option value="just-curious" className="bg-gray-700 text-white">Just curious about the concept</option>
                  </select>
                </div>
                
                <div className="field-group">
                  <Label htmlFor="location" className="field-label block text-sm font-medium text-gray-300 mb-2">
                    Preferred Location <span className="text-gray-500 text-xs">(Optional)</span>
                  </Label>
                  <Input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="form-input w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="City, State or 'Flexible'"
                  />
                </div>
                
                <div className="field-group md:col-span-2">
                  <div className="checkbox-group flex items-start">
                    <Checkbox 
                      id="newsletter" 
                      name="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                      className="form-checkbox mt-1 mr-3 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-300 leading-relaxed">
                      I&apos;d like to receive updates about new properties, market insights, and exclusive offers. 
                      You can unsubscribe at any time.
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="form-submit mt-8">
                <Button 
                  type="submit" 
                  disabled={formState.isLoading}
                  className={`submit-btn w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg ${
                    formState.isLoading 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : formState.isSuccess
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105'
                  }`}
                >
                  <span className="btn-text">
                    {formState.isLoading 
                      ? 'Submitting...' 
                      : formState.isSuccess 
                        ? 'Successfully Joined!' 
                        : 'Join the Waiting List'
                    }
                  </span>
                  <span className="btn-icon ml-2">
                    {formState.isLoading 
                      ? '⏳' 
                      : formState.isSuccess 
                        ? '🎉' 
                        : '🚀'
                    }
                  </span>
                </Button>
                <p className="form-disclaimer text-xs text-gray-400 text-center mt-3">
                  By joining, you agree to our Privacy Policy and Terms of Service
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div className="footer-links mt-16 pt-8 border-t border-gray-700">
          <div className="links-container flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="legal-links flex space-x-6">
              <a href="#" className="privacy-link text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="terms-link text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
            
            <div className="social-links flex space-x-4">
              <a href="#" className="social-link text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="social-link text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <span className="text-xl">💼</span>
              </a>
              <a href="#" className="social-link text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <span className="text-xl">📘</span>
              </a>
            </div>
            
            <div className="copyright">
              <p className="text-gray-400 text-sm">&copy; 2025 FREEHOMES.XYZ. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 