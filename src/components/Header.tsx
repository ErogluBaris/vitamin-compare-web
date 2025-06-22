import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', width:'100%' }}>
      <Toolbar sx={{display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    px: 2,
                    py: 1,
                    gap: 1
                    }}>
        {/* Orta: Başlık */}
        <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  minWidth: 0,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                  }}>
          <Button onClick={() => navigate('/')}
           sx= {{
              minWidth: 'auto', p: 0
            }}>
            <img src="../img/vitamin_compare_logo.svg" alt="icon" style={{ height: 40, width: 'auto' }}/>
          </Button>
          
          <Button onClick={() => navigate('/')}
            sx= {{
              minWidth: 0,
              p: 0,
              textTransform: 'none',
              overflow: 'hidden',
            }}>
            <Typography variant="h6" component="div" fontFamily="'Open Sans', sans-serif"
              sx={{
                color: '#757575',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
              VİTAMİN KARŞILAŞTIRMA
            </Typography>
          </Button>
        </Box>
        
        {/* Sağ taraf: Buton, kullanıcı vs. */}
        <Box>
          <Button 
          variant='outlined'
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.875rem' },
            color: 'inherit',
            paddingX: 1.5,
            paddingY: 0.5,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            backgroundColor: '#FF9800',
            borderColor: '#FF9800',
            '&:hover': {
              color: 'inherit',
              backgroundColor: '#D88100',
              borderColor: '#D88100'
            }
          }}
          onClick={() => navigate('/compare')}>
            Karşılaştır
          </Button>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
