import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SearchableDropdown from '../components/SearchableDropDown';
import { VitaminContent } from '../data/Vitamin';
import VitaminInfo from '../components/VitaminInfo';
import PopularItems from '../components/PopularItems';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [selectedVitamin, setSelectedVitamin] = useState<VitaminContent | any>(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    useEffect(() => {
      if (id) {
        fetchVitaminById(id);
      } else {
        setSelectedVitamin(null);
      }
    }, [id]);
  
    const fetchVitaminById = async (vitaminId: string) => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/v1/vitamins/${vitaminId}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setSelectedVitamin(data);
      } catch (error) {
        console.error("Vitamin ararken hata oluştu:", error);
        setSelectedVitamin(null);
      }
    };

    // Dropdown'dan seçim yapıldığında URL'yi güncelle
    const handleDropdownSelect = (vitaminId: string) => {
      navigate(`/?id=${vitaminId}`);  // ya da uygun path
    };

    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
          <Box sx={{ width: '80%' }}>
            <SearchableDropdown onSelect={handleDropdownSelect} selectedId={selectedVitamin ? selectedVitamin.id : null} />
          </Box>
        </Box>
  
        {selectedVitamin && (
          <Box>
            <VitaminInfo vitaminInfo={selectedVitamin} />
          </Box>
        )}
  
        {!selectedVitamin && (
          <PopularItems />
          )
        }
      </>
    );
};

export default Home;
