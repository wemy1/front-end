import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MailIcon, ShieldCheckIcon } from "lucide-react";

export default function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const email = location.state?.email || '';

  const verifyCode = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!verificationCode) {
        throw new Error('Veuillez entrer le code de vérification');
      }

      const response = await fetch('http://localhost:8000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Code de vérification incorrect');
      }

      setSuccess('Email vérifié avec succès !');
      setTimeout(() => navigate("/Connexion"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MailIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Vérification d'email</h1>
          <p className="mt-2 text-gray-600">
            Nous avons envoyé un code de vérification à <span className="font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Code de vérification
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Entrez le code à 6 chiffres"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={verifyCode}
              disabled={isSubmitting || !verificationCode}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Vérification...' : 'Vérifier le code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}