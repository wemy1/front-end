import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const pendingUser = JSON.parse(sessionStorage.getItem('pendingVerification'));
    if (!pendingUser || !pendingUser.email) {
      navigate('/Connexion');
      return;
    }
    setUserEmail(pendingUser.email);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/verify-email', {
        email: userEmail,
        verification_code: verificationCode
      });

      if (response.data.success) {
        // Clear pending verification
        sessionStorage.removeItem('pendingVerification');
        
        // Show success message and redirect to login
        setTimeout(() => {
          navigate('/Connexion');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la vérification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://localhost:5000/api/resend-verification', {
        email: userEmail
      });
      alert('Un nouveau code de vérification a été envoyé à votre adresse email.');
    } catch (err) {
      setError('Erreur lors de l\'envoi du nouveau code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vérification de votre email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Un code de vérification a été envoyé à {userEmail}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="verification_code" className="block text-sm font-medium text-gray-700">
                Code de vérification
              </label>
              <div className="mt-1">
                <input
                  id="verification_code"
                  name="verification_code"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Entrez le code à 6 chiffres"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Vérification...' : 'Vérifier'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handleResendCode}
              className="w-full text-center text-sm text-green-600 hover:text-green-500"
            >
              Renvoyer le code de vérification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}