import React, { useEffect, useState } from 'react';
import SearchableDropdown from '../components/SearchableDropDown';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PopularItems from '../components/PopularItems';

export default function Compare() {
  const [firstSelectedId, setFirstSelectedId] = useState<string | null>(null);
  const [secondSelectedId, setSecondSelectedId] = useState<string | null>(null);
  const [compareResult, setCompareResult] = useState<any | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleFirstSelect = (id: string) => setFirstSelectedId(id);
  const handleSecondSelect = (id: string) => setSecondSelectedId(id);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const first = searchParams.get('first');
    if (first) {
      setFirstSelectedId(first);
    }

    const second = searchParams.get('second');
    if (second) {
      setSecondSelectedId(second);
    }

    if (first && second && first !== second) {    
      fetchCompare(first, second);
    }
  }, [searchParams]);

  const compareItems = async () => {
    if (!firstSelectedId || !secondSelectedId) {
      alert('Lütfen iki ürün seçin');
      return;
    }

    if (firstSelectedId === secondSelectedId) return;

    // URL'yi güncelle
    navigate(`?first=${firstSelectedId}&second=${secondSelectedId}`);

    await fetchCompare(firstSelectedId, secondSelectedId);
  };

  const fetchCompare = async (firstId: string, secondId: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/vitamin-compare/compare`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstId, secondId }),
      });
      const data = await response.json();
      setCompareResult(data);
    } catch (error) {
      console.error('Vitamin karşılaştırırken hata oluştu:', error);
    }
  };

  const getCompareIcon = (type: string) => {
    switch (type) {
      case 'BETTER':
        return <CheckCircleIcon color="success" fontSize="small" sx={{ ml: 1 }} />;
      default:
        return <Box sx={{ width: 20 }} />; // boş yer tutucu
    }
  };

  const checkSelectedElementsEqual = () => {
    if (firstSelectedId == null || secondSelectedId == null) {
      return false;
    }

    return firstSelectedId === secondSelectedId;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={3}><SearchableDropdown onSelect={handleFirstSelect} selectedId={firstSelectedId}/></Grid>
        <Grid item xs={12} md={3}><SearchableDropdown onSelect={handleSecondSelect} selectedId={secondSelectedId}/></Grid>
      </Grid>

      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Button
          variant="contained"
          onClick={compareItems}
          sx={{ backgroundColor: '#31af27' }}
          endIcon={<CompareArrowsIcon />}
          disabled={checkSelectedElementsEqual()}
        >
          Karşılaştır
        </Button>
        {
          checkSelectedElementsEqual() && (
          <Typography color='error' sx={{
            fontSize: '0.85rem',
            py: 0.5,
            px: 1.5,
            maxWidth: 300,
            textAlign: 'center',
          }}>
            *Lütfen farklı iki ürün seçin.
          </Typography>
          )
        }
        
      </Box>

      {!compareResult && (
        <PopularItems />
        )
      }

      {compareResult && (
        <>
          {/* Ürün başlıkları */}
          <Grid container spacing={2} justifyContent="center">
            {compareResult.compareHeaders.map((product: any, index: number) => (
              <Grid item xs={6} md={4} key={index}>
                <Box display="flex" flexDirection="column" alignItems="center" minHeight={250}>
                  <Typography noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>{product.name}</Typography>
                  <Box component="img" src={product.imgUrl} sx={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
                  <Link href={product.url} target="_blank" rel="noopener noreferrer">Daha fazla bilgi</Link>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Karşılaştırma içerikleri */}
          <Box mt={6}>
            {compareResult.compareResults.filter((group: any) => group.compareRows.length > 0).map((group: any) => (
              <Box key={group.title} mb={5}>
                <Typography align="center" variant="h6" gutterBottom>{group.title}</Typography>
                {group.compareRows.map((row: any, index: number) => (
                  <Grid container alignItems="center" key={index} sx={{ py: 2, borderBottom: '1px solid #ddd' }}>
                    <Grid item xs={12} md={2}>
                      <Typography align="center">
                        {row.contentName}
                      </Typography>
                    </Grid>

                    {/* Ürün 1 */}
                    <Grid item xs={6} md={4}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography sx={{ textAlign: 'right', minWidth: 70 }}>{row.elements[0]?.amount || '-'}</Typography>
                        {getCompareIcon(row.elements[0]?.compareEnum)}
                      </Box>
                    </Grid>

                    {/* Ürün 2 */}
                    <Grid item xs={6} md={4}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography sx={{ textAlign: 'right', minWidth: 70 }}>{row.elements[1]?.amount || '-'}</Typography>
                        {getCompareIcon(row.elements[1]?.compareEnum)}
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
