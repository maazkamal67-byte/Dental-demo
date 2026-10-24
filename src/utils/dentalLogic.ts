/**
 * Pure functions for dental clinic logic (form validation, filtering, search, lightbox index)
 */

export interface AppointmentData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateAppointmentForm(
  data: Partial<AppointmentData>,
  currentDateStr: string = '2026-10-23'
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // Phone validation: allow generic phone formats
  const phoneClean = (data.phone || '').replace(/[\s\-\(\)\+]/g, '');
  if (!phoneClean || phoneClean.length < 7) {
    errors.phone = 'Please enter a valid phone number.';
  }

  // Email validation: standard email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.service || data.service.trim() === '') {
    errors.service = 'Please select a service.';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date.';
  } else if (data.preferredDate < currentDateStr) {
    errors.preferredDate = 'Appointment date cannot be in the past.';
  }

  if (!data.preferredTime || data.preferredTime.trim() === '') {
    errors.preferredTime = 'Please select a preferred time window.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'general' | 'cosmetic' | 'orthodontics' | 'family';
  description: string;
}

export function filterServicesList(services: ServiceItem[], category: string): ServiceItem[] {
  if (!category || category === 'all') {
    return services;
  }
  return services.filter((s) => s.category.toLowerCase() === category.toLowerCase());
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function searchFAQList(faqs: FAQItem[], query: string): FAQItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return faqs;
  }
  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(trimmed) ||
      faq.answer.toLowerCase().includes(trimmed)
  );
}

export function calculateLightboxIndex(
  currentIndex: number,
  delta: number,
  totalItems: number
): number {
  if (totalItems <= 0) return 0;
  return (currentIndex + delta + totalItems) % totalItems;
}
