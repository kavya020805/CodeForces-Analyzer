import React, { useMemo, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { format, fromUnixTime, getYear, startOfYear, endOfYear } from 'date-fns';

function getDateCounts(submissions) {
  const counts = {};
  submissions.forEach(sub => {
    const date = format(fromUnixTime(sub.creationTimeSeconds), 'yyyy-MM-dd');
    counts[date] = (counts[date] || 0) + 1;
  });
  return counts;
}

function getHeatmapValues(submissions, startDate, endDate) {
  const counts = getDateCounts(submissions);
  const values = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = format(current, 'yyyy-MM-dd');
    values.push({ date: dateStr, count: counts[dateStr] || 0 });
    current.setDate(current.getDate() + 1);
  }
  return values;
}

const colorScale = [
  '#e0e0e0', // 0
  '#b3e5fc', // 1
  '#4fc3f7', // 2
  '#0288d1', // 3
  '#01579b', // 4+
];

function getClassForValue(value) {
  if (!value || value.count === 0) return 'color-empty';
  if (value.count >= 4) return 'color-scale-4';
  if (value.count === 3) return 'color-scale-3';
  if (value.count === 2) return 'color-scale-2';
  if (value.count === 1) return 'color-scale-1';
  return 'color-empty';
}

function SubmissionsHeatMap({ submissions }) {
  const years = useMemo(() => {
    if (!submissions || submissions.length === 0) return [];
    const yearsSet = new Set(submissions.map(s => getYear(fromUnixTime(s.creationTimeSeconds))));
    return Array.from(yearsSet).sort((a, b) => b - a); // Descending order
  }, [submissions]);

  const [selectedYear, setSelectedYear] = useState(years[0] || new Date().getFullYear());

  React.useEffect(() => {
    if (years.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  if (!submissions || submissions.length === 0) return null;

  const startDate = startOfYear(new Date(selectedYear, 0, 1));
  const endDate = endOfYear(new Date(selectedYear, 0, 1));
  const values = getHeatmapValues(
    submissions.filter(s => getYear(fromUnixTime(s.creationTimeSeconds)) === selectedYear),
    startDate,
    endDate
  );

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600} color="primary.main">
          Submissions HeatMap ({selectedYear})
        </Typography>
        {years.length > 1 && (
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Year"
              onChange={e => setSelectedYear(Number(e.target.value))}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={getClassForValue}
          showWeekdayLabels={true}
          tooltipDataAttrs={value => {
            if (!value || !value.date) return null;
            return {
              'data-tip': `${value.date}: ${value.count} submission${value.count === 1 ? '' : 's'}`
            };
          }}
        />
      </Box>
      <style>{`
        .color-empty { fill: ${colorScale[0]}; }
        .color-scale-1 { fill: ${colorScale[1]}; }
        .color-scale-2 { fill: ${colorScale[2]}; }
        .color-scale-3 { fill: ${colorScale[3]}; }
        .color-scale-4 { fill: ${colorScale[4]}; }
      `}</style>
    </Paper>
  );
}

export default SubmissionsHeatMap; 