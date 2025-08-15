import NewsletterConfirmationEmail from 'emails/newsletter-confirmation';
import { serverEnv } from 'env.server';
import { Resend } from 'resend';

const resendClient = new Resend(serverEnv.RESEND_API_KEY);

export async function sendNewsletterConfirmationEmail(
  email: string,
  token: string
) {
  try {
    await resendClient.emails.send({
      from: serverEnv.FROM_EMAIL,
      to: email,
      subject: 'Confirm your email for the RTS Build Orders waitlist',
      react: NewsletterConfirmationEmail({ token }),
    });
  } catch (error) {
    console.error('sendNewsletterConfirmationEmail error', error);
  }
}

// export async function sendPurchaseConfirmationEmail({
// 	email,
// 	creditCount,
// 	amount,
// 	tax,
// 	amount_total,
// 	date,
// 	dashboardUrl,
// }: {
// 	email: string;
// 	creditCount: number;
// 	amount: number;
// 	tax: number;
// 	amount_total: number;
// 	date: string;
// 	dashboardUrl: string;
// }) {
// 	try {
// 		await resendClient.emails.send({
// 			from: serverEnv.FROM_EMAIL,
// 			to: email,
// 			subject: 'Purchase Confirmation',
// 			react: PurchaseConfirmationEmail({
// 				creditCount,
// 				amount,
// 				tax,
// 				amount_total,
// 				date,
// 				dashboardUrl,
// 			}),
// 		});
// 	} catch (error) {
// 		console.error('sendPurchaseConfirmationEmail error', error);
// 	}
// }
