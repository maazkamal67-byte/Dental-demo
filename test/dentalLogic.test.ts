import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAppointmentForm,
  filterServicesList,
  searchFAQList,
  calculateLightboxIndex,
  type ServiceItem,
  type FAQItem,
} from '../src/utils/dentalLogic';

test('validateAppointmentForm flags empty fields and past dates', () => {
  const emptyRes = validateAppointmentForm({}, '2026-10-23');
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.fullName);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.phone);
  assert.ok(emptyRes.errors.service);
  assert.ok(emptyRes.errors.preferredDate);

  const pastDateRes = validateAppointmentForm(
    {
      fullName: 'Jane Doe',
      phone: '0000 000 0000',
      email: 'jane@example.com',
      service: 'Check-ups and Cleaning',
      preferredDate: '2026-10-20',
      preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    },
    '2026-10-23'
  );
  assert.equal(pastDateRes.isValid, false);
  assert.equal(pastDateRes.errors.preferredDate, 'Appointment date cannot be in the past.');

  const validRes = validateAppointmentForm(
    {
      fullName: 'Jane Doe',
      phone: '0000 000 0000',
      email: 'jane@example.com',
      service: 'Check-ups and Cleaning',
      preferredDate: '2026-10-25',
      preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    },
    '2026-10-23'
  );
  assert.equal(validRes.isValid, true);
  assert.deepEqual(validRes.errors, {});
});

test('filterServicesList filters by category correctly', () => {
  const sampleServices: ServiceItem[] = [
    { id: '1', title: 'Cleaning', category: 'general', description: 'Clean' },
    { id: '2', title: 'Whitening', category: 'cosmetic', description: 'White' },
    { id: '3', title: 'Braces', category: 'orthodontics', description: 'Braces' },
    { id: '4', title: 'Kids', category: 'family', description: 'Kids' },
  ];

  assert.equal(filterServicesList(sampleServices, 'all').length, 4);
  assert.equal(filterServicesList(sampleServices, 'general').length, 1);
  assert.equal(filterServicesList(sampleServices, 'cosmetic').length, 1);
  assert.equal(filterServicesList(sampleServices, 'orthodontics').length, 1);
  assert.equal(filterServicesList(sampleServices, 'family').length, 1);
});

test('searchFAQList searches questions and answers case-insensitively', () => {
  const sampleFAQs: FAQItem[] = [
    { id: '1', question: 'How often should I clean teeth?', answer: 'Every six months is typical.' },
    { id: '2', question: 'What about clear aligners?', answer: 'Clear aligners offer subtle teeth alignment.' },
  ];

  assert.equal(searchFAQList(sampleFAQs, 'clean').length, 1);
  assert.equal(searchFAQList(sampleFAQs, 'ALIGNERS').length, 1);
  assert.equal(searchFAQList(sampleFAQs, 'six months').length, 1);
  assert.equal(searchFAQList(sampleFAQs, 'nonexistent').length, 0);
  assert.equal(searchFAQList(sampleFAQs, '').length, 2);
});

test('calculateLightboxIndex wraps forward and backward', () => {
  assert.equal(calculateLightboxIndex(0, 1, 5), 1);
  assert.equal(calculateLightboxIndex(4, 1, 5), 0);
  assert.equal(calculateLightboxIndex(0, -1, 5), 4);
  assert.equal(calculateLightboxIndex(2, -1, 5), 1);
});
