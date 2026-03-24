import nodemailer from 'nodemailer';
import { ApiError } from '@core/ApiError';

export class EmailService {
  private static createTransporter() {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      throw ApiError.validation('Email service is not configured');
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass
      }
    });
  }

  static async sendVerificationEmail(email: string, code: string): Promise<void> {
    const transporter = this.createTransporter();
    const from = process.env.EMAIL_FROM || process.env.GMAIL_USER || 'no-reply@cureledger.com';

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Verify your CureLedger account',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your verification code is <strong>${code}</strong>.</p><p>This code expires in 10 minutes.</p>`
    });
  }
}
