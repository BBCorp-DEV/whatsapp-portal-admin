import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useMediaQuery,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment/moment";
import { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import { AuthContext } from "../../Auth/context/Auth";
import PolicyIcon from "@mui/icons-material/Policy";
import { useNavigate } from "react-router-dom";
const HospitalPolicies = () => {
  const [searchValue, setSearchValue] = useState("");
  const [viewClaimList, setViewClaimList] = useState("");
  const [viewClaimListDetails, setViewClaimListDetails] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [viewPolicyListDetails, setViewPolicyListDetails] = useState({});
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userData = auth?.userData;
  const [seleted, setSlected] = useState(false);

  const getClaimData = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/policies/getOneByBC/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true) {
        setIsDataFetched(true);  // Set data fetched to true
        setViewClaimList(response?.data?.data);
        toast.success("Policy data loaded successfully");

      } else {
        setViewClaimList([]);
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setViewClaimList([]);
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.error("API Error:", error);
    }
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

  const handleSearch = () => {
    if (!searchValue?.trim()) {
      toast.error("Please enter a blockchain ID");
      return;
    }
    getClaimData(searchValue.trim());
  };

  //   const rawHistory = viewClaimList?.medical_history;

  //   const medicalHistory = JSON.parse(rawHistory); // becomes ["Hypertension"]
  // console.log("SAfghdfjhds",medicalHistory);



  return (
    <Container maxWidth="xxl" sx={{ mt: 4, height: "100vh" }}>
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontSize: "30px", fontWeight: "700", fontFamily: "rubik" }}
          >
            Policy
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            alignItems: isMobile ? "stretch" : "center",
            mb: 4,
            justifyContent: "flex-end",
          }}
        >
          <TextField
            variant="outlined"
            size="small" // This reduces the height
            label="Search Policy By Blockchain ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              width: isMobile ? "100%" : "300px",
              "& .MuiInputBase-root": {
                py: 0.5, // reduce vertical padding
              },
            }}
          />

          <Button
            onClick={handleSearch}
            variant="contained"
            size="small" // Optional, for a more compact button
            sx={{
              backgroundColor: "#00b2ff",
              textTransform: "capitalize",
              px: 4,
              py: 1.5, // Reduce vertical padding
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      {/* Accordion Panels */}

      {viewClaimList && Object.keys(viewClaimList).length > 0 ? (
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
                      __html: viewClaimList.plan_description,
                    }}
                  />
                </div>
                <div>
                  <strong>Start Date:</strong> {viewClaimList.start_date}
                </div>
                <div>
                  <strong>End Date:</strong> {viewClaimList.end_date}
                </div>
                <div>
                  <strong>Medical History:</strong> {viewClaimList.medical_history}
                </div>
                <div>
                  <strong>Notional ID:</strong> {viewClaimList.national_id}
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
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">
                👉 Policy Holder Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  <strong>Holder Name:</strong> {viewClaimList.full_name}
                </div>
                <div>
                  <strong>Email:</strong> {viewClaimList.emailid}
                </div>
                <div>
                  <strong>Phone:</strong> {viewClaimList.phone_number ?? "__"}
                </div>
                <div>
                  <strong>Address:</strong> {viewClaimList.address ?? "__"}
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
                getClaimDetails(viewClaimList?.policy_id);
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">👉 Claims Status</Typography>
            </AccordionSummary>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/create-claim", {
                    state: { userData: viewClaimList },
                    // state: {userData},

                  })
                }
                // onClick={()=> navigate("/create-claim",viewPolicyListDetails)}
                sx={{
                  backgroundColor: "#00b2ff",
                  textTransform: "Capitalize",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  border: "none",
                  color: "#fff",
                }}
              >
                Create Claim
              </Button>
            </Box>

            <AccordionDetails>
              {viewClaimListDetails?.[0]?.rows?.length ? (
                <Box sx={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                      {viewClaimListDetails?.[0]?.rows?.map((claim, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            getClaamAllDetails(claim?.claim_id);
                            setSlected(true); // toggle based on your logic
                          }}
                        >
                          <td style={tdStyle}>{index + 1}</td>
                          <td style={tdStyle}>
                            {moment(claim.created_at).format("LL") || "--"}
                          </td>
                          <td style={tdStyle}>{claim.claim_number || "--"}</td>
                          <td style={tdStyle}>
                            {claim?.full_name
                              ? `${claim.full_name} (${claim.emailid || "--"})`
                              : "--"}
                          </td>{" "}
                          <td style={tdStyle}>{claim.claim_amount || "--"}</td>
                          <td style={tdStyle}>{claim.status || "--"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
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
                      <strong>➣ Claim Approved Amount:</strong>{" "}
                      {viewPolicyListDetails.claim_approved_amount}
                    </div>
                    <div>
                      <strong>➣ Status:</strong> {viewPolicyListDetails.status}
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
                  <Box sx={{ mt:  2 }}>
                <Typography
                  variant={ "h5"}
                  sx={{ fontWeight: "700" }}
                >
                  Medicine Report
                </Typography>
                <Typography variant="body1">Medicine details.</Typography>
                <Divider sx={{ my: 2 }} />
              
                {viewPolicyListDetails?.medical_report?.map((med, index) => (
                  <Box
                    key={med.id || index} // Use a unique ID or index fallback
                    sx={{
                      display: "flex",
                      flexDirection:  "row",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth:  180,
                        fontWeight: 600,
                      }}
                    >
                      {med.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:  "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "#00000099" }}>{med.description}</Typography>
                    </Box>
                  </Box>
                ))}


              </Box>
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
                      {viewPolicyListDetails?.insurance_holder_address ?? "__"}
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
                            // onClick={() =>
                            //   handleDownload(
                            //     `${API_BASE_URL}uploads/${doc.doc_filename}`
                            //   )
                            // }
                            style={{ marginLeft: "10px" }}
                            color="primary"
                          >
                            {/* <DownloadIcon /> */}
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
                        {/* <Box
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
                        </Box> */}
                      </>
                    )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </>
      ) : (
        !isDataFetched && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="35vh"
            border="1px dashed #ccc"
            borderRadius={2}
            bgcolor="#f9f9f9"
            p={4}
            mt={4}
          >
            <PolicyIcon
              fontSize="inherit"
              color="disabled"
              sx={{ mb: 2, fontSize: 68 }} // 48px is just an example
            />

            <Typography
              variant="h6"
              color="textSecondary"
              gutterBottom
              sx={{ fontWeight: "700", color: '#000000dc' }}
            >
              No Policies Found
            </Typography>

            <Typography variant="body2" color="textSecondary" textAlign="center">
              We couldn’t find any policies matching your search.
              <br />
              Please try adjusting your filters or keywords.
            </Typography>
          </Box>
        )
      )}

    </Container>
  );
};

export default HospitalPolicies;
