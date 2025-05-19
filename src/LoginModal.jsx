
    import { X } from "lucide-react";
import { Link } from "react-router-dom";
export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Rejoignez-nous !</h2>
          <p className="text-gray-700">
            Les habitants et professionnels de votre quartier répondent à tous vos besoins.
          </p>
        </div>

       


        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <div className="px-4 text-gray-500">ou</div>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email signup button */}
<Link to="/RegistrationPage" className="block w-full">
  <button className="flex items-center justify-center w-full border border-gray-300 rounded-full py-3 px-4 mb-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-3"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    <span>M'inscrire avec un e-mail</span>
  </button>
</Link>

        {/* Login link */}
        <div className="text-center">
          <a href="/Connexion" className="text-gray-800 underline">
            Déjà inscrit ? Me connecter
          </a>
        </div>
      </div>
    </div>
  )
}
