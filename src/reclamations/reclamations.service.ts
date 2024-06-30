import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reclamation } from './reclamation.entity';

@Injectable()
export class ReclamationsService {
  constructor(
    @InjectRepository(Reclamation)
    private readonly reclamationRepository: Repository<Reclamation>,
  ) {}

  async isReclamationValid(reclamationData: Reclamation): Promise<boolean> {
    if (!reclamationData || !reclamationData.ref_envoi) {
      return false; // Return false if reclamationData or ref_envoi is undefined
    }

    const validPrefixes = ['RR', 'CP', 'EE'];
    const validSuffix = 'TN';

    if (reclamationData.ref_envoi.length !== 13) {
      return false;
    }

    const prefix = reclamationData.ref_envoi.substring(0, 2);
    const suffix = reclamationData.ref_envoi.substring(11, 13);

    if (!validPrefixes.includes(prefix) || suffix !== validSuffix) {
      return false;
    }

    return true;
  }

  async generateRefEnvoi(types: string[], randomPartLength: number): Promise<string> {
    const validPrefixes = ['RR', 'CP', 'EE'];
    const validSuffix = 'TN';

    let refEnvoi = '';
    do {
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomPart = Math.random().toString().slice(2, 2 + randomPartLength);
      refEnvoi = `${randomType}${randomPart}${validSuffix}`;
    } while (refEnvoi.length !== 13 || !validPrefixes.includes(refEnvoi.substring(0, 2)));

    return refEnvoi;
  }

  async createReclamation(reclamationData: Reclamation): Promise<Reclamation> {
    const isValid = await this.isReclamationValid(reclamationData);

    if (!isValid) {
      throw new Error('Réclamation invalide');
    }

    const newReclamation = this.reclamationRepository.create(reclamationData);
    return this.reclamationRepository.save(newReclamation);
  }

  async updateReclamation(refEnvoi: string, updatedData: Partial<Reclamation>): Promise<Reclamation> {
    await this.reclamationRepository.update({ ref_envoi: refEnvoi }, updatedData);
    return this.reclamationRepository.findOne({ where: { ref_envoi: refEnvoi } });
  }

  //async deleteReclamation(id: string): Promise<void> {
   // await this.reclamationRepository.delete(id);
  //}

  async getAllReclamations(): Promise<Reclamation[]> {
    return this.reclamationRepository.find();
  }

  async getReclamationsByFirstLetter(letter: string): Promise<Reclamation[]> {
    const reclamationList = await this.reclamationRepository.createQueryBuilder('reclamation')
      .where('reclamation.ref_envoi LIKE :letter', { letter: `${letter}%` })
      .getMany();
    return reclamationList;
  }
  async deleteReclamation(refEnvoi: string): Promise<void> {
    // Utilisez le Repository pour supprimer la réclamation par refEnvoi
    await this.reclamationRepository.delete({ ref_envoi: refEnvoi });
  }
  
  async getReclamationById(refEnvoi: string): Promise<Reclamation> {
    return this.reclamationRepository.findOne({ where: { ref_envoi: refEnvoi } });
  }
}
