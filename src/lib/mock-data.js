// Données fictives pour les techniciens
export const mockTechniciens = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    telephone: "06 12 34 56 78",
    specialite: "Plomberie",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.com",
    telephone: "06 23 45 67 89",
    specialite: "Électricité",
  },
  {
    id: 3,
    nom: "Dubois",
    prenom: "Pierre",
    email: "pierre.dubois@example.com",
    telephone: "06 34 56 78 90",
    specialite: "Chauffage",
  },
  {
    id: 4,
    nom: "Leroy",
    prenom: "Marie",
    email: "marie.leroy@example.com",
    telephone: "06 45 67 89 01",
    specialite: "Serrurerie",
  },
  {
    id: 5,
    nom: "Moreau",
    prenom: "Thomas",
    email: "thomas.moreau@example.com",
    telephone: "06 56 78 90 12",
    specialite: "Climatisation",
  },
]

// Données fictives pour les clients
export const mockClients = [
  {
    id: 1,
    nom: "Bernard",
    prenom: "Alice",
    email: "alice.bernard@example.com",
    telephone: "06 67 89 01 23",
    adresse: "12 rue des Lilas, 75001 Paris",
  },
  {
    id: 2,
    nom: "Petit",
    prenom: "Robert",
    email: "robert.petit@example.com",
    telephone: "06 78 90 12 34",
    adresse: "45 avenue Victor Hugo, 69002 Lyon",
  },
  {
    id: 3,
    nom: "Richard",
    prenom: "Émilie",
    email: "emilie.richard@example.com",
    telephone: "06 89 01 23 45",
    adresse: "8 boulevard Gambetta, 33000 Bordeaux",
  },
  {
    id: 4,
    nom: "Simon",
    prenom: "Lucas",
    email: "lucas.simon@example.com",
    telephone: "06 90 12 34 56",
    adresse: "23 rue de la Paix, 59000 Lille",
  },
  {
    id: 5,
    nom: "Laurent",
    prenom: "Camille",
    email: "camille.laurent@example.com",
    telephone: "06 01 23 45 67",
    adresse: "56 rue du Commerce, 44000 Nantes",
  },
]

// Données fictives pour les interventions
export const mockInterventions = [
  {
    id: 1,
    date: "2023-05-15",
    client: "Alice Bernard",
    technicien: "Jean Dupont",
    description: "Fuite d'eau dans la salle de bain",
    adresse: "12 rue des Lilas, 75001 Paris",
    statut: "Terminé",
  },
  {
    id: 2,
    date: "2023-05-18",
    client: "Robert Petit",
    technicien: "Sophie Martin",
    description: "Panne électrique dans la cuisine",
    adresse: "45 avenue Victor Hugo, 69002 Lyon",
    statut: "En cours",
  },
  {
    id: 3,
    date: "2023-05-20",
    client: "Émilie Richard",
    technicien: "Pierre Dubois",
    description: "Problème de chauffage",
    adresse: "8 boulevard Gambetta, 33000 Bordeaux",
    statut: "En attente",
  },
  {
    id: 4,
    date: "2023-05-22",
    client: "Lucas Simon",
    technicien: "Marie Leroy",
    description: "Serrure bloquée",
    adresse: "23 rue de la Paix, 59000 Lille",
    statut: "Annulé",
  },
  {
    id: 5,
    date: "2023-05-25",
    client: "Camille Laurent",
    technicien: "Thomas Moreau",
    description: "Installation climatisation",
    adresse: "56 rue du Commerce, 44000 Nantes",
    statut: "En attente",
  },
]

// Données fictives pour les notes
export const mockNotes = [
  {
    id: 1,
    date: "2023-05-16",
    client: "Alice Bernard",
    technicien: "Jean Dupont",
    note: 5,
    commentaire: "Excellent service, rapide et efficace.",
  },
  {
    id: 2,
    date: "2023-05-19",
    client: "Robert Petit",
    technicien: "Sophie Martin",
    note: 4,
    commentaire: "Bon travail, mais un peu en retard.",
  },
  {
    id: 3,
    date: "2023-05-21",
    client: "Émilie Richard",
    technicien: "Pierre Dubois",
    note: 3,
    commentaire: "Service correct mais pourrait être amélioré.",
  },
  {
    id: 4,
    date: "2023-05-23",
    client: "Lucas Simon",
    technicien: "Marie Leroy",
    note: 5,
    commentaire: "Très professionnel et aimable.",
  },
  {
    id: 5,
    date: "2023-05-26",
    client: "Camille Laurent",
    technicien: "Thomas Moreau",
    note: 4,
    commentaire: "Bonne installation, explications claires.",
  },
]

// Données fictives pour les spécialités
export const mockSpecialites = [
  {
    id: 1,
    nom: "Plomberie",
    description: "Installation et réparation de systèmes de plomberie, robinets, éviers, toilettes, etc.",
  },
  {
    id: 2,
    nom: "Électricité",
    description:
      "Installation et réparation de systèmes électriques, prises, interrupteurs, tableaux électriques, etc.",
  },
  {
    id: 3,
    nom: "Chauffage",
    description: "Installation, entretien et réparation de systèmes de chauffage, chaudières, radiateurs, etc.",
  },
  {
    id: 4,
    nom: "Serrurerie",
    description: "Installation et réparation de serrures, clés, portes blindées, coffres-forts, etc.",
  },
  {
    id: 5,
    nom: "Climatisation",
    description: "Installation, entretien et réparation de systèmes de climatisation et de ventilation.",
  },
]
