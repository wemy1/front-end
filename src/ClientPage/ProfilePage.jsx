import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('client'); // نوع المستخدم: client/admin/technician
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // رابط API يختلف حسب نوع المستخدم مثلا
      let url = '';
      if (userType === 'client') url = '/api/client/login';
      else if (userType === 'admin') url = '/api/admin/login';
      else if (userType === 'technician') url = '/api/technician/login';

      const response = await axios.post(url, { email, password });

      // نفترض السيرفر يرجع token + userData + role
      const { token, user, role } = response.data;

      // نخزن التوكن و نوع المستخدم
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userData', JSON.stringify(user));

      // توجيه حسب الدور
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'technician') navigate('/technician/dashboard');
      else navigate('/client/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

        {/* Choix du type utilisateur */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Type d'utilisateur</label>
          <select
            value={userType}
            onChange={e => setUserType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="client">Client</option>
            <option value="admin">Administrateur</option>
            <option value="technician">Technicien</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Affichage erreur */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
