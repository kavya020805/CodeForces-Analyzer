import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function UserForm({ onSubmit, loading }) {
  const [input, setInput] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} justifyContent="center" mb={4}>
      <TextField
        label="Codeforces Handle"
        variant="outlined"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
        size="medium"
        sx={{ 
          minWidth: 220, 
          '& .MuiInputBase-input': { color: theme => theme.palette.text.primary },
          '& .MuiInputLabel-root': { color: theme => theme.palette.text.primary },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme => theme.palette.text.primary },
            '&:hover fieldset': { borderColor: theme => theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: theme => theme.palette.primary.main },
          },
        }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading} size="large">
        {loading ? 'Loading...' : 'Analyze'}
      </Button>
    </Box>
  );
}

export default UserForm; 