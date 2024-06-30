import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReclamationsService } from './reclamations.service';
import { Reclamation } from './reclamation.entity';

@Controller('reclamations')
export class ReclamationsController {
  constructor(private readonly reclamationsService: ReclamationsService) {}

  @Get()
  async getAllReclamations(): Promise<Reclamation[]> {
    return this.reclamationsService.getAllReclamations();
  }
  @Get('byFirstLetter/:letter')
  async getReclamationsByFirstLetter(@Param('letter') letter: string): Promise<Reclamation[]> {
    // Ajoutez ici la logique pour rechercher les réclamations par la première lettre de ref-envoi
    return this.reclamationsService.getReclamationsByFirstLetter(letter);
  }
  
  @Get(':refEnvoi')
  async getReclamationByRef(@Param('refEnvoi') refEnvoi: string): Promise<Reclamation> {
    const reclamation = await this.reclamationsService.getReclamationById(refEnvoi);
    if (!reclamation) {
      throw new NotFoundException('Réclamation introuvable');
    }
    return reclamation;
  }

  @Post()
  async createReclamation(@Body() reclamationData: Reclamation): Promise<Reclamation> {
    try {
      return await this.reclamationsService.createReclamation(reclamationData);
    } catch (error) {
      throw new BadRequestException(error.message); // Handle invalid reclamation
    }
  }

  @Put(':id')
  async updateReclamation(
    @Param('id') id: string,
    @Body() updatedData: Partial<Reclamation>,
  ): Promise<Reclamation> {
    const updatedReclamation = await this.reclamationsService.updateReclamation(id, updatedData);
    if (!updatedReclamation) {
      throw new NotFoundException('Réclamation introuvable');
    }
    return updatedReclamation;
  }
  @Delete(':refEnvoi')
async deleteReclamation(@Param('refEnvoi') refEnvoi: string): Promise<void> {
  // Utilisez votre service pour supprimer la réclamation de la base de données
  await this.reclamationsService.deleteReclamation(refEnvoi);
}

}
