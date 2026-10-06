const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Only the live site may call this function. Browsers always send Origin on a
// cross-origin or same-origin fetch POST, so a missing or foreign Origin means
// the request did not come from the contact form.
const ALLOWED_ORIGINS = new Set([
  'https://exlingo.com',
  'https://www.exlingo.com',
]);

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// Escape user input before it goes into the HTML email body.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function reply(statusCode, payload) {
  return { statusCode, body: JSON.stringify(payload) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed' });
  }

  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || '';
  if (!ALLOWED_ORIGINS.has(origin)) {
    return reply(403, { error: 'Forbidden' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return reply(400, { error: 'Invalid request' });
  }

  const { name, email, message, website } = body;

  // Honeypot: real visitors never see or fill the hidden "website" field.
  // Bots that fill every field get a success response and nothing is sent.
  if (website) {
    return reply(200, { message: 'Email sent successfully' });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string'
      || !name.trim() || !email.trim() || !message.trim()) {
    return reply(400, { error: 'Missing required fields' });
  }

  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return reply(400, { error: 'Input too long' });
  }

  if (!EMAIL_RE.test(email)) {
    return reply(400, { error: 'Invalid email address' });
  }

  // Subject is a header: strip line breaks so input cannot add header lines.
  const safeSubjectName = name.replace(/[\r\n]+/g, ' ').trim();

  try {
    const { error } = await resend.emails.send({
      from: 'ExLingo Website <noreply@exlingo.com>',
      to: 'nanaka.king@exlingo.com',
      subject: `New Inquiry from ${safeSubjectName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return reply(500, { error: 'Failed to send email' });
    }

    return reply(200, { message: 'Email sent successfully' });
  } catch (err) {
    console.error('Function error:', err);
    return reply(500, { error: 'Internal server error' });
  }
};
