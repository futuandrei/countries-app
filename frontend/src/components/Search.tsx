import { TextField, Box } from "@mui/material";

interface SearchProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchQuery, onSearchChange }: SearchProps) => {
  // Destructurint the props (above)
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        label="Search Countries"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={onSearchChange}
      />
    </Box>
  );
};

export default Search;
