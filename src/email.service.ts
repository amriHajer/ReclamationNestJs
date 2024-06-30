import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurez le transporteur (SMTP) pour l'envoi d'e-mails
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Serveur SMTP de Gmail
      port: 587, // Port SMTP de Gmail
      secure: false, // Utilisez true si le port est sécurisé (ex. 465)
      auth: {
        // user: 'hajer.amri93@gmail.com', // Votre adresse e-mail
        // pass: 'ynhm evjj zhih jbjz', // code SMTP de gmail
        user: 'tunposte@gmail.com', // Votre adresse e-mail         hwmd wyas zpmu ylqc
        pass: 'hwmd wyas zpmu ylqc', // code SMTP de gmail
        // pass: 'tunposte1999', // code SMTP de gmail
      },
    });
  }



  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    // Définissez les détails de l'e-mail (expéditeur, destinataire, objet, contenu, etc.)
    const mailOptions = {
      from: 'tunposte@gmail.com',
      to,
      subject,
      html,
    };

    // Utilisez le transporteur pour envoyer l'e-mail
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('E-mail envoyé avec succès à', to);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      throw error;
    }
  }
}
