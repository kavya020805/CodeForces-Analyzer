import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Paper, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2', '#0288d1', '#c2185b', '#ffa000', '#455a64', '#43a047', '#f57c00', '#5d4037'
];

function getTagCounts(submissions) {
  const tagCounts = {};
  submissions.forEach(sub => {
    if (sub.problem && Array.isArray(sub.problem.tags)) {
      sub.problem.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  return tagCounts;
}

function TagsPieChart({ submissions }) {
  const { labels, data, tagCounts } = useMemo(() => {
    const tagCounts = getTagCounts(submissions);
    const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([tag]) => tag);
    const data = sorted.map(([, count]) => count);
    return { labels, data, tagCounts };
  }, [submissions]);

  if (!labels.length) return null;

  // Cycle through COLORS if there are more tags than colors
  const backgroundColor = labels.map((_, i) => COLORS[i % COLORS.length]);

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight={600} mb={2} color="primary.main">Problem Tags Distribution</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 350, mx: 'auto' }}>
            <Pie
              data={{
                labels,
                datasets: [
                  {
                    data,
                    backgroundColor,
                    borderWidth: 1
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxHeight: 350, overflowY: 'auto', pr: 2 }}>
            <List dense>
              {labels.map((tag, i) => (
                <ListItem key={tag} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <FiberManualRecordIcon sx={{ color: backgroundColor[i], fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ fontWeight: 500 }}>{tag}</span>}
                  />
                  <Chip label={tagCounts[tag]} size="small" color="default" sx={{ fontWeight: 700, ml: 1 }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TagsPieChart; 