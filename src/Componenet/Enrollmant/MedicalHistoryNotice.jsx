import React from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';

const MedicalHistoryNotice = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box elevation={3} mt={4}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Medical History Disclaimer & Privacy Notice
        </Typography>

        <Box mt={3}>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            Why We Collect Your Medical History?
          </Typography>
          <Typography variant="body1" paragraph>
            Your medical history helps us to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                Improve healthcare services by providing better care coordination.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Ensure appropriate coverage based on individual health needs.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Enhance risk assessment for policy management and claims processing.
              </Typography>
            </li>
          </ul>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            Why We Collect Your Contact Information?
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                To send policy-related updates, premium reminders, and healthcare notifications.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                To provide seamless customer support and emergency contact options.
              </Typography>
            </li>
          </ul>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            How Your Information is Used?
          </Typography>
          <Typography variant="body2" paragraph>
            Your personal and medical history is strictly confidential and used only for policy administration and healthcare coordination.
          </Typography>
          <Typography variant="body2" paragraph>
            We do not share or sell your data.
          </Typography>
          <Typography variant="body2">
            Your data is securely stored in compliance with Ghanaian and international data protection laws.
          </Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            Your Rights & Consent
          </Typography>
          <Typography variant="body2" paragraph>
            You can access, update, or correct your information at any time.
          </Typography>
          <Typography variant="body2" paragraph>
            By submitting your details, you consent to Uhurucare using this information for policy administration.
          </Typography>
          <Typography variant="body2">
            You may request data deletion, subject to legal or regulatory requirements.
          </Typography>
        </Box>
      </Box>
  );
};

export default MedicalHistoryNotice;
