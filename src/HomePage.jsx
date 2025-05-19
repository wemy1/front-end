
import { Link as RouterLink } from "react-router-dom";
import {Link }from "react-scroll";
import React, { useState, useRef } from "react";
import "./App.css";
import LoginModal from "./LoginModal";
import { 
  WrenchIcon, 
  MenuIcon, 
  XIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  PhoneIcon, 
  ClockIcon, 
  UsersIcon, 
  PenToolIcon,
  Star,
  BellIcon,
  TreePine,         // للبستنة
  Shield,           // للأمن/الإنذار
  Home as HomeIcon,         // للعقارات (renamed from Home)
  Cctv,             // للكاميرات
  PlugZap,          // للكهرباء
  Droplets,         // للسباكة
  Paintbrush,       // للدهان
  Hammer,           // للبناء
  Snowflake,        // للتكييف
  Truck,            // للنقل
  Laptop,           // للإعلام الآلي
  Smartphone,       // للهواتف
  Wifi,             // للشبكات
  Lock,             // للقفل
  Settings,         // للصيانة
  DollarSignIcon
} from "lucide-react";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const services = [
  { 
    title: "Plomberie", 
    description: "Réparation rapide de fuites, débouchage et plus.", 
    link: "/RegistrationPage",
    icon: <Droplets className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Électricité", 
    description: "Installation et réparation de circuits électriques.", 
    link: "/RegistrationPage",
    icon: <PlugZap className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Serrurerie", 
    description: "Ouverture de portes, changement de serrures.", 
    link: "/RegistrationPage",
    icon: <Lock className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Peinture", 
    description: "Rénovation et décoration intérieure.", 
    link: "/RegistrationPage",
    icon: <Paintbrush className="w-6 h-6 text-green-600" />
  },
  { 
  title: "Nettoyage", 
  description: "Nettoyage maison, Désinfection.", 
  link: "/services/nettoyage",
  icon: <HomeIcon className="w-6 h-6 text-green-600" />  // HomeIcon au lieu de Home
},
  { 
    title: "Maçonnerie", 
    description: "Rénovation mur, pose carrelage, crépis.", 
    link: "/RegistrationPage",
    icon: <Hammer className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Climatisation", 
    description: "Installation climatiseur, entretien, dépannage.", 
    link: "/RegistrationPage",
    icon: <Snowflake className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Déménagement", 
    description: "Déménagement de meubles, emballage, transport sécurisé.", 
    link: "/RegistrationPage",
    icon: <Truck className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Informatique", 
    description: "Réparation PC, installation logiciels, suppression virus.", 
    link: "/RegistrationPage",
    icon: <Laptop className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Jardinage", 
    description: "Entretien jardin, tonte pelouse, taille haies.", 
    link: "/RegistrationPage",
    icon: <TreePine className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Alarme/Sécurité", 
    description: "Installation de systèmes d'alarme et de sécurité.", 
    link: "/RegistrationPage",
    icon: <Shield className="w-6 h-6 text-green-600" />
  },
  { 
    title: "Domotique", 
    description: "Installation de systèmes intelligents pour la maison.", 
    link: "/RegistrationPage",
    icon: <Settings className="w-6 h-6 text-green-600" />
  }
];

  const ServiceCard = ({ name, type, rating, location, description, image, timeAgo }) => (
    <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
      <div className="p-4 flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-3"></div>
        <div>
          <div className="flex items-center">
            <h3 className="font-bold text-lg">{name}</h3>
            <span className={`ml-2 px-2 py-0.5 text-sm rounded ${
              type === "Entreprise" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
            }`}>
              {type}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{rating}/5</span>
            </div>
            <span className="ml-2 text-sm text-gray-600">{location}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-gray-700 text-sm">{description}</p>
      </div>

      <div className="h-40 bg-gray-200 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={`Service de ${name}`} className="w-full h-full object-cover" />
      </div>

      <div className="p-3 text-sm text-gray-500 border-t">{timeAgo}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">
              <WrenchIcon />
            </span>
            <span className="text-2xl font-bold">
              <span className="text-green-600">San</span>
              <span className="text-black">3ati</span>
            </span>
          </div>


<nav className="hidden md:flex items-center gap-6">
            <Link to="services" 
            smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600 transition-colors">
              Nos Services</Link>
            <Link to="how-it-works"
             smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600 transition-colors">Comment Ça Marche</Link>
            <Link to="about"
             smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600 transition-colors">À propos</Link>
          </nav>

          <div className="flex items-center gap-4">
           <RouterLink to="/Connexion" className="hidden md:inline-flex h-10 items-center justify-center px-4 py-2 border border-green-600 text-green-600 font-medium rounded-full hover:bg-green-50 transition-colors">
  Se connecter
</RouterLink>
<RouterLink to="/RegistrationPage" className="inline-flex h-10 items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors">
  S'inscrire
</RouterLink>

            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Responsive */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 flex flex-col space-y-2 border-b">
          <Link to="/services"
           smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600" onClick={toggleMenu}>Nos Services</Link>
          <Link to="/how-it-works"
           smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600" onClick={toggleMenu}>Comment Ça Marche</Link>
          <Link to="/about"
           smooth={true}
            duration={500}
             className="text-sm font-bold hover:text-green-600" onClick={toggleMenu}>À propos</Link>
          <RouterLink to="/Connexion" className="text-sm font-bold hover:text-green-600" onClick={toggleMenu}>Se connecter</RouterLink>
         </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-white-50 to-white">
          <div className="container mx-auto px-4 md:px-6 grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Dépannage à domicile <span className="text-green-600">professionnel</span>
              </h1>
              <p className="text-gray-600 md:text-lg">
                Service rapide et fiable pour tous vos besoins de réparation. Nos experts sont à votre service.
              </p>
              <button 
  onClick={() => setIsLoginModalOpen(true)}
  className="inline-flex h-10 px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700"
>
  Réserver maintenant
</button>
                <Link to="/services" className="inline-flex items-center justify-center h-10 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50">
                  Nos Services
                </Link>

                
              </div>
            </div>

             {/* Image à droite */}
      <div className="order-2 lg:order-none flex justify-center lg:justify-end">
        <img 
          src="/Capture d'écran 2025-04-29 002640.png" // Remplacez par le chemin de votre image
          alt="Technicien en dépannage à domicile"
             className="absolute top-0 rounded-lg w-full max-w-md object-cover h-64 md:h-96"
        />
      </div>
          
          
        

        {/* Services */}
        <section id="services" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 py-12">
  <h1 className="text-center text-4xl font-bold mb-12">
    <span className="text-gray-900">Nos </span>
    <span className="bg-green-700 text-white px-3 py-1 rounded-md">Services</span>
    <span className="text-gray-900"> Experts</span>
  </h1>


              <p className="max-w-[700px] mx-auto text-gray-600 md:text-lg">
                Des solutions professionnelles pour tous vos besoins domestiques
              </p>
            </div>


<div className="relative">
              <button onClick={scrollLeft} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-100 z-10">
                <ChevronLeftIcon className="w-6 h-6 text-green-600" />
              </button>
              <button onClick={scrollRight} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-100 z-10">
                <ChevronRightIcon className="w-6 h-6 text-green-600" />
              </button>

              <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-8">
                {services.map((service, index) => (
                  <div key={index} className="flex-shrink-0 w-64 snap-start">
                    <div className="h-full flex flex-col items-center p-6 border rounded-xl shadow-md hover:shadow-lg transition-all">
                      <div className="mb-4 p-3 rounded-xl bg-green-100">
                        <PenToolIcon className="text-green-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-center text-gray-600 text-sm mb-4">{service.description}</p>
                      <Link to={service.link} className="text-green-600 font-medium hover:text-green-700 mt-auto">
                        Détails
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
        
          
        </section>
        </section>

        {/* Comment Ça Marche */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
            <h2 className="text-3xl font-bold">Comment Ça Marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <PhoneIcon className="w-12 h-12 mx-auto text-green-600" />
                <h3 className="text-xl font-semibold">1. Demandez un service</h3>
                <p className="text-gray-600">Choisissez le service dont vous avez besoin et envoyez une demande.</p>
              </div>
              <div className="space-y-4">
                <ClockIcon className="w-12 h-12 mx-auto text-green-600" />
                <h3 className="text-xl font-semibold">2. Recevez une réponse rapide</h3>
                <p className="text-gray-600">Un expert vous contacte rapidement pour fixer un rendez-vous.</p>
              </div>
              <div className="space-y-4">
                <UsersIcon className="w-12 h-12 mx-auto text-green-600" />
                <h3 className="text-xl font-semibold">3. Service effectué</h3>
                <p className="text-gray-600">Le professionnel effectue les travaux à votre domicile.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Offreurs */}
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-center text-4xl font-bold mb-12">
            <span className="text-gray-900">Ils </span>
            <span className="bg-green-700 text-white px-3 py-1 rounded-md">répondent</span>
            <span className="text-gray-900"> à vos demandes</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              name="Anis D."
              type="Entreprise"
              rating={5}
              location="Oran"
              description="Je propose des solutions à tous types de problèmes avec 15 ans d'expérience en électricité..."
              image="/269310705c983749d2ec0c7502a77de8.jpg"
              timeAgo="Il y a 9 minutes"
            />


<ServiceCard
              name="yasser L."
              type="Particulier"
              rating={4.8}
              location="Alger"
              description="Bonjour je représente le site FixHome pour rendre service entre voisins avec une belles image avec..."
              image="/6590cb318023dbc47658f40a32421520.jpg"
              timeAgo="dimanche à 22h"
            />

            <ServiceCard
              name="Amin D."
              type="Particulier"
              rating={5}
              location="Skikda"
              description="Services Rapides et Efficaces au Meilleur Prix, Directement Chez Vous Mécanicien automobile à..."
              image="/bc9a72c0a205ddda51f135725355548c.jpg"
              timeAgo="Hier à 20h"
            />
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-grey-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg transition-colors">
              Voir tous les offreurs
            </button>
          </div>
        </div>

        {/* About Us */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">À propos de nous</h2>
                <p className="text-gray-600">
                  Depuis plus de 10 ans, notre équipe de professionnels qualifiés offre des services de dépannage à
                  domicile de haute qualité. Nous sommes fiers de notre réputation d'excellence et de fiabilité.
                </p>
                <p className="text-gray-600">
                  Notre mission est de fournir des solutions rapides et efficaces à tous vos problèmes domestiques, avec
                  un service client exceptionnel et des tarifs transparents.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-green-600">500+</span>
                    <span className="text-gray-600">Clients satisfaits</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-green-600">15+</span>
                    <span className="text-gray-600">Professionnels</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-green-600">24/7</span>
                    <span className="text-gray-600">Service d'urgence</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-green-600">100%</span>
                    <span className="text-gray-600">Satisfaction garantie</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 p-6 border-l-4 border-green-600">
                  <div className="flex items-start space-x-4">
                    <span className="text-green-600 mt-1">
                      <UsersIcon />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">Notre équipe</h3>
                      <p className="text-gray-600">
                        Nos techniciens sont certifiés et expérimentés dans tous les aspects du dépannage à domicile. Nous
                        investissons continuellement dans leur formation pour garantir un service de qualité supérieure.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-6 border-l-4 border-green-600">
                  <div className="flex items-start space-x-4">
                    <span className="text-green-600 mt-1">
                      <PenToolIcon />


</span>
                    <div>
                      <h3 className="text-xl font-bold">Notre engagement</h3>
                      <p className="text-gray-600">
                        Nous nous engageons à fournir un service rapide, fiable et professionnel. Votre satisfaction est
                        notre priorité absolue, et nous ne considérons un travail comme terminé que lorsque vous êtes
                        entièrement satisfait.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-black text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Besoin d'un dépannage urgent?</h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Nos professionnels sont disponibles pour vous aider
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="inline-flex h-10 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
                  Réserver maintenant
                </button>
                <button className="inline-flex h-10 px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Nouvelle Section Banner */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              <span className="block">Particuliers,</span>
              <span className="text-green-600">arrondissez vos fins de mois avec FixHome !</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4 p-4 bg-green-100 rounded-full">
                <BellIcon className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700">
                Je suis alerté en temps réel des demandes postées autour de moi
              </p>
            </div>

            {/* Étape 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4 p-4 bg-green-100 rounded-full">
                <PenToolIcon className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700">
                Je réponds aux demandes et réalise des prestations
              </p>
            </div>

            {/* Étape 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="mb-4 p-4 bg-green-100 rounded-full">
                <DollarSignIcon className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700">
                Je suis payé et évalué pour mon travail
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              to="/Connexion" 
              className="inline-flex h-12 px-8 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors"
            >
              Je propose mes services
            </Link>
          </div>
        </div>
      </section>


{/* Footer */}
        <footer className="border-t bg-white py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-600">
                  <WrenchIcon />
                </span>
                <span className="text-lg font-bold">
                  <span className="text-green-600">Fix</span>
                  <span className="text-black">Home</span>
                </span>
              </div>
              <p className="text-center text-sm text-gray-600 md:text-left">© 2025 FixHome. Tous droits réservés.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Conditions
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Confidentialité
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600">
                  Contact
                </a>
              </div>
            </div>
          </div>
          
        </footer>
        {isLoginModalOpen && (
  <LoginModal onClose={() => setIsLoginModalOpen(false)} />
)}
      </main>
      
      
    </div>
  );
};

export default Home;