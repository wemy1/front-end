import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Composant Technicien
const TechnicienPage = () => {
  const [data, setData] = useState([
    { id: 1, nom: 'Amin ', prenom: 'hamzaoui', email: 'Karim@a.com', telephone: '06 12 34 56 78', specialite: 'Plomberie' },
    { id: 2, nom: 'Hamza', prenom: 'lakehal', email: 'Hmz.a@example.com', telephone: '06 23 45 67 89', specialite: 'Electricité' },
    { id: 3, nom: 'Yasser', prenom: 'sa', email: 'Yassr.b@example.com', telephone: '06 34 55 78 90', specialite: 'Chauffage' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTechnicien, setEditingTechnicien] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    specialite: ''
  });

  useEffect(() => {
    fetchTechniciens();
  }, []);

  const fetchTechniciens = async () => {
    try {
      const response = await api.get('/techniciens');
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des techniciens');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/techniciens/${selectedId}`);
      setData(prevData => prevData.filter(item => item._id !== selectedId));
      setShowModal(false);
    } catch (err) {
      setError('Erreur lors de la suppression du technicien');
    }
  };

  const handleAdd = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      specialite: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (technicien) => {
    setEditingTechnicien(technicien);
    setFormData({
      nom: technicien.nom,
      prenom: technicien.prenom,
      email: technicien.email,
      telephone: technicien.telephone,
      specialite: technicien.specialite
    });
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showAddModal) {
        const response = await api.post('/techniciens', formData);
        setData(prevData => [...prevData, response.data]);
        setShowAddModal(false);
      } else if (showEditModal) {
        const response = await api.put(`/techniciens/${editingTechnicien._id}`, formData);
        setData(prevData => prevData.map(item => 
          item._id === editingTechnicien._id ? response.data : item
        ));
        setShowEditModal(false);
      }
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        specialite: ''
      });
    } catch (err) {
      setError('Erreur lors de l\'opération');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredData = data.filter(item =>
    `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.email}</td>
              <td>{item.telephone}</td>
              <td>{item.specialite}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(item)}>&#9998;</button>
                <button onClick={() => handleDelete(item._id)} className="action-btn">&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
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

      {/* Add/Edit Form Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal">
          <div className="modal-content">
            <h3>{showAddModal ? 'Ajouter un technicien' : 'Modifier le technicien'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom:</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prénom:</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone:</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Spécialité:</label>
                <input
                  type="text"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}>Annuler</button>
                <button type="submit">{showAddModal ? 'Ajouter' : 'Modifier'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Client
const ClientPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des clients');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/clients/${selectedId}`);
      setData(prevData => prevData.filter(item => item.id !== selectedId));
      setShowModal(false);
    } catch (err) {
      setError('Erreur lors de la suppression du client');
    }
  };

  const handleAdd = async (newClient) => {
    try {
      const response = await api.post('/clients', newClient);
      setData(prevData => [...prevData, response.data]);
    } catch (err) {
      setError('Erreur lors de l\'ajout du client');
    }
  };

  const handleUpdate = async (id, updatedClient) => {
    try {
      const response = await api.put(`/clients/${id}`, updatedClient);
      setData(prevData => prevData.map(item => 
        item.id === id ? response.data : item
      ));
    } catch (err) {
      setError('Erreur lors de la mise à jour du client');
    }
  };

  const filteredData = data.filter(item =>
    `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
    { id: 1, technicien: 'amin', moyenne: 4.5, interventions: 12 },
    { id: 2, technicien: 'karim sahli', moyenne: 4.2, interventions: 8 },
    { id: 3, technicien: 'salim ka', moyenne: 3.8, interventions: 15 }
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