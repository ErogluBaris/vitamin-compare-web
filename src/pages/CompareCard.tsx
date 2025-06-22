import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CompareCardData from '../data/CompareCardData';
import VitaminContentResult from '../data/VitaminContentResult';
import ContentRow from '../data/CompareCardData';

type CompareCardProps = {
    title: string;
    contentRow: ContentRow[];
}

const CompareCard: React.FC<CompareCardProps> = ({ title, contentRow }) => {
    const getColor = (result: VitaminContentResult): string => {
        switch (result) {
          case VitaminContentResult.BETTER:
            return '#4caf50'; // yeşil
          case VitaminContentResult.WORSE:
            return '#f44336'; // kırmızı
          case VitaminContentResult.EQUAL:
          default:
            return '#9e9e9e'; // gri
        }
      };

    return (
        <>
        <Typography variant='h6' gutterBottom>
            {title}
        </Typography>
        {[0, 1].map((index) => (
            <Card variant="outlined" sx={{ maxWidth: 400, m: 2 }}>
                
            </Card>
          ))};
        </>
        
    );
  };

export default CompareCard;
