import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, Grid, Chip, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';

// Codeforces color mapping for rating and rank
const cfColors = {
  newbie: '#808080',
  pupil: '#008000',
  specialist: '#03a89e',
  expert: '#0000ff',
  candidateMaster: '#aa00aa',
  master: '#ff8c00',
  internationalMaster: '#ff8c00',
  grandmaster: '#ff0000',
  internationalGrandmaster: '#ff0000',
  legendaryGrandmaster: '#ff0000',
};

function getRankColor(rank) {
  if (!rank) return '#bdbdbd';
  const r = rank.toLowerCase();
  if (r.includes('legendary grandmaster')) return cfColors.legendaryGrandmaster;
  if (r.includes('international grandmaster')) return cfColors.internationalGrandmaster;
  if (r.includes('grandmaster')) return cfColors.grandmaster;
  if (r.includes('international master')) return cfColors.internationalMaster;
  if (r.includes('master')) return cfColors.master;
  if (r.includes('candidate master')) return cfColors.candidateMaster;
  if (r.includes('expert')) return cfColors.expert;
  if (r.includes('specialist')) return cfColors.specialist;
  if (r.includes('pupil')) return cfColors.pupil;
  if (r.includes('newbie')) return cfColors.newbie;
  return '#bdbdbd';
}

function getRatingColor(rating) {
  if (typeof rating !== 'number') return '#bdbdbd';
  if (rating >= 3000) return cfColors.legendaryGrandmaster;
  if (rating >= 2600) return cfColors.internationalGrandmaster;
  if (rating >= 2400) return cfColors.grandmaster;
  if (rating >= 2300) return cfColors.internationalMaster;
  if (rating >= 2100) return cfColors.master;
  if (rating >= 1900) return cfColors.candidateMaster;
  if (rating >= 1600) return cfColors.expert;
  if (rating >= 1400) return cfColors.specialist;
  if (rating >= 1200) return cfColors.pupil;
  return cfColors.newbie;
}

function UserProfile({ user }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4,
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
        background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
        minHeight: 180
      }}
    >
      <Avatar
        src={user.avatar}
        alt="avatar"
        sx={{
          width: 110,
          height: 110,
          mr: 4,
          border: '4px solid',
          borderColor: 'primary.main',
          boxShadow: 2
        }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          {user.handle}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Tooltip title="Rank"><EmojiEventsIcon color="warning" /></Tooltip>
              <Typography variant="subtitle1" color="text.secondary">Rank:</Typography>
              <Chip label={user.rank} size="small" sx={{ fontWeight: 700, textTransform: 'capitalize', bgcolor: getRankColor(user.rank), color: '#fff' }} />
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Tooltip title="Rating"><StarIcon color="primary" /></Tooltip>
              <Typography variant="subtitle1" color="text.secondary">Rating:</Typography>
              <Chip label={user.rating ?? 'Unrated'} size="small" sx={{ fontWeight: 700, bgcolor: getRatingColor(user.rating), color: '#fff' }} />
            </Box>
            {user.maxRank && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Tooltip title="Max Rank"><EmojiEventsIcon color="success" /></Tooltip>
                <Typography variant="body2">Max Rank:</Typography>
                <Chip label={user.maxRank} size="small" sx={{ fontWeight: 700, textTransform: 'capitalize', bgcolor: getRankColor(user.maxRank), color: '#fff' }} />
              </Box>
            )}
            {user.maxRating && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Tooltip title="Max Rating"><StarIcon color="secondary" /></Tooltip>
                <Typography variant="body2">Max Rating:</Typography>
                <Chip label={user.maxRating} size="small" sx={{ fontWeight: 700, bgcolor: getRatingColor(user.maxRating), color: '#fff' }} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {user.country && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Tooltip title="Country"><PublicIcon color="info" /></Tooltip>
                <Typography variant="body2">{user.country}</Typography>
              </Box>
            )}
            {user.city && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="body2">City:</Typography>
                <Chip label={user.city} size="small" />
              </Box>
            )}
            {user.organization && (
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Tooltip title="Organization"><BusinessIcon color="action" /></Tooltip>
                <Typography variant="body2">{user.organization}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserProfile; 