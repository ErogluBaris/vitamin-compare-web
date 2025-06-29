import React, { useEffect, useState } from 'react';
import { VitaminContent, VitaminInfoData } from '../data/Vitamin';
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Link, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../context/CustomFetch';

const PopularItems = () => {

    const [popularItems, setPopularItems] = useState<VitaminContent | any>(null);

    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchPopularItems();
      }, []);

      const handleCompareClick = (id: string) => {
        navigate(`/compare?first=${id}`);
      }

      const handleInfoClick = (id: string) => {
        navigate(`/?id=${id}`);
      }
  
      const fetchPopularItems = async () => {
        try {
          const response = await customFetch(`${apiBaseUrl}/api/v1/vitamins/get-popular`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          setPopularItems(response);
        } catch (error) {
          console.error("Populer vitaminleri ararken hata oluştu:", error);
        }
      }

      // Dinamik kolon genişliği, 1-12 arasında, min 3 kolona bölüyoruz ki kartlar çok geniş olmasın.
        const getColWidth = () => {
            if (!popularItems) return 12;
            const count = popularItems.length;
            if (count >= 4) return 3; // 4 veya daha fazla için 3 kolon (12/3=4 item)
            if (count === 3) return 4; // 3 item için 4 kolon (12/4=3 item)
            if (count === 2) return 6; // 2 item için 6 kolon (12/6=2 item)
            if (count === 1) return 12; // 1 item tam genişlik
            return 12;
        };
    
        const colWidth = getColWidth();

    return (
        <>
            {
                popularItems && 
                <Box sx={{ mt: 6, width: '90%', mx: 'auto' }}>
                {/* Başlık */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.5rem' },
                    }}
                  >
                    Popüler Ürünler
                  </Typography>
                </Box>
              
                {/* Ürünler */}
                <Grid container spacing={2} justifyContent="center">
                  {popularItems.map((vitamin: VitaminInfoData) => (
                    <Grid
                      item
                      key={vitamin.id}
                      xs={12}
                      sm={6}
                      md={colWidth}
                      lg={colWidth}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Card
                        sx={{
                          maxWidth: { xs: 260, sm: 300 },
                          width: '100%',
                          position: 'relative',
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handleInfoClick(vitamin.id)}
                      >
                        <IconButton
                          aria-label="karşılaştır"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: '#fff',
                            color: '#31af27',
                            '&:hover': {
                              backgroundColor: '#f0f0f0',
                            },
                            boxShadow: 1,
                            width: 36,
                            height: 36,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompareClick(vitamin.id)}
                          }
                        >
                          <CompareArrowsIcon fontSize="small" />
                        </IconButton>
              
                        <CardMedia
                          component="img"
                          image={vitamin.imgUrl}
                          alt={vitamin.title}
                          sx={{
                            height: { xs: 120, sm: 150 },
                            objectFit: 'contain',
                          }}
                        />
              
                        <CardContent sx={{ px: 2, py: 1 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                            }}
                          >
                            {vitamin.title}
                          </Typography>
              
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: '0.7rem', sm: '0.8rem' },
                            }}
                          >
                            <Link
                              href={vitamin.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              color="#FFD54F"
                            >
                              Daha fazla bilgi
                            </Link>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
            }
        </>
    );
}

export default PopularItems;