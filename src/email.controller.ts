import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('reclamations')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('gerer')
  async sendEmail(@Body() emailData: { to: string, subject: string, html: string }): Promise<string> {
    const { to, subject, html } = emailData;
    
    try {
      await this.emailService.sendEmail(to, subject, html);
      return `E-mail envoyé avec succès à ${to}.`;
    } catch (error) {
      return `Erreur lors de l'envoi de l'e-mail à ${to}.`;
    }
  }
}


