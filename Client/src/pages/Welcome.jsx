import { useNavigate, useParams } from 'react-router-dom';


const Welcome = () => {
  const { userId } = useParams();
  console.log('userId:', userId);
  const navigate = useNavigate();
 

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-[#f0f8ff] text-[#333]">
      <h1 className="text-3xl md:text-4xl mb-4 text-[#2C3E50]">
        Bienvenue dans notre application!
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-lg">
        Nous sommes ravis de vous accueillir! Ici, vous pouvez créer ou mettre à jour votre portfolio pour mettre en valeur vos compétences et vos réalisations. Prêt à commencer?
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          className="py-3 px-6 text-lg bg-[#3498db] text-white rounded shadow hover:bg-[#2980b9] transition duration-300 ease-in-out"
          onClick={() => navigate(`/cardUser/${userId}`)} // Redirect to ScanForm
        >
          Créer votre portfolio
        </button>
        {/* <button 
          className="py-3 px-6 text-lg bg-[#2ecc71] text-white rounded shadow hover:bg-[#27ae60] transition duration-300 ease-in-out"
          onClick={() => navigate(`/cardUser/${userId}`)}
        >
          Mettre à jour votre portfolio
        </button> */}
      </div>
     
    </div>
  );
};

export default Welcome;
