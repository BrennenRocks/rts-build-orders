import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { serverEnv } from 'env.server';
import type * as React from 'react';

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
  padding: '10px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  padding: '20px',
  maxWidth: '465px',
  width: '100%',
};

const coverSection = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const upperSection = {
  backgroundColor: '#0f172a',
  color: '#ffffff',
  padding: '25px 35px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0',
};

const footerSection = {
  padding: '0 48px 20px 48px',
  textAlign: 'center' as const,
};

const link = {
  color: '#556cd6',
  textDecoration: 'underline',
};

const divider = {
  color: '#8898aa',
  margin: '0 4px',
};

const FOOTER_TEXT =
  'You received this email because you have an account with RTS Build Orders. If you have any questions, please contact us.';

export function EmailContainer({
  children,
  preview,
  title,
}: {
  children: React.ReactNode;
  preview: string;
  title: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>{preview}</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section
              style={{
                padding: '0.5rem 0',
                textAlign: 'center',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                backgroundColor: '#2dd4bf',
              }}
            >
              <Img
                alt="RTS Build Orders"
                height="64"
                src="https://images.rtsbuildorders.com/logo.png"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginRight: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  padding: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                width="64"
              />
              <Text
                style={{
                  ...h1,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  margin: '0',
                }}
              >
                RTS Build Orders
              </Text>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>{title}</Heading>
              {children}
            </Section>
          </Section>

          <Text style={footerText}>{FOOTER_TEXT}</Text>
          <Section style={footerSection}>
            <Link href={`${serverEnv.CORS_ORIGIN}/privacy`} style={link}>
              Privacy Policy
            </Link>
            <span style={divider}> | </span>
            <Link href={`${serverEnv.CORS_ORIGIN}/terms`} style={link}>
              Terms of Service
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
