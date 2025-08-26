import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Tooltip,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import moment from "moment";
import { IoArrowBackSharp } from "react-icons/io5";
import { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import DownloadIcon from "@mui/icons-material/Download"; // Material UI Download icon
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AuthContext } from "../../Auth/context/Auth";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getBase64 } from "../../Auth/utils";

pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
const ViewClaim = () => {
  const userDatas = {
    fullName: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
  };

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useContext(AuthContext);
  const userData = auth?.userData;
  const [claimAmount, setClaimAmount] = useState("");
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [viewClaimList, setViewClaimList] = useState({});
  const [loading, setLoading] = useState(false);
  const viewData = location?.state.row;
  const [age, setAge] = React.useState("");
  const [error, setError] = useState(""); // State to handle error message
  const [getDataStored, setGetDataStored] = useState([]);
  console.log("adgadsghadsfg", getDataStored);
  // Base URL for your uploaded images (adjust if different on your server)
  const imageBaseURL = "http://3.144.242.180/api/v1/claims/one";

  const fileName = viewClaimList.documents?.[0].doc_filename;

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    setError("");
  };


  
    const sumAmounts = (arr) =>
  Array.isArray(arr)
    ? arr.reduce((total, item) => total + parseFloat(item.amount || 0), 0)
    : 0;

const totalMedical = sumAmounts(viewClaimList?.medical_report);
const totalDiagnosis = sumAmounts(viewClaimList?.diagnosis);
const totalInvestigation = sumAmounts(viewClaimList?.investigation);

const grandTotal = totalMedical + totalDiagnosis + totalInvestigation;

  const pdfDownload = async () => {
    const logoBase64 = await getBase64("/logopdf.png");
    // const parsedReport = JSON.parse(medicalReport || '[]'); // Step 1: Parse JSON string

    const medicineRows = viewClaimList?.medical_report?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
        med.amount || "N/A", 
    ]);

      const medicineRows1 = viewClaimList?.diagnosis?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
        med.amount || "N/A", 
    ]);

      const medicineRows2 = viewClaimList?.investigation?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
        med.amount || "N/A", 
    ]);

    const totalMedical = sumAmounts(viewClaimList?.medical_report);
const totalDiagnosis = sumAmounts(viewClaimList?.diagnosis);
const totalInvestigation = sumAmounts(viewClaimList?.investigation);

const grandTotal = totalMedical + totalDiagnosis + totalInvestigation;

