import React, { useContext, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Checkbox,
    FormControlLabel,
    CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MdDoneOutline } from "react-icons/md";

import axios from 'axios';
import { AuthContext } from '../../Auth/context/Auth';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDone } from "react-icons/md";

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { cancellationData, exclusions, policyExclusions, waitingPeriodData } from '../../lib/constant';
import ApiConfig from '../../Auth/ApiConfig';
import toast from 'react-hot-toast';
const IncludedItem = ({ text }) => (
    <ListItem gutterBottom>
        <ListItemIcon sx={{ minWidth: 20 }}>
            <MdDoneOutline color="text.secondary" fontSize='18px' />
        </ListItemIcon>
        <ListItemText primary={text} sx={{ fontSize: '12px',paddingLeft:'5px' }} />
    </ListItem>
);


const SectionTitle = ({ icon, text, sxProp = {} }) => (
    <Box display="flex" alignItems="center" mt={4} mb={2} sx={{ ...sxProp }}>
        {icon}
        <Typography variant="h6" ml={1}>{text}</Typography>
    </Box>
);


export default function PaymentConfirmationPage() {
    const navigate = useNavigate();
    const { enrollment, checkLogin, getProfileData, setIsLogin } = useContext(AuthContext);
    console.log("enrollment", enrollment);
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckboxChange = (event) => {
        setAgreed(event.target.checked);
    };


    // Add this inside your component
    const handleSubmit = async () => {
        const { first_name, last_name, ...data } = enrollment;
        const payload = { ...data };

        setIsLoading(true)
        try {
            const response = await axios.post(ApiConfig.enrollment, payload);
            console.log('Enrollment successful:', response.data);
            if (response?.data?.success === true) {
                console.log("sdgsdagsadfgsadfgs", response);
                window.location.href = response?.data?.data?.authorization_url; // Redirect to the Paystack authorization page


            }
            // Optionally route to next page or show success message here
        } catch (error) {
            toast.error(error?.response.data.message);
            console.error('Enrollment failed:', error);
            // Handle error feedback for user
        } finally {
            setIsLoading(false)
        }
    };

    const renderList = (items) => {
        return (
            <List dense>
                {items.map((item, index) => (
                    Array.isArray(item) ? (
                        item.map((subItem, subIndex) => (
                            <ListItem key={`${index}-${subIndex}`} sx={{ pl: 4, color: '#898A8B', fontSize: '12px' }}>
                                <ListItemText primary={`• ${subItem}`} />
                            </ListItem>
                        ))
                    ) : (
                        <ListItem key={index}>
                            <ListItemText primary={`▪ ${item}`} sx={{ color: '#898A8B' }} />
                        </ListItem>
                    )
                ))}
            </List>
        );
    };




    return (
        <Box>
            <Box sx={{ bgcolor: "#0077cc", p: 4 }}>
                <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
                    UhuruCare Plan Enrollment
                </Typography>
            </Box>


            <Container maxWidth="lg" >
                <Box
                    sx={{
                        bgcolor: "#f8f8f8",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        border: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        p: 2,
                        px: 4,
                        maxWidth: 1300,
                        margin: "auto",
                        mt: 4,
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: "600", fontSize: "25px" }}>
                        Step 4: Payment & Confirmation
                    </Typography>
                </Box>

                <Box

                    sx={{
                        bgcolor: "#fff",
                        borderRadius: "0 0 8px 8px",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        p: 4,
                        maxWidth: 1300,
                        margin: "auto",
                        marginBottom: "30px",
                    }}
                >


                    <SectionTitle icon={<InfoIcon color="primary" />} text="What’s Included?" sxProp={{ marginTop: 0 }} />
                    <List>
                        <IncludedItem text=" Inpatient Care (Hospitalization & Surgeries)" />
                        <IncludedItem text="Emergency Medical Services (Ambulance & Urgent Care)" />
                        <IncludedItem text="Outpatient Care (Doctor Visits, Tests & Medications)" />
                        <IncludedItem text="Telemedicine Services (Annual Physicals & Wellness Consultations)" />
                        <IncludedItem text="Access to a network of quality healthcare providers" />
                    </List>

                    {/* <Typography variant="body2" color="text.secondary" mt={1}>
                        📌 Pre-approval may be required for certain services.
                    </Typography> */}

                    {/* <SectionTitle icon={<AccessTimeIcon color="action" />} text="Waiting Periods" />
                    <List>
                        <IncludedItem text="General Care: 30-day waiting period (except emergencies)" />
                        <IncludedItem text="Pre-existing Conditions: 6-month waiting period" />
                        <IncludedItem text="Maternity Care: 9-month waiting period (if applicable)" />
                        <IncludedItem text="Specialist Treatments & Surgeries: 90-day waiting period" />
                        <IncludedItem text="🚑 Accidents & Emergencies are covered immediately!" />
                    </List> */}

                    <SectionTitle icon={<LocalHospitalIcon color="error" />} text="Important Notes" />
                    <List>
                        <IncludedItem text="Your total coverage is distributed across inpatient, outpatient, and emergency services." />
                        <IncludedItem text="Coverage applies only to partnered healthcare facilities" />
                        <IncludedItem text="Some treatments and medications may require pre-approval before use" />
                        <IncludedItem text="Some treatments and medications may require pre-approval before use" />
                        <IncludedItem text="Certain treatments and medications may require pre-approval." />
                        <IncludedItem text="Full terms and conditions apply—View Policy Details" />
                    </List>

                    {/* <Box mt={2} display="flex" alignItems="center">
                        <Typography variant="body1" ml={1}>
                            📞 Need more details? Contact us or check our full policy terms.
                        </Typography>
                    </Box> */}

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" gutterBottom>
                        UHURUCARE GENERAL CONDITIONS: APPLICABLE TO ALL PLANS
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" gutterBottom>
                        Effective Date: [Insert Date] | Last Updated: [Insert Date]
                    </Typography> */}

                    <Box mt={2}>
                        <Typography variant="body">1. Age Limit:</Typography>
                        {/* {policyExclusions.introduction.map((section, idx) => ( */}
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.introduction)}
                        </Box>
                        {/* ))} */}

                        <Typography variant="body">2. Waiting Period for Specific Conditions:</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom style={{ paddingTop: "10px" }}>
                            Chronic ailments and pre-existing conditions such as Diabetes, Hypertension, Arthritis, and
                            Sickle Cell Anemia, are subject to a six-month waiting period
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom style={{ paddingTop: "10px" }}>
                            Chronic Condition Waiting Periods: Coverage for pre-existing chronic conditions is subject to
                            the following waiting periods:
                        </Typography>
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.enrollment)}
                        </Box>

                        <Typography variant="body">3. EXCLUSIONS</Typography>
                        <Typography variant='body2' paragraph color="text.secondary" mt={1}> The following services, conditions, and treatments are not covered under
                            UhuruCare plans</Typography>

                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.benefits)}
                        </Box>

                        <Typography variant="body">4.2 Medical Devices & Equipment</Typography>

                        <Typography variant='body2' paragraph color="text.secondary" mt={1}> Medical devices for secondary management, such as:</Typography>
                        {exclusions.map((section, idx) => (
                            <Box key={idx} sx={{ mb: 1, ml: 2 }}>
                                <Typography variant="body2" fontWeight="regular" gutterBottom sx={{ color: '#202429' }}>
                                    {section.title}
                                </Typography>
                                {renderList(section.items)}
                            </Box>
                        ))}

                        <Typography variant="body">5. Waiting Periods</Typography>
                        {waitingPeriodData.map((section, idx) => (
                            <Box key={idx} sx={{ mb: 1, ml: 2, mt: 2 }}>
                                <Typography variant="body2" fontWeight="regular" gutterBottom sx={{ color: '#202429' }}>
                                    {section.title}
                                </Typography>
                                {renderList(section.items)}
                            </Box>
                        ))}

                        <Typography variant="body">6. Premium Payments & Renewals</Typography>
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.payments)}
                        </Box>

                        {/* <Typography variant="body">7. Additional Terms</Typography>
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.claims)}
                        </Box> */}

                        <Typography variant="body">7. Additional Terms</Typography>
                        {cancellationData.map((section, idx) => (
                            <Box key={idx} sx={{ mb: 1, ml: 2, mt: 2 }}>
                                <Typography variant="body2" fontWeight="regular" gutterBottom sx={{ color: '#202429' }}>
                                    {section.title}
                                </Typography>
                                {renderList(section.items)}
                            </Box>
                        ))}
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.payments1)}
                        </Box>
                        <Typography variant='body2' paragraph color="text.secondary" mt={1}> Refunds will be processed into the principal enrollee’s designated account based on medical 
                        necessity and at UhuruCare’s standard rates.
                        </Typography>
                        <Typography variant="body">FINAL PROVISIONS</Typography>
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.changes)}
                        </Box>
{/*                      
                        <Typography variant="body">10. Dispute Resolution</Typography>
                        <Box sx={{ mb: 1, }}>
                            {renderList(policyExclusions?.disputes)}
                        </Box> */}
                    </Box>

                    <Box mt={4}>
                        <FormControlLabel
                            control={<Checkbox checked={agreed} onChange={handleCheckboxChange} />}
                            label="I acknowledge and agree to Policy and Terms and Conditions."
                        />

                        <Box sx={{ mt: 4, cursor: agreed ? "pointer" : "not-allowed" }}>
                            <Button
                                sx={{
                                    background: "#03A7E5",
                                    color: "#fff !important",
                                    textTransform: "capitalize !important",
                                }}
                                type="submit"
                                startIcon={<ArrowForwardIcon />}
                                disabled={!agreed}
                                onClick={handleSubmit}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} sx={{ color: "white" }} />
                                ) : (
                                    "   Next Step"
                                )}

                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
