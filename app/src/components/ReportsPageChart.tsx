import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const getRandomData = (min: number, max: number, length: number) => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
};
const getCategoriesNames = (categoriesNumber: number) => {
  const categoriesNames = [
    'Category A',
    'Category B',
    'Category C',
    'Category D',
    'Category E',
    'Category F',
  ];
  return Array.from(
    { length: categoriesNumber },
    (_, index) => categoriesNames[index % categoriesNames.length],
  );
};

export default function ReportsPageChart() {
  const categoriesNumber = Math.floor(Math.random() * 4) + 3;

  const categories = getCategoriesNames(categoriesNumber);
  const seriesData = Array.from({ length: 3 }, () =>
    getRandomData(1, 10, categoriesNumber),
  );

  return (
    <Box style={{ width: '100%' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: categories }]}
        series={seriesData.map((data) => ({ data }))}
        height={500}
      />
    </Box>
  );
}
