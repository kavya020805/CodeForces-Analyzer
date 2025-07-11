import React from 'react';
import UserForm from './components/UserForm';
import UserProfile from './components/UserProfile';
import RatingChart from './components/RatingChart';
import SubmissionsTable from './components/SubmissionsTable';
import SubmissionsHeatMap from './components/SubmissionsHeatMap';
import TagsPieChart from './components/TagsPieChart';
import axios from 'axios';
import { Container, Paper, Typography, Box, Alert } from '@mui/material';
import ThemeToggle from './components/ThemeToggle';

function App({ theme, toggleTheme }) {
  const [handle, setHandle] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const [ratingHistory, setRatingHistory] = React.useState([]);
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchData = async (userHandle) => {
    setLoading(true);
    setError('');
    setUserInfo(null);
    setRatingHistory([]);
    setSubmissions([]);
    try {
      const [infoRes, ratingRes, subRes] = await Promise.all([
        axios.get(`https://codeforces.com/api/user.info?handles=${userHandle}`),
        axios.get(`https://codeforces.com/api/user.rating?handle=${userHandle}`),
        axios.get(`https://codeforces.com/api/user.status?handle=${userHandle}&from=1&count=1000`)
      ]);
      setUserInfo(infoRes.data.result[0]);
      setRatingHistory(ratingRes.data.result);
      setSubmissions(subRes.data.result);
    } catch (err) {
      setError('Failed to fetch data. Please check the handle and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, bgcolor: theme === 'dark' ? '#181a1b' : '#f5f7fa', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: theme === 'dark' ? '#23272f' : '#f5f7fa', color: theme === 'dark' ? '#fff' : 'inherit' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h3" fontWeight={700} color={theme === 'dark' ? '#90caf9' : 'primary.main'}>
            Codeforces Analyzer
          </Typography>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </Box>
        <UserForm onSubmit={fetchData} loading={loading} />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {userInfo && <UserProfile user={userInfo} />}
        {ratingHistory.length > 0 && <RatingChart data={ratingHistory} />}
        {submissions.length > 0 && <SubmissionsHeatMap submissions={submissions} />}
        {submissions.length > 0 && <TagsPieChart submissions={submissions} />}
        {submissions.length > 0 && <SubmissionsTable submissions={submissions.slice(0, 10)} />}
      </Paper>
    </Container>
  );
}

export default App; 