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

import { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import moment from "moment";
import { AuthContext } from "../../Auth/context/Auth";

const ViewPolicy = () => {
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

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const getClaimDetails = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/claims/all/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true) {
        setViewClaimListDetails(response?.data?.data);
      } else {
        setViewClaimListDetails([]);
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setViewClaimListDetails([]);
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.error("API Error:", error);
    }
  };

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
        },
      });

      if (response.data.success === true) {
        navigate("/policyList");
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.error("API Error:", error);
    }
  };

  const claim = {
    claimId: viewPolicyList?.policy_id,
    blockId: viewPolicyList?.bc_tnx,
    claimNumber: viewPolicyList?.plan_name,
    claimAmount: viewPolicyList?.claim_amount,
    claimCoverage: viewPolicyList?.coverage_amount,
    claimDuration: viewPolicyList?.coverage_duration,
    claimDescription: viewPolicyList?.message,
    claimDate: viewPolicyList?.start_date,
    claimDates: viewPolicyList?.end_date,
    status: viewPolicyList?.status,
    success: viewPolicyList?.payment_status,
    services: viewPolicyList?.medical_service,
    inpatient: viewPolicyList?.inpatient,
    outpatient: viewPolicyList?.outpatient,
    medical_history: viewPolicyList?.medical_history,
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

  const handleDownload = (filePath) => {
    // Open image in a new window
    const newWindow = window.open(filePath, "_blank");

    // Trigger the download in the new window
    newWindow.document.title = "Download Image"; // Optional title for the new window

    // Create a download link in the new window
    const link = newWindow.document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop(); // Extract filename from the path
    newWindow.document.body.appendChild(link);
    link.click(); // Trigger the download automatically
  };

  const getClaamAllDetails = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    // setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}api/v1/claims/one/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("clllclclclcam", response);
      if (response.data.success) {
        setViewPolicyListDetails(response.data.data);
        // setLoading(false);
      } else {
        toast.error(response?.data?.message || "Please try again");
      }
    } catch (error) {
      // setLoading(false);
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
          onClick={() => navigate("/policyList")}
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
              }}
            >
              <AccordionSummary>
                <Typography fontWeight="bold">👉 Policy Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: viewPolicyList.plan_description,
                      }}
                    />
                  </div>
                  <div>
                    <strong>Start Date:</strong> {viewPolicyList.start_date}
                  </div>
                  <div>
                    <strong>End Date:</strong> {viewPolicyList.end_date}
                  </div>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box>
                  {renderField("🔘 Blockchain Hash:", claim.blockId, true)}
                  {renderField("🔘 Policy Id:", claim.claimId)}
                  {renderField("🔘 Policy Name:", claim.claimNumber)}
                  {renderField("🔘 Policy Coverage:", claim.claimCoverage)}
                  {renderField("🔘 Policy Duration:", claim.claimDuration)}
                  {renderField("🔘 Policy Start Date:", claim.claimDate)}
                  {renderField("🔘 Policy End Date:", claim.claimDates)}
                  {renderField("🔘 Policy Status:", claim.status)}
                  {renderField("🔘 Payment Status:", claim.success)}
                  {renderField("🔘 Medical Service:", claim.services)}
                  {renderField("🔘 Inpatient Coverage:", claim.inpatient)}
                  {renderField("🔘 Outpatient Coverage:", claim.outpatient)}
                  {renderField("🔘 Medical History:", claim.medical_history)}
                  {renderField(
                    "🔘 Policy Enrolled For:",
                    claim.policy_enroll_for
                  )}
                  {viewPolicyList?.payment_status === "created" && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        Payment
                      </Typography>
                      <Box
                        sx={{
                          background: "#4a6efd",
                          borderRadius: "15px",
                          paddingRight: "10px",
                          paddingLeft: "10px",
                        }}
                        p={0.5}
                      >
                        <Typography style={{ color: "#fff", fontSize: "12px" }}>
                          {claim.status}
                        </Typography>
                      </Box>
                      <Link
                        href={
                          viewPolicyList?.payment_url ??
                          "https://example.com/payment"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        Click here
                      </Link>{" "}
                      to clear the payment{" "}
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                borderRadius: "10px", // rounded corners

                overflow: "hidden",
                marginTop: "10px",
                marginBottom: "10px", // so the borderRadius is visible
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  👉 Policy Holder Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    <strong>Holder Name:</strong> {viewPolicyList.full_name}
                  </div>
                  <div>
                    <strong>Email:</strong> {viewPolicyList.emailid}
                  </div>
                  <div>
                    <strong>Phone:</strong>{" "}
                    {viewPolicyList.phone_number ?? "__"}
                  </div>
                  <div>
                    <strong>Address:</strong> {viewPolicyList.address ?? "__"}
                  </div>
                  <div>
                    <strong>Notional ID:</strong> {userData.national_id ?? "__"}
                  </div>
                  <div>
                    <strong>National Document:</strong> 
                    <img
                      src={`${IMAGEURL}uploads/${userData?.national_id_doc_path}`}
                      alt={`Uploaded`}
                      style={{
                        maxWidth: "250px",
                        borderRadius: "10px",
                        marginTop: "8px",
                      }}
                    />
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                borderRadius: "10px", // rounded corners

                overflow: "hidden",
                marginTop: "10px",
                marginBottom: "10px", // so the borderRadius is visible
              }}
              onChange={(event, isExpanded) => {
                if (isExpanded) {
                  getClaimDetails(viewPolicyList?.policy_id);
                }
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">👉 Claims Status</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {viewClaimListDetails?.[0]?.rows?.length ? (
                  <>
                    <Box sx={{ overflowX: "auto" }}>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr>
                            <th style={thStyle}>Sr No.</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Claim Number</th>
                            <th style={thStyle}>Raised By </th>
                            <th style={thStyle}>Amount </th>
                            <th style={thStyle}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewClaimListDetails?.[0]?.rows?.map(
                            (claim, index) => (
                              <tr
                                key={index}
                                onClick={() => {
                                  getClaamAllDetails(claim?.claim_id);
                                  setSlected(true); // toggle based on your logic
                                }}
                              >
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>
                                  {moment(claim.created_at).format("LL") ||
                                    "--"}
                                </td>
                                <td style={tdStyle}>
                                  {claim.claim_number || "--"}
                                </td>
                                <td style={tdStyle}>
                                  {claim?.full_name
                                    ? `${claim.full_name} (${
                                        claim.emailid || "--"
                                      })`
                                    : "--"}
                                </td>{" "}
                                <td style={tdStyle}>
                                  {claim.claim_amount || "--"}
                                </td>
                                <td style={tdStyle}>{claim.status || "--"}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </Box>
                  </>
                ) : (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Typography>No claims available.</Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
            {seleted && (
              <Box mt={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">Claim details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div>
                        <strong>➣ Claim Number:</strong>{" "}
                        {viewPolicyListDetails.claim_number}
                      </div>
                      <div>
                        <strong>➣ Description:</strong>{" "}
                        {viewPolicyListDetails.claim_description}
                      </div>
                      <div>
                        <strong>➣ Amount:</strong>{" "}
                        {viewPolicyListDetails.claim_amount}
                      </div>
                      <div>
                        <strong>➣ Status:</strong>{" "}
                        {viewPolicyListDetails.status}
                      </div>
                      <div>
                        <strong>➣ Claim Created On:</strong>{" "}
                        {moment(viewPolicyListDetails.created_at).format("LL")}
                      </div>
                      <div>
                        <strong>➣ Hospital Name:</strong>{" "}
                        {viewPolicyListDetails.hospital_fullname}
                      </div>
                      <div>
                        <strong>➣ Hospital Email Id:</strong>{" "}
                        {viewPolicyListDetails.hospital_emailid}
                      </div>
                      <div>
                        <strong>➣ Hospital Id:</strong>{" "}
                        {viewPolicyListDetails.hospital_id}
                      </div>
                      <div>
                        <strong>➣ Hospital Phone:</strong>{" "}
                        {viewPolicyListDetails.hospital_phone}
                      </div>
                      <div>
                        <strong>➣ Hospital Address:</strong>{" "}
                        {viewPolicyListDetails.hospital_address}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">Policy Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: viewPolicyListDetails.plan_description,
                        }}
                      />
                    </div>

                    <Typography>
                      <div>
                        <strong>➣ Medical Service:</strong>{" "}
                        {viewPolicyListDetails.medical_service}
                      </div>
                      <div>
                        <strong>➣ In-patient:</strong>{" "}
                        {viewPolicyListDetails.inpatient}
                      </div>
                      <div>
                        <strong>➣ Out-patient:</strong>{" "}
                        {viewPolicyListDetails.outpatient}
                      </div>
                      <div>
                        <strong>➣ Coverage Duration:</strong>{" "}
                        {viewPolicyListDetails.coverage_duration}
                      </div>
                      <div>
                        <strong>➣Coverage Amount:</strong>{" "}
                        {viewPolicyListDetails.coverage_amount}
                      </div>
                      <div>
                        <strong>➣ Blockchain Hash:</strong>{" "}
                        {viewPolicyListDetails.bc_tnx}
                      </div>
                      <div>
                        <strong>➣ Policies Status:</strong>{" "}
                        {viewPolicyListDetails.policies_status}
                      </div>
                      <div>
                        <strong>➣ Start Date:</strong>{" "}
                        {moment(viewPolicyListDetails.start_date).format("LL")}
                      </div>
                      <div>
                        <strong>➣ End Date:</strong>{" "}
                        {moment(viewPolicyListDetails.end_date).format("LL")}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">
                      Policy Holder Details{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div>
                        <strong>Holder Name:</strong>{" "}
                        {viewPolicyListDetails?.insurance_holder_fullname}
                      </div>
                      <div>
                        <strong>Email:</strong>{" "}
                        {viewPolicyListDetails?.insurance_holder_emailid}
                      </div>
                      <div>
                        <strong>Phone:</strong>{" "}
                        {viewPolicyListDetails.insurance_holder_phone ?? "__"}
                      </div>
                      <div>
                        <strong>Address:</strong>{" "}
                        {viewPolicyListDetails?.insurance_holder_address ??
                          "__"}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">Hospital Details </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div>
                        <strong>Hospital ID:</strong>{" "}
                        {viewPolicyListDetails?.hospital_id}
                      </div>
                      <div>
                        <strong>Hospital Name:</strong>{" "}
                        {viewPolicyListDetails?.hospital_fullname}
                      </div>
                      <div>
                        <strong>Email:</strong>{" "}
                        {viewPolicyListDetails?.hospital_emailid}
                      </div>
                      <div>
                        <strong>Phone:</strong>{" "}
                        {viewPolicyListDetails.hospital_phone ?? "__"}
                      </div>
                      <div>
                        <strong>National Id:</strong>{" "}
                        {viewPolicyListDetails.hospital_nationalid ?? "__"}
                      </div>
                      <div>
                        <strong>Address:</strong>{" "}
                        {viewPolicyListDetails?.hospital_address ?? "__"}
                      </div>
                    </Typography>
                    <Box mt={2}>
                      <Typography fontWeight={"bold"}>
                        Supporting Documents:
                      </Typography>

                      {viewPolicyListDetails?.documents?.map((doc, index) => (
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
                    {(userData?.role === "admin" ||
                      userData?.role === "insurance") && (
                      <>
                        <div style={{ paddingBottom: "15px" }}>
                          <strong>Change Claim Status: </strong>{" "}
                        </div>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                          >
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
                              <MenuItem value={"processing"}>
                                Processing
                              </MenuItem>
                              <MenuItem value={"approved"}>Approved</MenuItem>
                              <MenuItem value={"rejected"}>Rejected</MenuItem>
                              <MenuItem value={"paid"}>Paid</MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            onClick={() =>
                              ChangeStatusHandler(viewPolicyList?.policy_id)
                            }
                            sx={{
                              backgroundColor: "#00b2ff",
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
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewPolicy;
