import React from 'react';
import { VitaminInfoData } from '../data/Vitamin';
import { Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface VitaminInfoProps {
    vitaminInfo: VitaminInfoData;
}

const VitaminInfo: React.FC<VitaminInfoProps> = ({ vitaminInfo }) => {

  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate(`/compare?first=${vitaminInfo.id}`);
  }

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 5, px: 2 }}>
          <Grid container spacing={4}>
            {/* Sol Kısım: Görsel, Başlık, Link */}
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" align="center" gutterBottom noWrap>
                  {vitaminInfo.title}
                </Typography>
                <Box
                  component="img"
                  src={vitaminInfo.imgUrl}
                  sx={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', my: 2 }}
                />
                <Link href={vitaminInfo.url} target="_blank" rel="noopener noreferrer" color='#FFD54F'>
                  Daha fazla bilgi
                </Link>
                <Button onClick={handleCompareClick}
                  variant="outlined"
                  sx={{
                    mt: '20px',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    textTransform: 'none',
                    borderWidth: 2,
                    color: '#4CAF50', // yeşil
                    borderColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#4CAF50',   // aynı renge geçiyor
                        color: '#fff',                // metin beyaz olsun
                        borderColor: '#4CAF50',       // daha koyu sınır
                    },
                  }}
                  >
                  Karşılaştır
                </Button>
              </Box>
            </Grid>

            <Grid md={1}>

            </Grid>
    
            {/* Sağ Kısım: İçerikler */}
            <Grid item xs={12} md={7}>
              {/* Vitamin İçeriği */}
              {vitaminInfo.vitaminContent?.length > 0 && (
                <Box mb={4}>
                  <Typography variant="h6" align='center' gutterBottom>
                    Vitamin İçeriği
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableBody>
                        {vitaminInfo.vitaminContent.map((content, index) => (
                          <TableRow key={index}>
                            <TableCell>{content.name}</TableCell>
                            <TableCell align="right">{content.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
    
              {/* Mineral İçeriği */}
              {vitaminInfo.mineralContent?.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Mineral İçeriği
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableBody>
                        {vitaminInfo.mineralContent.map((content, index) => (
                          <TableRow key={index}>
                            <TableCell>{content.name}</TableCell>
                            <TableCell align="right">{content.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      );
    };

export default VitaminInfo;