console.log("sdgdfhfdhg",grandTotal);

    // console.log("DSgsfdgfsd", investigation);
    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: logoBase64,
              width: 40,
              alignment: "center",
              margin: [0, 0, 0, 20],
              style: "logos",
            },
            {
              text: "UhuruCare",
              style: "invoiceTitle",
            },
            {
              text: [
                {
                  text: `Claim No: ${viewClaimList?.claim_number || "--"}`,
                  bold: true,
                  fontSize: 10,
                  alignment: "right",
                },
                {
                  text: "\n",
                },
                {
                  text: `Date: ${moment(viewClaimList?.created_at).format(
                    "DD-MM-YYYY"
                  )}`,
                  bold: true,
                  fontSize: 10,
                  alignment: "right",
                  // margin: [60, 0, 30, 0],
                },
              ],
              style: "invoiceTitle",
            },
          ],
        },

        {
          text: "Client Details:",
          style: "sectionHeader",
          margin: [0, 20, 0, 8],
        },

        {
          table: {
            widths: ["25%", "75%"],
            body: [
              [
                { text: "Full Name:", fontSize: 10 },
                {
                  text: viewClaimList?.insurance_holder_fullname || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Email Id:", fontSize: 10 },
                {
                  text: viewClaimList?.insurance_holder_emailid || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Insurance Id:", fontSize: 10 },
                {
                  text: viewClaimList?.insurance_holder_id || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Phone Number:", fontSize: 10 },
                {
                  text: viewClaimList?.insurance_holder_phone || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Address:", fontSize: 10 },
                {
                  text: viewClaimList?.insurance_holder_address || "--",
                  fontSize: 10,
                },
              ],
            ],
          },

          layout: "noBorders",
        },

        {
          text: "Hospital Details:",
          style: "sectionHeader",
          margin: [0, 20, 0, 8],
        },
        {
          table: {
            widths: ["25%", "75%"],
            body: [
              [
                { text: "Hospital Name:", fontSize: 10 },
                {
                  text: viewClaimList?.hospital_fullname || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Email Id:", fontSize: 10 },
                { text: viewClaimList?.hospital_emailid || "--", fontSize: 10 },
              ],
              [
                { text: "Phone Number:", fontSize: 10 },
                { text: viewClaimList?.hospital_phone || "--", fontSize: 10 },
              ],
              [
                { text: "Claim Amount:", fontSize: 10 },
                { text: viewClaimList?.claim_amount || "--", fontSize: 10 },
              ],
              [
                { text: "Claim Duration:", fontSize: 10 },
                {
                  text: viewClaimList?.coverage_duration || "--",
                  fontSize: 10,
                },
              ],
              [
                { text: "Address:", fontSize: 10 },
                { text: viewClaimList?.hospital_address || "--", fontSize: 10 },
              ],
            ],
          },
          layout: "noBorders",
        },

        {
          text: "Medicine Report",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true },
                { text: "Medicine name", bold: true },
                { text: "Description", bold: true },
                  { text: "Amount", bold: true },
              ],
              ...medicineRows.map((row) =>
                row.map((cell) =>
                  typeof cell === "object"
                    ? { ...cell, fontSize: 10 }
                    : { text: cell, fontSize: 10 }
                )
              ),
            ],
          },
          layout: {
            fillColor: (rowIndex) =>
              rowIndex === 0 ? null : rowIndex % 2 === 0 ? "#F9F9F9" : null,
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: "#CCC",
            vLineColor: "#CCC",
          },
        },

        // Diagnosis

         {
          text: "Diagnosis Report",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true },
                { text: "Medicine name", bold: true },
                { text: "Description", bold: true },
                  { text: "Amount", bold: true },
              ],
              ...medicineRows1.map((row) =>
                row.map((cell) =>
                  typeof cell === "object"
                    ? { ...cell, fontSize: 10 }
                    : { text: cell, fontSize: 10 }
                )
              ),
            ],
          },
          layout: {
            fillColor: (rowIndex) =>
              rowIndex === 0 ? null : rowIndex % 2 === 0 ? "#F9F9F9" : null,
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: "#CCC",
            vLineColor: "#CCC",
          },
        },

          // Investingation

         {
          text: "Investigation Report",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true },
                { text: "Medicine name", bold: true },
                { text: "Description", bold: true },
                  { text: "Amount", bold: true },
              ],
              ...medicineRows2.map((row) =>
                row.map((cell) =>
                  typeof cell === "object"
                    ? { ...cell, fontSize: 10 }
                    : { text: cell, fontSize: 10 }
                )
              ),
            ],
          },
          layout: {
            fillColor: (rowIndex) =>
              rowIndex === 0 ? null : rowIndex % 2 === 0 ? "#F9F9F9" : null,
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: "#CCC",
            vLineColor: "#CCC",
          },
        },
         {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              table: {
                body: [
                  [
                   
                    
                    { text: "Grand total Amount:", bold: true, alignment: "center" },
                    {
                      text: `GHC ${parseFloat(grandTotal || 0).toFixed(
                        2
                      )}`,
                      alignment: "right",
                    },
                  ],
                ],
              },
              layout: "noBorders",
              margin: [0, 10, 0, 0],
            },
          ],
        },
      ],
      footer: function (currentPage, pageCount) {
        return {
          margin: [40, 10],
          fontSize: 8,
          alignment: "center",
          stack: [
            {
              text: "Hospital Policies: All patients must carry a valid photo ID. Claims must be submitted within 30 days of treatment. Pre-authorization required for planned procedures. Emergency cases must be reported within 24 hours. Incomplete forms may delay processing. Policies may change without notice.\n Address: 19 Kofi Annan Street, Airport Residential Area, Accra, Ghana \n Phone: 0537587588 \n Email: info@uhurucare.com",
            },
          ],
        };
      },
      styles: {
        invoiceTitle: {
          fontSize: 22,
          bold: true,
          color: "#00077CC",
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          color: "#154360",
        },
        footer: {
          fontSize: 11,
          italics: true,
          color: "#7D6608",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Invoice.pdf");
  };

  const handleConfirmStatus = () => {
    if (!age) {
      setError("Please select a status");
    } else {
      ChangeStatusHandler(viewClaimList?.claim_id);
    }
  };

  const getOneUserData = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/users/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true) {
        setGetDataStored(response?.data?.data);
        // toast.success(response?.data?.message);
      } else {
        // toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message ?? "Please try again");
      console.log("error", error);
    } finally {
    }
  };

  useEffect(() => {
    if (viewClaimList?.policyholder_id) {
      getOneUserData(viewClaimList?.policyholder_id);
    }
  }, [viewClaimList?.policyholder_id]);

  const ChangeStatusHandler = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "PUT",
        url: `${API_BASE_URL}api/v1/claims/one/${id}/status`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          status: age,
          claim_approved_amount: claimAmount,
        },
      });

      if (response.data.success === true) {
        navigate("/claimList");
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.error("API Error:", error);
    }
  };

  const claim = {
    claimId: viewClaimList?.claim_id,
    blockId: viewClaimList?.bc_tnx,
    claimNumber: viewClaimList?.claim_number,
    claimAmount: viewClaimList?.claim_amount,
    claimCoverage: viewClaimList?.coverage_amount,
    claimDuration: viewClaimList?.coverage_duration,
    claimDescription: viewClaimList?.claim_description,
    claimDate: moment(viewClaimList?.created_at).format("DD-MM-YYYY"),
    status: viewClaimList?.claim_description,
    hospital: {
      name: viewClaimList?.hospital_fullname,
      email: viewClaimList?.hospital_emailid,
      id: viewClaimList?.hospital_id,
      phone: viewClaimList?.hospital_phone,
      address: viewClaimList?.hospital_address,
    },
    insurance: {
      name: viewClaimList?.insurance_holder_fullname,
      email: viewClaimList?.insurance_holder_emailid,
      id: viewClaimList?.insurance_holder_id,
      phone: viewClaimList?.insurance_holder_phone,
      address: viewClaimList?.insurance_holder_address,
    },
    policy: {
      name: viewClaimList?.plan_name,
      email: viewClaimList?.policyholder_id,
      id: viewClaimList?.policies_policy_id,
      phone: viewClaimList?.status,
    },
    policy1: {
      name: getDataStored?.full_name,
      email: getDataStored?.emailid,
      id: getDataStored?.national_id,
      phone: getDataStored?.phone_number,
      add: getDataStored?.address,
      image: getDataStored?.national_id_doc_path,
    },
    picture: {
      pic: fileName ? `${imageBaseURL}${fileName}` : "",
    },
  };

  const renderField = (label, value, copyable = false) => {
    const displayValue =
      copyable && typeof value === "string" && value.length > 8
        ? `${value.slice(0, value.length / 2)}...`
        : value ?? "null";

    return (
      <Box
        key={label}
        sx={{
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          alignItems: isSmall ? "justify" : "center",
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
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Block Chain Id");
                }}
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

  const handleDownload = (filePath) => {
    // Open image in a new window
    const newWindow = window.open(filePath, "_blank");

    // Trigger the download in the new window
    newWindow.document.title = "Download Image"; // Optional title for the new window

    // Create a download link in the new window
    const link = newWindow.document.createElement("a");
    link.href = filePath;
    link.download = filePath?.split("/").pop(); // Extract filename from the path
    newWindow.document.body.appendChild(link);
    link.click(); // Trigger the download automatically
  };

  const getClaimData = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/claims/one/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true) {
        setViewClaimList(response?.data?.data);
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewData?.claim_id) {
      getClaimData(viewData?.claim_id);
    }
  }, [viewData?.claim_id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
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
        onClick={() => navigate("/claimList")}
      >
        <IoArrowBackSharp size={25} />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={pdfDownload}
          sx={{ textTransform: "capitalize" }}
        >
          Report
        </Button>
      </Box>
      <Container
        maxWidth="xlg"
        sx={{
          mt: 4,
          p: isSmall ? 1 : 2,
          border: "1px solid #ddd",
          borderRadius: 4,
          background: "#fff",
        }}
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
            <Typography
              variant={isSmall ? "h6" : "h5"}
              gutterBottom
              sx={{ fontWeight: "700" }}
            >
              Raised Claim Details.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Claim details.
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {renderField("Block Chain Id:", claim.blockId, true)}
              {renderField("Claim Id:", claim.claimId)}
              {renderField("Claim Number:", claim.claimNumber)}
              {renderField("Claim Amount:", claim.claimAmount)}
              {renderField("Claim Coverage:", claim.claimCoverage)}
              {renderField("Claim Duration:", claim.claimDuration)}
              {renderField("Claim Date:", claim.claimDate)}
              {renderField("Claim Description:", claim.claimDescription)}

              {/* Insurance Details */}
              <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Raised Insurance Details.
                </Typography>
                <Typography variant="body1">Insurance details.</Typography>
                <Divider sx={{ my: 2 }} />
                {renderField("Insurance Name:", claim.insurance.name)}
                {renderField("Insurance Email Id:", claim.insurance.email)}
                {renderField("Insurance Id:", claim.insurance.id)}
                {renderField("Insurance Phone:", claim.insurance.phone)}
                {renderField("Insurance Address:", claim.insurance.address)}
              </Box>
              {userData?.role != "hospital" && (
                <Box sx={{ mt: isSmall ? 3 : 6 }}>
                  <Typography
                    variant={isSmall ? "h6" : "h5"}
                    sx={{ fontWeight: "700" }}
                  >
                    Policy Holder Details.
                  </Typography>
                  <Typography variant="body1">Policy details.</Typography>
                  <Divider sx={{ my: 2 }} />
                  {renderField("Policy Holder Name:", claim.policy1.name)}
                  {renderField("Policy Holder Email Id:", claim.policy1.email)}
                  {renderField("National ID:", claim.policy1.id)}
                  {renderField("Policy Holder Phone:", claim.policy1.phone)}
                  {renderField("Policy Holder Address:", claim.policy1.add)}
                  <img
                    src={`${IMAGEURL}uploads/${claim.policy1?.image}`}
                    // src={`http://localhost:5000/uploads/${doc.doc_filename}`}
                    // src={`${doc?.doc_path}/${doc.doc_filename}`}
                    alt={`Uploaded}`}
                    style={{
                      maxWidth: "250px",
                      borderRadius: "10px",
                      marginTop: "8px",
                    }}
                  />
                </Box>
              )}
              <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Medicine Report
                </Typography>
                <Typography variant="body1">Medicine details.</Typography>
                <Divider sx={{ my: 2 }} />

                {viewClaimList?.medical_report?.map((med, index) => (
                  <Box
                    key={med.id || index} // Use a unique ID or index fallback
                    sx={{
                      display: "flex",
                      flexDirection: isSmall ? "column" : "row",
                      alignItems: isSmall ? "flex-start" : "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.name}
                    </Typography>
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.amount}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: isSmall ? "flex-start" : "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "#00000099" }}>
                        {med.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Diagnosis Report
                </Typography>
                <Typography variant="body1">Diagnosis details.</Typography>
                <Divider sx={{ my: 2 }} />

                {viewClaimList?.diagnosis?.map((med, index) => (
                  <Box
                    key={med.id || index} // Use a unique ID or index fallback
                    sx={{
                      display: "flex",
                      flexDirection: isSmall ? "column" : "row",
                      alignItems: isSmall ? "flex-start" : "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.name}
                    </Typography>
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.amount}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: isSmall ? "flex-start" : "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "#00000099" }}>
                        {med.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
                <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Investigation Report
                </Typography>
                <Typography variant="body1">Investigation details.</Typography>
                <Divider sx={{ my: 2 }} />

                {viewClaimList?.investigation?.map((med, index) => (
                  <Box
                    key={med.id || index} // Use a unique ID or index fallback
                    sx={{
                      display: "flex",
                      flexDirection: isSmall ? "column" : "row",
                      alignItems: isSmall ? "flex-start" : "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.name}
                    </Typography>
                    <Typography
                      sx={{
                        minWidth: isSmall ? "auto" : 180,
                        fontWeight: 600,
                      }}
                    >
                      {med.amount}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: isSmall ? "flex-start" : "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "#00000099" }}>
                        {med.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Policy Details */}
              <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Raised Policy Details.
                </Typography>
                <Typography variant="body1">Policy details.</Typography>
                <Divider sx={{ my: 2 }} />
                {renderField("Policy Name:", claim.policy.name)}
                {renderField("Policy Holder Id:", claim.policy.email)}
                {renderField("Policy Id:", claim.policy.id)}
                {renderField("Policy Status:", claim.policy.phone)}
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: viewClaimList.plan_description,
                    }}
                  />
                </div>
              </Box>

              {/* Hospital Details */}
              <Box sx={{ mt: isSmall ? 3 : 6 }}>
                <Typography
                  variant={isSmall ? "h6" : "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Raised Hospital Details.
                </Typography>
                <Typography variant="body1">Hospitals details.</Typography>
                <Divider sx={{ my: 2 }} />
                {renderField("Hospital Name:", claim.hospital.name)}
                {renderField("Hospital Email Id:", claim.hospital.email)}
                {renderField("Hospital Id:", claim.hospital.id)}
                {renderField("Hospital Phone:", claim.hospital.phone)}
                {renderField("Hospital Address:", claim.hospital.address)}
              </Box>
              <Box mt={2}>
                <Typography fontWeight={"bold"}>
                  Supporting Documents:
                </Typography>

                {viewClaimList?.documents?.map((doc, index) => (
                  <div key={doc.doc_id} style={{ paddingTop: "10px" }}>
                    <span>
                      {doc.doc_category}: {"  "}
                    </span>
                    <img
                      src={`${IMAGEURL}uploads/${doc.doc_filename}`}
                      // src={`http://localhost:5000/uploads/${doc.doc_filename}`}
                      // src={`${doc?.doc_path}/${doc.doc_filename}`}
                      alt={`Uploaded-${index}`}
                      style={{
                        maxWidth: "400px",
                        borderRadius: "10px",
                        marginTop: "8px",
                      }}
                    />
                    <Tooltip title="Download">
                      <IconButton
                        onClick={() =>
                          handleDownload(
                            `${IMAGEURL}uploads/${doc.doc_filename}`
                          )
                        }
                        style={{ marginLeft: "10px" }}
                        color="primary"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
              </Box>
              {userData?.role === "insurance" && (
                <>
                  <div style={{ paddingBottom: "15px" }}>
                    <strong>Change Claim Status: </strong>{" "}
                  </div>
                  <Box
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Select
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={age}
                        label="Select"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value={"processing"}>Processing</MenuItem>
                        <MenuItem value={"approved"}>Approved</MenuItem>
                        <MenuItem value={"rejected"}>Rejected</MenuItem>
                        <MenuItem value={"paid"}>Paid</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Claim Amount Input */}
                    <TextField
                      label="Claim Amount"
                      variant="outlined"
                      size="small"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)} // Make sure to define the state for claimAmount
                      sx={{ m: 1, minWidth: 120 }}
                    />

                    <Button
                      variant="contained"
                      onClick={handleConfirmStatus}
                      sx={{
                        backgroundColor: "#0077cc",
                        textTransform: "Capitalize",
                        px: 4,
                        py: 1,
                        borderRadius: "8px",
                        fontWeight: "bold",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      Confirm Status
                    </Button>
                  </Box>
                  {error && (
                    <div style={{ color: "red", marginTop: "10px" }}>
                      {error}
                    </div>
                  )}
                </>
              )}
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewClaim;
