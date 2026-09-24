import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormHelperText,
  CircularProgress,
  Snackbar,
} from "@mui/material";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// add Mutation for creating a new song
const AddSong = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default function AdvancedMuiForm() {
  // 1. Unified state for all field types
  const [formData, setFormData] = useState({
    title: "",
  });
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const handleClose = () => {
    setOpen(false);
    setNotification("");
  };
  const action = (
    <Button color="primary" size="small" onClick={handleClose}>
      <CloseIcon />
    </Button>
  );

  // 2. State for validation errors
  const [errors, setErrors] = useState({});
  const [addSong, { loading, error }] = useMutation(AddSong, {
    onCompleted: (data) => {
      console.log("Song created successfully:", data);
      setOpen(true);
      setNotification("Song created successfully");
      setTimeout(() => setOpen(false), 6000); // Automatically close the Snackbar after 6 seconds
      // Reset the form input on success
      setFormData({ title: "" });
    },
    onError: (err) => {
      console.error("Mutation error occurred:", err);
      setOpen(true);
      setNotification("Mutation error occurred: " + err.message);
      setTimeout(() => setOpen(false), 6000); // Automatically close the Snackbar after 6 seconds
      // Optionally, set a global error state here if needed
      setErrors((prevErrors) => ({ ...prevErrors, global: err.message }));
    },
  });

  // 3. Centralised change handler for text, radios, AND checkboxes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      // If it's a checkbox, store the 'checked' boolean; otherwise, store the text 'value'
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when the user modifies it
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // 4. Form submission logic
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation check before sending data
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    // if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission
    }

    console.log("Final Form Data:", formData);
    // Send to backend/API here
    addSong({ variables: { title: formData.title } });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3, // Comfortable spacing between FormControls
        maxWidth: 450,
        margin: "auto",
        mt: 4,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notification}
        action={action}
      />
      <Typography variant="h5" textAlign="center" fontWeight="bold">
        Create New Song
      </Typography>

      {/* Text Field - High-level wrapper (built-in FormControl) */}
      <TextField
        label="Song Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        fullWidth
        required
        disabled={loading} // Disable field while loading
      />

      {/* Radio Buttons using FormControl */}
      {/* <FormControl component="fieldset">
        <FormLabel id="plan-radio-group-label" sx={{ fontWeight: "500", mb: 0.5 }}>
          Subscription Plan
        </FormLabel>
        <RadioGroup
          aria-labelledby="plan-radio-group-label"
          name="subscriptionPlan"
          value={formData.subscriptionPlan}
          onChange={handleChange}
          row // Displays radios horizontally side-by-side
        >
          <FormControlLabel value="free" control={<Radio />} label="Free" />
          <FormControlLabel value="premium" control={<Radio />} label="Premium" />
          <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise" />
        </RadioGroup>
      </FormControl> */}

      {/* Checkboxes grouped inside a FormControl */}
      {/* <FormControl component="fieldset" error={!!errors.termsAccepted}>
        <FormLabel component="legend" sx={{ fontWeight: "500", mb: 0.5 }}>
          Preferences & Legal
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="marketingEmails" checked={formData.marketingEmails} onChange={handleChange} />}
            label="Receive weekly marketing emails"
          />

          <FormControlLabel
            control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} color="primary" />}
            label="I accept the terms and conditions *"
          />
        </FormGroup>
        {errors.termsAccepted && <FormHelperText>{errors.termsAccepted}</FormHelperText>}
      </FormControl> */}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 1 }}
        disabled={loading} // Prevent double submissions
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
      </Button>
    </Box>
  );
}
