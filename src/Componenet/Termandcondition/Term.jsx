import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const sections = [
  {
    title: '1. Proprietary Rights',
    content:
      'All content on this Site, including text, images, logos, design, and layout, is the intellectual property of UhuruCare and is protected under Ghanaian copyright, trademark, and intellectual property laws. Any unauthorized reproduction, distribution, or modification of content is strictly prohibited.',
  },
  {
    title: '2. Communications With Our Website',
    content:
      'By submitting suggestions, feedback, or other materials to UhuruCare through this Site, you grant us a non-exclusive, royalty-free, perpetual, and irrevocable right to use, modify, publish, and distribute such content in any form. We reserve the right to monitor, remove, or edit any communications posted on the Site that violate these Terms and Conditions.',
  },
  {
    title: '3. No Medical Services or Advice',
    content:
      'The content on this Site is for informational purposes only and does not constitute medical advice. No doctor-patient relationship is created between UhuruCare and any user of this Site. Always seek professional medical advice from a licensed healthcare provider regarding any medical concerns.',
  },
  {
    title: '5. No Legal Advice',
    content:
      'Nothing on this Site should be construed as legal advice. If you require legal assistance, consult a qualified legal professional in Ghana.',
  },
  {
    title: '6. Confidentiality Cannot Be Guaranteed',
    content:
      'While we take steps to protect your data, the transmission of information via the internet is not entirely secure. UhuruCare cannot guarantee the confidentiality of information submitted through the Site. For sensitive matters, contact us through secure means.',
  },
  {
    title: '7. Privacy Statement',
    content:
      'Your use of this Site is also governed by our Privacy Policy, which details how we collect, store, and use your personal data in compliance with Ghana’s Data Protection Act, 2012 (Act 843).',
  },
  {
    title: '8. Disclaimer of Warranty and Liability',
    content:
      'This Site is provided "as is" without warranties of any kind, either express or implied. UhuruCare does not guarantee uninterrupted access to the Site or the accuracy of its content. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Site.',
  },
  {
    title: '9. Corrections and Changes',
    content:
      'We reserve the right to modify or remove any content on the Site without prior notice. Continued use of the Site after changes have been posted constitutes your acceptance of the revised Terms and Conditions.',
  },
  {
    title: '10. Indemnification',
    content:
      'You agree to indemnify and hold harmless UhuruCare, its affiliates, officers, employees, and agents from any claims, damages, liabilities, costs, and expenses arising from your violation of these Terms and Conditions or misuse of this Site.',
  },
  {
    title: '11. Links to Other Websites',
    content:
      'This Site may contain links to third-party websites. UhuruCare is not responsible for the content, privacy policies, or security of such websites. Accessing third-party links is at your own risk.',
  },
  {
    title: '12. User-Generated Content',
    content:
      'By submitting content (e.g., comments, reviews, testimonials) to the Site, you grant UhuruCare the right to use, reproduce, and distribute such content. You must not submit content that is defamatory, obscene, infringing on intellectual property rights, or violates any Ghanaian law. We reserve the right to remove or modify any user-generated content that violates these Terms.',
  },
  {
    title: '13. Copyright Policy',
    content:
      'UhuruCare respects intellectual property rights and complies with Ghana’s Copyright Act, 2005 (Act 690). If you believe content on this Site infringes on your copyright, notify us in writing with details of the alleged infringement.',
  },
  {
    title: '14. Use of the Internet',
    content:
      'Your use of the internet is at your own risk. UhuruCare is not responsible for service interruptions, cyber-attacks, or damages resulting from your use of the Site.',
  },
  {
    title: '15. Governing Law and Jurisdiction',
    content:
      'These Terms and Conditions are governed by the laws of Ghana. Any disputes arising from your use of the Site shall be resolved in the courts of Ghana.',
  },
  {
    title: '16. Contact Information',
    content:
      'For inquiries regarding these Terms and Conditions, contact:\nUhuruCare Ltd\n114 Koi Street, Accra, Ghana\nEmail: info@uhurucare.com\nPhone: +233 0596993440 | +233 0552335601 | +233 0549833833',
  },
];

const Term = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* <Typography variant="h6" gutterBottom fontWeight="400" textAlign="center">
        UhuruCare Ltd Website Terms and Conditions
      </Typography> */}
      {/* <Typography variant="subtitle1" color="text.secondary" paragraph textAlign="center">
        (Under Ghanaian Law)
      </Typography> */}
      <Typography variant="body1" paragraph style={{color:"#4F5665"}}>
        These Terms and Conditions govern your use of this website (the “Site”) operated by UhuruCare Ltd
        (“UhuruCare,” “we,” “our,” or “us”). By accessing, viewing, or using the material on the Site, you acknowledge
        and agree that these Terms and Conditions constitute a legally binding agreement between you and UhuruCare. If
        you do not agree, you must discontinue use of the Site immediately.
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line',color:"#4F5665" }}>
            {section.content}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 4 }} />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        By continuing to use this Site, you acknowledge that you have read and understood these Terms and Conditions and
        agree to be bound by them.
      </Typography>
    </Container>
  );
};

export default Term;
