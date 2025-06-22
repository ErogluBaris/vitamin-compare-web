import { Box, Grid, Typography, Chip } from '@mui/material';


type CompareElement = {
  amount: string;
  compareEnum: 'BETTER' | 'WORSE' | 'EQUAL';
};

type CompareRow = {
  contentName: string;
  elements: [CompareElement, CompareElement]; // iki ürün karşılaştırılıyor
};

type CompareSection = {
  title: string;
  compareRows: CompareRow[];
};

type CompareTableProps = {
  section: CompareSection;
};

const getIndicator = (compareEnum: string) => {
    switch (compareEnum) {
      case 'BETTER':
        return '🔼';
      case 'WORSE':
        return '🔽';
      case 'EQUAL':
      default:
        return '➖';
    }
  };

const CompareTable: React.FC<CompareTableProps> = ({ section }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {section.title}
      </Typography>
      {section.compareRows.map((row, idx) => (
        <Grid container key={idx} spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={4}>
            <Typography>{row.contentName}</Typography>
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center" gap={1}>
            <Typography>{row.elements[0].amount}</Typography>
            {getIndicator(row.elements[0].compareEnum)}
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center" gap={1}>
            <Typography>{row.elements[1].amount}</Typography>
            {getIndicator(row.elements[1].compareEnum)}
          </Grid>
        </Grid>
      ))}
      {section.compareRows.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Karşılaştırılacak veri yok.
        </Typography>
      )}
    </Box>
  );
};

export default CompareTable;
