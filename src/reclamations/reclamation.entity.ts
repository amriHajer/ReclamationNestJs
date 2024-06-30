import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity('reclamation')
export class Reclamation {
@PrimaryGeneratedColumn()
id:number ;

@Column()
ref_envoi:string ;  

@Column()
motif_rec:String;        


@Column()
date_envoi_rec:string;


@Column()
date_reclamation:string;

//coordonnées d'expediteur 
@Column()
nom_expediteur:string;


@Column()
adresse_expediteur:string;

@Column()
email_expediteur:string;

@Column()
tel_expediteur:number ;

//**********************


@Column()
nom_destinataire:string;

@Column()
adresse_destinataire:string;


@Column()
email_destinataire:string ;


@Column()
tel_destinataire:number ;


}

