import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchableDropdown from '../components/SearchableDropDown';
import { VitaminContent } from '../data/Vitamin';
import VitaminInfo from '../components/VitaminInfo';
import PopularItems from '../components/PopularItems';


const Home: React.FC = () => {
    const [selectedVitamin, setSelectedVitamin] = useState<VitaminContent | any>(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleDropdownSelect = async (id: string) => {
        try {
          const response = await fetch(`${apiBaseUrl}/api/v1/vitamins/` + id, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          setSelectedVitamin(data);
          console.log(data);
        } catch (error) {
          console.error("Vitamin ararken hata oluştu:", error);
        }
    }

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
