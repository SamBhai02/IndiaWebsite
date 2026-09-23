/* TechBait — contact.js
   Validates the contact form and sends the message via EmailJS
   (client-side email delivery — no backend server required).

   SETUP REQUIRED (see README.md for full steps):
   1. Create a free account at https://www.emailjs.com
   2. Create an Email Service (e.g. Gmail/Outlook) and an Email Template.
      In the template, make sure the "To email" field is set to:
      support@techbait.co.in
   3. Replace the three placeholder values below with your own:
      EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID
*/

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const DESTINATION_EMAIL = 'support@techbait.co.in';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialise EmailJS if the SDK loaded and a key has been set.
  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('.form-status');
  const modalOverlay = document.getElementById('success-modal');

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    phone: form.querySelector('#phone'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message'),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, show) {
    const wrapper = field.closest('.field');
    if (!wrapper) return;
    wrapper.classList.toggle('has-error', show);
  }

  function validate() {
    let valid = true;

    if (!fields.name.value.trim()) { setError(fields.name, true); valid = false; }
    else setError(fields.name, false);

    if (!fields.email.value.trim() || !emailPattern.test(fields.email.value.trim())) {
      setError(fields.email, true); valid = false;
    } else setError(fields.email, false);

    if (!fields.message.value.trim()) { setError(fields.message, true); valid = false; }
    else setError(fields.message, false);

    return valid;
  }

  function showStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.add('is-visible');
    statusEl.classList.toggle('is-error', isError);
  }

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  modalOverlay?.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      showStatus('Please fill in the required fields correctly.', true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    statusEl.classList.remove('is-visible', 'is-error');

    const templateParams = {
      to_email: DESTINATION_EMAIL,
      from_name: fields.name.value.trim(),
      from_email: fields.email.value.trim(),
      phone: fields.phone ? fields.phone.value.trim() : '',
      subject: fields.subject ? fields.subject.value.trim() : 'New enquiry from techbait.co.in',
      message: fields.message.value.trim(),
    };

    try {
      if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS is not configured yet. Add your keys in js/contact.js.');
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      form.reset();
      openModal();
    } catch (err) {
      console.error('Email send failed:', err);
      showStatus(
        err && err.message && err.message.includes('EmailJS is not configured')
          ? err.message
          : 'Something went wrong sending your message. Please try again or email us directly at ' + DESTINATION_EMAIL + '.',
        true
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText;
    }
  });
});
