let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (err) {
  // If bundler can't resolve node-fetch, rely on platform fetch (Node 18+ / Netlify env)
  fetch = globalThis.fetch;
}

const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.com/oauth/v2/token';
const ZOHO_MAIL_URL = 'https://mail.zoho.com/api/accounts/self/messages';

const getZohoToken = async () => {
  const params = new URLSearchParams({
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    code: process.env.ZOHO_CODE,
    grant_type: 'authorization_code',
    scope: 'ZohoMail.messages.CREATE'
  });

  const response = await fetch(ZOHO_ACCOUNTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    throw new Error('Failed to get Zoho token');
  }

  const data = await response.json();
  return data.access_token;
};

const sendEmail = async (token, { fromAddress, toAddress, subject, content }) => {
  const response = await fetch(ZOHO_MAIL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fromAddress,
      toAddress,
      subject,
      content,
      mailFormat: 'text',
      askReceipt: 'no'
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to send email to ${toAddress}`);
  }

  return response.json();
};

const createEmailContent = (formData) => ({
  team: {
    fromAddress: 'noreply@softdab.tech',
    toAddress: 'info@softdab.tech',
    subject: `New Contact Form: ${formData.name} from ${formData.company}`,
    content: `
New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}

Service: ${formData.service}
Timeline: ${formData.timeline}
Budget: ${formData.budget}

Message:
${formData.message}

Marketing Consent: ${formData.marketingConsent ? 'Yes' : 'No'}
    `
  },
  client: {
    fromAddress: 'noreply@softdab.tech',
    toAddress: formData.email,
    subject: 'Thank you for contacting SoftDAB!',
    content: `
Dear ${formData.name},

Thank you for contacting SoftDAB! We have received your message and our team will review it shortly.

Here's a copy of your submission:

Name: ${formData.name}
Company: ${formData.company}
Role: ${formData.role}
Service: ${formData.service}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Message: ${formData.message}

We will get back to you within 24 hours.

Best regards,
SoftDAB Team
    `
  }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const formData = JSON.parse(event.body);

    // Проверка honeypot
    if (formData.website) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'success' })
      };
    }

    const token = await getZohoToken();
    const emails = createEmailContent(formData);

    // Отправляем оба письма
    await Promise.all([
      sendEmail(token, emails.team),
      sendEmail(token, emails.client)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  }
};