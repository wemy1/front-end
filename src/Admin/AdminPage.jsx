import React, { useState } from 'react';
import './admin.css';

// Composant Technicien (identique à votre AdminPage existant)
const TechnicienPage = () => {
  const [data, setData] = useState([
    { id: 1, nom: 'Amin K', prenom: 'Jean', email: 'Karim@example.com', telephone: '06 12 34 56 78', specialite: 'Plomberie' },
    { id: 2, nom: 'Hamza', prenom: 'Sophie', email: 'Hmz.martin@example.com', telephone: '06 23 45 67 89', specialite: 'Electricité' },
    { id: 3, nom: 'Yasser', prenom: 'Pierre', email: 'Yassr.dubois@example.com', telephone: '06 34 55 78 90', specialite: 'Chauffage' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = data.filter(item =>
    `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setData(prevData => prevData.filter(item => item.id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestion des Techniciens</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher des techniciens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="green-btn">+ Ajouter</button>
        <button className="export-btn">Exporter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.email}</td>
              <td>{item.telephone}</td>
              <td>{item.specialite}</td>
              <td>
                <button className="action-btn">&#9998;</button>
                <button onClick={() => handleDelete(item.id)} className="action-btn">&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce technicien ?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Client
const ClientPage = () => {
  const [data, setData] = useState([
    { id: 1, nom: 'Durand', prenom: 'Marie', email: 'marie.durand@example.com', telephone: '06 11 22 33 44', adresse: '12 Rue de Paris' },
    { id: 2, nom: 'Leroy', prenom: 'Thomas', email: 'thomas.leroy@example.com', telephone: '06 55 66 77 88', adresse: '5 Avenue des Fleurs' },
    { id: 3, nom: 'Moreau', prenom: 'Alice', email: 'alice.moreau@example.com', telephone: '06 99 88 77 66', adresse: '3 Boulevard Central' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = data.filter(item =>
    `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setData(prevData => prevData.filter(item => item.id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestion des Clients</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher des clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="green-btn">+ Ajouter</button>
        <button className="export-btn">Exporter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.email}</td>
              <td>{item.telephone}</td>
              <td>{item.adresse}</td>
              <td>
                <button className="action-btn">&#9998;</button>
                <button onClick={() => handleDelete(item.id)} className="action-btn">&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Avis
const AvisPage = () => {
  const [data, setData] = useState([
    { id: 1, client: 'Amin', technicien: 'Amin', note: 5, commentaire: 'Excellent service!', date: '2023-05-15' },
    { id: 2, client: 'ninoo', technicien: 'Mokhtar', note: 4, commentaire: 'Très satisfait', date: '2023-05-18' },
    { id: 3, client: 'sadjed', technicien: 'souhil', note: 3, commentaire: 'Correct', date: '2023-05-20' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = data.filter(item =>
    `${item.client} ${item.technicien}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setData(prevData => prevData.filter(item => item.id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestion des Avis</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher des avis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="export-btn">Exporter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Technicien</th>
            <th>Note</th>
            <th>Commentaire</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.client}</td>
              <td>{item.technicien}</td>
              <td>{item.note}/5</td>
              <td>{item.commentaire}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="action-btn">&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer cet avis ?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Spécialités
const SpecialitePage = () => {
  const [data, setData] = useState([
    { id: 1, nom: 'Plomberie', description: 'Installation et réparation de systèmes de plomberie' },
    { id: 2, nom: 'Electricité', description: 'Installation et réparation de systèmes électriques' },
    { id: 3, nom: 'Chauffage', description: 'Installation et entretien de systèmes de chauffage' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newSpecialite, setNewSpecialite] = useState({ nom: '', description: '' });

  const filteredData = data.filter(item =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setData(prevData => prevData.filter(item => item.id !== selectedId));
    setShowModal(false);
  };

  const handleAddSpecialite = () => {
    if (newSpecialite.nom && newSpecialite.description) {
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      setData([...data, { id: newId, ...newSpecialite }]);
      setNewSpecialite({ nom: '', description: '' });
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Gestion des Spécialités</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher des spécialités..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="green-btn">+ Ajouter</button>
      </div>

      <div className="add-specialite-form">
        <h3>Ajouter une nouvelle spécialité</h3>
        <input
          type="text"
          placeholder="Nom de la spécialité"
          value={newSpecialite.nom}
          onChange={(e) => setNewSpecialite({...newSpecialite, nom: e.target.value})}
        />
        <textarea
          placeholder="Description"
          value={newSpecialite.description}
          onChange={(e) => setNewSpecialite({...newSpecialite, description: e.target.value})}
        />
        <button onClick={handleAddSpecialite} className="green-btn">Valider</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.description}</td>
              <td>
                <button className="action-btn">&#9998;</button>
                <button onClick={() => handleDelete(item.id)} className="action-btn">&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer cette spécialité ?</p>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Note
const NotePage = () => {
  const [data, setData] = useState([
    { id: 1, technicien: 'Jean Dupont', moyenne: 4.5, interventions: 12 },
    { id: 2, technicien: 'Sophie Martin', moyenne: 4.2, interventions: 8 },
    { id: 3, technicien: 'Pierre Dubois', moyenne: 3.8, interventions: 15 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.technicien.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Notes des Techniciens</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher des techniciens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="export-btn">Exporter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Technicien</th>
            <th>Note moyenne</th>
            <th>Interventions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.technicien}</td>
              <td>{item.moyenne}/5</td>
              <td>{item.interventions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Composant principal qui gère les onglets
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('techniciens');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'techniciens':
        return <TechnicienPage />;
      case 'clients':
        return <ClientPage />;
      case 'specialites':
        return <SpecialitePage />;
      case 'notes':
        return <NotePage />;
      case 'avis':
        return <AvisPage />;
      default:
        return <TechnicienPage />;
    }
  };

  return (
    <div className="admin-container">
      <div className="tabs">
        <button 
          className={activeTab === 'techniciens' ? 'active' : ''}
          onClick={() => setActiveTab('techniciens')}
        >
          Techniciens
        </button>
        <button 
          className={activeTab === 'clients' ? 'active' : ''}
          onClick={() => setActiveTab('clients')}
        >
          Clients
        </button>
        <button 
          className={activeTab === 'specialites' ? 'active' : ''}
          onClick={() => setActiveTab('specialites')}
        >
          Spécialités
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button 
          className={activeTab === 'avis' ? 'active' : ''}
          onClick={() => setActiveTab('avis')}
        >
          Avis
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default AdminPage;