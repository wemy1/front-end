import React, { useState } from "react";

export default function DemandPublique() {
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isProOnly, setIsProOnly] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files].slice(0, 3));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🌍 Demande publique</h2>

      <label className="block mb-2 font-medium">Décrivez votre besoin</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bonjour,"
        maxLength={500}
        className="w-full h-24 border rounded p-2 mb-2 resize-none"
      />

      <p className="text-sm text-gray-500 mb-2">
        0/25 min.
      </p>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Ajoutez des photos</label>
        <p className="text-sm text-gray-500 mb-2">
          Augmentez vos chances de faire affaire de 25% en illustrant votre besoin.
        </p>

        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <label
              key={index}
              className="w-20 h-20 bg-gray-100 flex items-center justify-center border rounded cursor-pointer"
            >
              {photos[index] ? (
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt="upload"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="text-xl">📷</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="font-medium">Réservé aux pros</span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isProOnly}
            onChange={() => setIsProOnly(!isProOnly)}
          />
          <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${isProOnly ? "bg-purple-600" : ""}`}>
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isProOnly ? "translate-x-5" : ""}`}
            />
          </div>
        </label>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Obtenez les garanties d’un professionnel : certifications, assurance, facture...<br />
        Seuls les auto-entrepreneurs et entreprises pourront répondre à votre demande.
      </p>

      <p className="text-sm text-gray-500 mb-4">
        ⏱ Délai estimé avant première réponse : -
      </p>

      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
      >
        Poster ma demande
      </button>
    </div>
  );
}
