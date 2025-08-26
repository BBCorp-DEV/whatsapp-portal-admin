import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const sections = [
  {
    title: '1. Introduction',
    content1:"By accessing or using our website, you consent to the practices described in this Policy.",
    content:
      'UhuruCare Insurance Ltd (“UhuruCare”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect,use, disclose, and safeguard your information when you use our website and services, in accordance with the Data Protection Act, 2012 (Act 843) of Ghana.',
  },
  {
    title: '2. Information We Collect',
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
      'For inquiries regarding these Terms and Conditions, contact:\nUhuruCare Ltd\n19 Kofi Annan St, Accra, Ghana\nEmail: info@uhurucare.com\nPhone: +233537587588',
  },
];


const privacyPolicySections = [
  {
    title: "1. Introduction",
    points: [
      "UhuruCare Insurance Ltd (“UhuruCare”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, in accordance with the Data Protection Act, 2012 (Act 843) of Ghana.",
      "By accessing or using our website, you consent to the practices described in this Policy."
    ]
  },
  {
    title: "2. Information We Collect",
    points: [
      "We collect and process different types of information, including :",
      "✦ Personal Information: Full name, address, date of birth, phone number, email address, national ID number or passport information.",
      "✦ Health Information: Medical history, treatment records, insurance details, claims data, and other information classified as 'special personal data' under Ghanaian law.",
      "✦ Technical Data: IP address, browser type, device information, and interaction with our website (collected through cookies and analytics tools)."
    ]
  },
  {
    title: "3. Legal Basis for Processing Your Data",
    points: [
      "We process your personal data based on",
      "✦ Your consent;",
      "✦ The need to perform a contract (such as providing insurance services);",
      "✦ Our legal obligations (e.g., regulatory compliance);",
      "✦ Legitimate interests (e.g., improving services and website security).",
      "For health data (special personal data), we process it with your explicit consent or as permitted under the Data Protection Act."
    ]
  },
  {
    title: "4. How We Use Your Information",
    points: [
      "We use your information to : ",
      "✦ Provide, manage, and administer health insurance services;",
      "✦ Communicate with you regarding your plan, benefits, claims, and support;",
      "✦ Process payments, claims, and reimbursements;",
      "✦ Maintain records for legal and regulatory compliance;",
      "✦ Improve our website, products, and services;",
      "✦ Protect against fraud, unauthorized access, or misuse."
    ]
  },
  {
    title: "5. Sharing of Your Information",
    points: [
      "We may share your information with",
      "✦ Healthcare Providers: To deliver medical care under your insurance plan.",
      "✦ Third-party Service Providers: Claims processors, IT providers, and payment processors under strict confidentiality agreements.",
      "✦ Regulatory Bodies: Such as the National Health Insurance Authority (NHIA) or the Data Protection Commission where legally required.",
      "✦ Legal or Public Authorities: If required to comply with legal obligations or to protect the rights, property, or safety of UhuruCare, our clients, or the public.",
      "We will never sell your personal data to third parties."
    ]
  },
  {
    title: "6. International Data Transfers",
    points: [
      "Where personal data is transferred outside Ghana, we ensure appropriate safeguards are in place, in accordance with Section 40 of the Data Protection Act."
    ]
  },
  {
    title: "7. Your Rights",
    points: [
      "Under Ghana’s Data Protection Act, you have the following rights",
      "✦ Right to Access: Request a copy of your personal data.",
      "✦ Right to Rectification: Request correction of inaccurate or incomplete data.",
      "✦ Right to Erasure: Request deletion of your data where permissible.",
      "✦ Right to Object: Object to certain types of data processing.",
      "✦ Right to Data Portability: Receive your personal data in a usable format.",
      "✦ Right to Lodge a Complaint: With the Ghana Data Protection Commission if you believe your data rights are infringed.",
      "To exercise any of these rights, contact us at [ info@uhurucare.com ]"
    ]
  },
  {
    title: "8. Data Security",
    points: [
      "We implement appropriate technical and organizational security measures to protect your data from unauthorized access, loss, or misuse, including",
      "✦ Encryption technologies;",
      "✦ Access controls and authentication;",
      "✦ Regular audits and staff training.",
      "However, no system is completely secure, and we cannot guarantee absolute security."
    ]
  },
  {
    title: "9. Retention of Data",
    points: [
      "We retain your personal data only as long as necessary to fulfill the purposes outlined in this Policy or as required by law or regulatory obligations."
    ]
  },
  {
    title: "10. Use of Cookies",
    points: [
      "Our website uses cookies and similar technologies to enhance your browsing experience.",
      "You can control or disable cookies through your browser settings."
    ]
  },
  {
    title: "11. Children's Privacy",
    points: [
      "Our services are intended for individuals aged 18 and older.",
      "We do not knowingly collect information from children under 18 without parental consent."
    ]
  },
  {
    title: "12. Changes to This Privacy Policy",
    points: [
      'We may update this Privacy Policy to reflect changes in our practices or legal requirements.',
      'Updates will be posted on this page with the "Effective Date" noted at the top.'
    ]
  },
  {
    title: "13. Contact Information",
    points: [
  
          'For inquiries regarding these Terms and Conditions, contact:\nUhuruCare Ltd\n14 Koi Street, Accra, Ghana\nEmail: info@uhurucare.com\nPhone: +233 0596993440,+233 0552335601,+233 0549833833',
      
    ]
  },
  
];



const Privacy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* <Typography variant="h6" gutterBottom fontWeight="400" textAlign="center">
        UhuruCare Ltd Website Terms and Conditions
      </Typography> */}
      {/* <Typography variant="subtitle1" color="text.secondary" paragraph textAlign="center">
        (Under Ghanaian Law)
      </Typography> */}
      {/* <Typography variant="body1" paragraph style={{color:"#4F5665"}}>
        These Terms and Conditions govern your use of this website (the “Site”) operated by UhuruCare Ltd
        (“UhuruCare,” “we,” “our,” or “us”). By accessing, viewing, or using the material on the Site, you acknowledge
        and agree that these Terms and Conditions constitute a legally binding agreement between you and UhuruCare. If
        you do not agree, you must discontinue use of the Site immediately.
      </Typography> */}

      {privacyPolicySections.map((section, index) => (
        <Box key={index} mb={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>

          {
            section?.points?.map((item,index)=>{
              return(
                <Typography variant="body1" style={{ whiteSpace: 'pre-line',color:"#4F5665",paddingTop:"10px" }} key={index}>
                  {item}
                </Typography>
              )
            })
          }
          {/* <Typography variant="body1" style={{ whiteSpace: 'pre-line',color:"#4F5665" }}>
            {section.content}
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line',color:"#4F5665",paddingTop:"10px" }}>
            {section.content1}
          </Typography> */}
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

export default Privacy;
