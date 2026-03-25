import nodemailer from 'nodemailer';
import { ApiError } from '@core/ApiError';
import { env } from '@config/env';

interface SendMailPayload {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
}

export class EmailService {
  private static createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD
      }
    });
  }

  static async sendMail(payload: SendMailPayload): Promise<void> {
    const transporter = this.createTransporter();
    const from = payload.from || env.EMAIL_FROM;

    if (!payload.text && !payload.html) {
      throw ApiError.validation('Mail body is required (text or html)');
    }

    await transporter.sendMail({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      cc: payload.cc,
      bcc: payload.bcc,
      replyTo: payload.replyTo
    });
  }

  static async sendVerificationEmail(email: string, code: string): Promise<void> {
    await this.sendMail({
      to: email,
      subject: 'Verify your CureLedger account',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your verification code is <strong>${code}</strong>.</p><p>This code expires in 10 minutes.</p>`
    });
  }
}
