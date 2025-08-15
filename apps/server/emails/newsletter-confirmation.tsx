import { Button, Text } from '@react-email/components';
import { serverEnv } from 'env.server';
import { EmailContainer } from './components/container';

const welcomeText = {
  color: '#ffffff',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px',
  fontWeight: '400',
};

const descriptionText = {
  color: '#e2e8f0',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0 32px',
};

const buttonStyle = {
  backgroundColor: '#2dd4bf',
  border: 'none',
  borderRadius: '8px',
  color: '#0f172a',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  padding: '14px 32px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 0 24px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const securityNote = {
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0 0',
  fontStyle: 'italic',
};

export default function NewsletterConfirmationEmail({
  token,
}: {
  token: string;
}) {
  const confirmationLink = `${serverEnv.CORS_ORIGIN}/confirmation?token=${token}`;
  return (
    <EmailContainer
      preview="Welcome to the waitlist!"
      title="You're on the list!"
    >
      <Text style={welcomeText}>
        Welcome to the RTS Build Orders waitlist! We're excited to have you join
        our community of RTS enthusiasts.
      </Text>

      <Text style={descriptionText}>
        Please confirm your email address by clicking the button below to
        complete your waitlist registration.
      </Text>

      <Button href={confirmationLink} style={buttonStyle}>
        Confirm Email
      </Button>

      <Text style={descriptionText}>
        If the button doesn't work, copy and paste this link into your browser:{' '}
        {confirmationLink}
      </Text>

      <Text style={securityNote}>
        This confirmation link is valid for 30 minutes. If you didn't sign up
        for our waitlist, you can safely ignore this email.
      </Text>
    </EmailContainer>
  );
}

NewsletterConfirmationEmail.PreviewProps = {
  token: 'sample-confirmation-token-123',
};
