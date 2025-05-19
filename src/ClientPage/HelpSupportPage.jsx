import { FaHeadset, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

const HelpSupportPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "Comment annuler une demande de service ?",
      answer: "Allez dans votre historique de demandes, sélectionnez la demande concernée et cliquez sur 'Annuler'. Les annulations sont possibles jusqu'à 1 heure avant le rendez-vous."
    },
    {
      id: 2,
      question: "Quels modes de paiement sont acceptés ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et le paiement en espèces à la livraison pour certains services."
    },
    {
      id: 3,
      question: "Comment modifier mon rendez-vous ?",
      answer: "Dans votre tableau de bord, accédez à 'Mes Rendez-vous', sélectionnez celui à modifier et utilisez l'option 'Réprogrammer'. Vous pouvez le faire jusqu'à 2 heures avant l'heure prévue."
    },
    {
      id: 4,
      question: "Que faire si je ne suis pas satisfait du service ?",
      answer: "Contactez-nous dans les 24h via le formulaire ci-dessous. Notre équipe examinera votre réclamation et vous proposera une solution sous 48h."
    }
  ];

  const handleFaqToggle = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouteriez l'envoi du formulaire à votre backend
    alert('Votre message a été envoyé ! Nous vous répondrons dans les 24h.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FaHeadset className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Aide & Support</h1>
          <p className="text-lg text-gray-500">
            Nous sommes là pour vous aider. Consultez notre FAQ ou contactez notre équipe.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaQuestionCircle className="mr-2 text-green-500" />
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => handleFaqToggle(faq.id)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <FaChevronDown className={`transition-transform ${activeFaq === faq.id ? 'transform rotate-180' : ''}`} />
                </button>
                {activeFaq === faq.id && (
                  <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaEnvelope className="mr-2 text-green-500" />
            Contactez-nous
          </h2>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Methods */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Autres moyens de contact</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <FaPhoneAlt className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Téléphone</h3>
              <p className="text-gray-500 mb-3">Disponible 24h/24</p>
              <a href="tel:+213123456789" className="text-green-600 font-medium hover:text-green-500">
                +213 123 45 67 89
              </a>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FaWhatsapp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-gray-500 mb-3">Réponse rapide</p>
              <a href="https://wa.me/213123456789" className="text-green-600 font-medium hover:text-green-500">
                Envoyer un message
              </a>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                <FaEnvelope className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
              <p className="text-gray-500 mb-3">Réponse sous 24h</p>
              <a href="mailto:support@quickfixdz.com" className="text-green-600 font-medium hover:text-green-500">
                support@FixHome.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;