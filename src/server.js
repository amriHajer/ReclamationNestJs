const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendEmail } = require('./emailService'); // Importez le service

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route pour gérer les réclamations
app.post('/reclamations/gerer/:refEnvoi', (req, res) => {
  const refEnvoi = req.params.refEnvoi;

  // Récupérer l'adresse e-mail du destinataire de la réclamation à partir du corps de la requête
  const email = req.body.email; // Supposons que le champ contenant l'adresse e-mail s'appelle "email" dans la requête
  const subject = 'Réponse à votre réclamation';
  const message = 'Votre réclamation a été gérée avec succès.';

  // Pour l'exemple, renvoyez une réponse réussie :
  res.status(200).json({ message: 'Réclamation gérée avec succès' });

  // Envoyer un e-mail en réponse à la réclamation
  sendEmail(email, subject, message);
});

// Port d'écoute du serveur
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
