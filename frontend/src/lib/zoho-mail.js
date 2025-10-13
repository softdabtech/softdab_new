import { Buffer } from 'buffer';

// Функция для формирования JSON данных для Zoho Mail API
const createEmailData = (formData) => {
  const teamEmailContent = `
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
`;

  const clientEmailContent = `
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
`;

  return {
    teamEmail: {
      fromAddress: "noreply@softdab.tech",
      toAddress: "info@softdab.tech",
      subject: `New Contact Form: ${formData.name} from ${formData.company}`,
      content: teamEmailContent
    },
    clientEmail: {
      fromAddress: "noreply@softdab.tech",
      toAddress: formData.email,
      subject: "Thank you for contacting SoftDAB!",
      content: clientEmailContent
    }
  };
};

export const sendZohoMail = async (formData, zohoAuthToken) => {
  try {
    const emailData = createEmailData(formData);
    const emailRequests = [emailData.teamEmail, emailData.clientEmail].map(email => {
      const requestData = {
        fromAddress: email.fromAddress,
        toAddress: email.toAddress,
        subject: email.subject,
        content: email.content,
        mailFormat: "text",
        askReceipt: "no"
      };

      return fetch('https://mail.zoho.com/api/accounts/self/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${zohoAuthToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Failed to send email to ${email.toAddress}`);
        }
        return response.json();
      });
    });

    await Promise.all(emailRequests);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// Функция для получения токена доступа Zoho
export const getZohoToken = async () => {
  const clientId = process.env.REACT_APP_ZOHO_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_ZOHO_CLIENT_SECRET;
  const code = process.env.REACT_APP_ZOHO_CODE;
  const scope = process.env.REACT_APP_ZOHO_SCOPE;

  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        scope: scope
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh Zoho token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Zoho token:', error);
    throw error;
  }
};