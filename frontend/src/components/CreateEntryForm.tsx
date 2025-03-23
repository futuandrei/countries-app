import { useState } from "react";
import { supabase } from "../config/supabase";
import { Alert, Box, Button, TextField } from "@mui/material";

interface CreateEntryFormProps {
  onSuccess: () => void;
}

export const CreateEntryForm = ({ onSuccess }: CreateEntryFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null); // setting error to null just in case
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Checking API response
    try {
      const { error } = await supabase
        .from("protected_data")
        .insert([{ name, description, is_active: true }]).select();

      if (error) throw error;
      // Checking for other errors
    } catch (err) {
      const error = err as { message: string; code?: string };
      let errorMessage = error.message;
      if (error.code === "42501") {
        errorMessage =
          "Authentication error: Please try logging out and back in again";
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);

      // setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mb: 4,
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};
