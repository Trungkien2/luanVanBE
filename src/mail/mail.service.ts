import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { Cache } from 'cache-manager';

@Injectable()
export class EmailService {
  constructor(  @Inject(CACHE_MANAGER) private cacheService: Cache,) {
    // Load SendGrid API key from environment variables
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const msg = {
      to: to,
      from: process.env.FROM_EMAIL, // Your verified SendGrid email
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}.`,
      html: `<strong>Your OTP code is ${otp}</strong>`,
    };

    try {
     await sgMail.send(msg);

     
          // Cache giá trị trong Redis
          await this.cacheService.set(
            `otp:${otp}`,
            JSON.stringify(otp),
            300000 // casche trong 5p
          );
        
   
      console.log('OTP email sent successfully');
    } catch (error) {
      console.error('Error sending OTP email:', error.response.body.errors);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }


  async verifyOtp(otp : string){
    const storedOtp = await this.cacheService.get(`otp:${otp}`);
    if (storedOtp === otp) {
        // OTP hợp lệ
        return true;
      }
      return false; // OTP không hợp lệ
  }
}
