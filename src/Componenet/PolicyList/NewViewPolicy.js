import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Container,
    Divider,
    CircularProgress,
    Tooltip,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    FormControl,
    MenuItem,
    InputLabel,
    Button,
    Link,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DownloadIcon from "@mui/icons-material/Download"; // Material UI Download icon

import { IoArrowBackSharp } from "react-icons/io5";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { API_BASE_URL } from "../../Auth/ApiConfig";
import moment from "moment";
import { AuthContext } from "../../Auth/context/Auth";
import { QRCodeCanvas } from "qrcode.react";

const NewViewPolicy = () => {
    const location = useLocation();
    const theme = useTheme();
    const navigate = useNavigate();
    const [age, setAge] = React.useState("");
    const auth = useContext(AuthContext);
    const userData = auth?.userData;
    console.log("dsgsadgsadg", age);
    const [viewPolicyList, setViewPolicyList] = useState({});
    const [viewPolicyListDetails, setViewPolicyListDetails] = useState({});
    console.log("asfadsfsdafdsa", viewPolicyListDetails);
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const viewData = location?.state?.row;
    const [loading, setLoading] = useState(false);
    const [seleted, setSlected] = useState(false);
    console.log("asfadfdsf", seleted);
    console.log("viewDataviewData", viewData);
    const [viewClaimListDetails, setViewClaimListDetails] = useState([]);

    const thStyle = {
        // border: "1px solid #ccc",
        padding: "10px",
        background: "#f5f5f5",
        fontWeight: "bold",
        textAlign: "left",
        border: "1px solid #ccc",
    };

    const tdStyle = {
        border: "1px solid #ccc",
        padding: "8px",
        textAlign: "left",
    };




    const claim = {
        claimId: viewPolicyList?.policy_id,
        blockId: viewPolicyList?.bc_tnx,
        claimNumber: viewPolicyList?.plan_name,
        claimAmount: viewPolicyList?.full_name,
        claimCoverage: viewPolicyList?.emailid,
        phone_number: viewPolicyList?.phone_number,
        address: viewPolicyList?.address,
        claimDate: viewPolicyList?.start_date,
        claimDates: viewPolicyList?.end_date,
        status: viewPolicyList?.status,
        success: viewPolicyList?.payment_status,
        services: viewPolicyList?.medical_service,
        inpatient: viewPolicyList?.inpatient,
        outpatient: viewPolicyList?.outpatient,
        policy_enroll_for: viewPolicyList?.policy_enroll_for,
        hospital: {
            name: viewPolicyList?.hospital_fullname,
            email: viewPolicyList?.hospital_email,
            id: viewPolicyList?.hospital_id,
            phone: viewPolicyList?.hospital_phone,
            address: viewPolicyList?.hospital_address,
        },
        insurance: {
            name: viewPolicyList?.full_name,
            email: viewPolicyList?.emailid,
            id: viewPolicyList?.insurance_holder_id,
            phone: viewPolicyList?.phone_number,
            address: viewPolicyList?.address,
        },
        policy: {
            name: viewPolicyList?.plan_name,
            email: viewPolicyList?.policyholder_email,
            id: viewPolicyList?.policies_policy_id,
            phone: viewPolicyList?.policyholder_phone,
            address: viewPolicyList?.policyholder_address,
        },
    };

    const renderField = (label, value, copyable = false) => {
        const displayValue =
            copyable && typeof value === "string" && value?.length > 8
                ? `${value?.slice(0, value?.length / 2)}...`
                : value ?? "null";

        return (
            <Box
                key={label}
                sx={{
                    display: "flex",
                    flexDirection: isSmall ? "row" : "row",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography
                    sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: "600",
                    }}
                >
                    {label}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "justify", md: "center" },
                        gap: 1,
                    }}
                >
                    <Typography sx={{ color: "#00000099" }}>{displayValue}</Typography>
                    {copyable && value && (
                        <Tooltip title="Copy to Block Chain Id">
                            <FileCopyIcon
                                onClick={() => {
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                        navigator.clipboard
                                            .writeText(value)
                                            .then(() => toast.success("Copied to Block Chain Id"))
                                            .catch((err) => toast.error("Failed to copy"));
                                    } else {
                                        toast.error("Clipboard not supported in this browser");
                                    }
                                }}
                                // onClick={() => {
                                //   navigator.clipboard.writeText(value);
                                //   toast.success("Copied to Block Chain Id");
                                // }}
                                sx={{
                                    fontSize: 18,
                                    cursor: "pointer",
                                    color: "#1976d2",
                                    "&:hover": { color: "#0d47a1" },
                                }}
                            />
                        </Tooltip>
                    )}
                </Box>
            </Box>
        );
    };

    const getClaimData = async (id) => {
        const token = window.localStorage.getItem("adminToken");
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}api/v1/policies/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log("polivy", response);
            if (response.data.success) {
                setViewPolicyList(response.data.data);
                setLoading(false);
            } else {
                toast.error(response?.data?.message || "Please try again");
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Please try again");
            console.error("Fetch error:", error);
        }
    };


    useEffect(() => {
        if (viewData?.policy_id) {
            getClaimData(viewData?.policy_id);
        }
    }, [viewData?.policy_id]);

    return (
        <Box sx={{}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                    sx={{
                        cursor: "pointer",
                        background: "#82828214;",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    <IoArrowBackSharp size={25} />
                </Box>
                <Box>
                    <Typography fontWeight="bold" style={{ fontSize: "20px" }}>
                        {viewData?.full_name}
                    </Typography>
                </Box>
            </Box>

            <Container
                maxWidth="lg"
                sx={{
                    mt: 4,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    background: "#fff",
                }}
                className="print-area"
            >
                {loading ? (
                    <Box
                        sx={{
                            height: "60vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Accordion
                            expanded={true}
                            sx={{
                                borderRadius: "10px", // rounded corners
                                overflow: "hidden",
                                marginTop: "10px",
                                marginBottom: "10px", // so the borderRadius is visible
                                boxShadow: "none", // removes elevation
                            }}
                        >
                            <AccordionSummary>
                                <Typography fontWeight="bold">👉 Digital ID</Typography>
                            </AccordionSummary>


                            <AccordionDetails>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: "space-between",
                                        alignItems: { sm: "flex-start" },
                                    }}
                                >
                                    {/* Details on the left */}
                                    <Box sx={{ flex: 1, mr: { sm: 2 } }}>
                                        <Box>
                                            {renderField("🔘 Blockchain Hash:", claim.blockId)}
                                            {renderField("🔘 Policy Id:", claim.claimId)}
                                            {renderField("🔘 Policy Name:", claim.claimNumber)}
                                            {renderField("🔘 Holder Name:", claim.claimAmount)}
                                            {renderField("🔘 Email:", claim.claimCoverage)}
                                            {renderField("🔘 Phone:", claim.phone_number)}
                                            {renderField("🔘 Address:", claim.address)}
                                        </Box>
                                    </Box>

                                    {/* QR Code on the right */}
                                    <Box
                                        sx={{
                                            mt: { xs: 2, sm: 0 },
                                            ml: { sm: 2 },
                                            flexShrink: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <QRCodeCanvas
                                            value={JSON.stringify({
                                                blockId: claim?.blockId ?? "",
                                                email: claim?.claimCoverage ?? "",
                                                phone: claim?.phone_number ?? "",
                                            })}
                                            size={180}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            level="H"
                                            includeMargin={true}
                                        />
                                    </Box>
                                </Box>
                            </AccordionDetails>


                        </Accordion>



                    </>
                )}
            </Container>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}

                    onClick={() => window.print()}
                >
                    Print Digital ID
                </Button>
            </Box>
        </Box>
    );
};

export default NewViewPolicy;
