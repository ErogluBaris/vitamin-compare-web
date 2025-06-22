import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";

type DropdownVitamin = {
    id: string;
    title: string;
};

const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
  };
};

interface SearchableDropdownProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ onSelect, selectedId }) => {
    const [options, setOptions] = useState<DropdownVitamin[]>([]);
    const [selectedVitamin, setSelectedVitamin] = useState<DropdownVitamin | null>(null);
    const [loading, setLoading] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  
    useEffect(() => {
      const fetchSelectedVitamin = async () => {
        if (!selectedId) {
          setSelectedVitamin(null);
          return;
        }
        setLoading(true);
        try {
          const response = await fetch(`${apiBaseUrl}/api/v1/vitamins/${selectedId}`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          const selectedItem = { id: data.id, title: data.title };
          setSelectedVitamin(selectedItem);
          onSelect(data.id);  // Bu satır opsiyonel, çünkü zaten selectedId geldi
        } catch (error) {
          console.error("Vitamin detayını alırken hata:", error);
          setSelectedVitamin(null);
        }
        setLoading(false);
      };
    
      fetchSelectedVitamin();
    }, [selectedId]);
    

    const handleSelect = (item: DropdownVitamin | null) => {
        if (item) {
            onSelect(item.id); // seçilen item'ın id'sini Home'a gönder
            setSelectedVitamin(item);
        }
      };

    // Backend'e istek atan fonksiyon
    const fetchVitamins = async (titleLikeText: string) => {
        if (titleLikeText == null) 
            return;
        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/v1/vitamins/get-dropdown?titleLikeText=${titleLikeText}`, {
                method: "GET",
                credentials: "include", // Eğer oturum bilgileri gerekiyorsa
            });
            const data = await response.json();
            setOptions(data.map((vitamin: any) => ({ title: vitamin.title, id: vitamin.id })));
        } catch (error) {
            console.error("Vitamin ararken hata oluştu:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVitamins('');
      }, []);

    // Kullanıcının yazdığı değeri belirli bir süre (300ms) bekleyip istek atacak şekilde optimize et
    const debouncedFetchVitamins = useCallback(debounce(fetchVitamins, 300), []);

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option?.title}
            loading={loading}
            value={selectedVitamin}
            onChange={(event, newValue) => handleSelect(newValue)}
            onInputChange={(event, newInputValue) => debouncedFetchVitamins(newInputValue)}
            onOpen={() => fetchVitamins('')}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Bir vitamin seç"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#4CAF50', // yeşil border
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4CAF50', // label rengi focus olunca
                      },
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default SearchableDropdown;
