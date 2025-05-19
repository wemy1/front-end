import { FaPlus, FaTrash, FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'carte',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleAddCard = () => {
    // Validation simple
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const last4 = newCard.number.slice(-4);
    const newMethod = {
      id: Date.now(),
      type: 'carte',
      last4,
      brand: detectCardType(newCard.number),
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setNewCard({ number: '', expiry: '', cvc: '', name: '' });
    setShowAddForm(false);
  };

  const detectCardType = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    return 'Carte';
  };

  const setAsDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const deleteMethod = (id) => {
    if (paymentMethods.find(m => m.id === id)?.isDefault) {
      alert('Vous ne pouvez pas supprimer la méthode par défaut');
      return;
    }
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Méthodes de paiement</h1>
        
        {/* Liste des méthodes */}
        <div className="space-y-4 mb-8">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {method.type === 'carte' ? (
                    <>
                      <FaCreditCard className="text-blue-500 text-2xl mr-3" />
                      <div>
                        <p className="font-medium">{method.brand} •••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expire le {method.expiry}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <FaPaypal className="text-blue-500 text-2xl mr-3" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-gray-500">{method.email}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  {method.isDefault ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Par défaut</span>
                  ) : (
                    <button 
                      onClick={() => setAsDefault(method.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Définir par défaut
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMethod(method.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ajouter une méthode */}
        {showAddForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Ajouter une carte</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddCard}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <FaPlus className="mr-2 text-blue-500" />
              <span className="text-blue-600 font-medium">Ajouter une carte</span>
            </button>
            
            <button className="flex items-center justify-center w-full p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
              <FaPaypal className="mr-2 text-blue-500 text-xl" />
              <span className="font-medium">Ajouter PayPal</span>
            </button>
          </div>
        )}

        {/* Paiement à la livraison */}
        <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-green-500 text-2xl mr-3" />
            <div>
              <h3 className="font-medium">Paiement à la livraison</h3>
              <p className="text-sm text-gray-500">Payez en espèces lorsque le service est terminé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;