import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

function verdictColor(verdict, theme) {
  if (!verdict) return theme.palette.text.secondary;
  if (verdict === 'OK') return theme.palette.success.main;
  if (verdict.includes('WRONG') || verdict.includes('FAILED')) return theme.palette.error.main;
  if (verdict.includes('ERROR')) return theme.palette.warning.main;
  if (verdict === 'TIME_LIMIT_EXCEEDED') return theme.palette.info.main;
  return theme.palette.text.secondary;
}

function SubmissionsTable({ submissions }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight={600} mb={2} color="primary.main">Recent Submissions</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme => theme.palette.background.paper }}>
              <TableCell sx={{ color: '#e0e0e0', bgcolor: theme => theme.palette.background.paper }}>When</TableCell>
              <TableCell sx={{ color: '#e0e0e0', bgcolor: theme => theme.palette.background.paper }}>Problem</TableCell>
              <TableCell sx={{ color: '#e0e0e0', bgcolor: theme => theme.palette.background.paper }}>Lang</TableCell>
              <TableCell sx={{ color: '#e0e0e0', bgcolor: theme => theme.palette.background.paper }}>Verdict</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map(sub => (
              <TableRow key={sub.id} sx={{ bgcolor: theme => theme.palette.background.default }}>
                <TableCell sx={{ color: theme => theme.palette.text.primary, bgcolor: theme => theme.palette.background.default }}>{new Date(sub.creationTimeSeconds * 1000).toLocaleString()}</TableCell>
                <TableCell sx={{ color: theme => theme.palette.text.primary, bgcolor: theme => theme.palette.background.default }}>{sub.problem.contestId ? `${sub.problem.contestId}${sub.problem.index}` : sub.problem.index} - {sub.problem.name}</TableCell>
                <TableCell sx={{ color: theme => theme.palette.text.primary, bgcolor: theme => theme.palette.background.default }}>{sub.programmingLanguage}</TableCell>
                <TableCell sx={{ fontWeight: 700, color: theme => verdictColor(sub.verdict, theme), bgcolor: theme => theme.palette.background.default }}>{sub.verdict || 'Pending'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default SubmissionsTable; 