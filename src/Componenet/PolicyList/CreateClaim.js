import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
  IconButton,
  Divider,
  Autocomplete,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBackSharp, IoCropSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import ApiConfig, { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import toast from "react-hot-toast";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getBase64 } from "../../Auth/utils";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { AuthContext } from "../../Auth/context/Auth";

pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

const validationSchema = Yup.object({
  claimNumber: Yup.string().required("Claim Number is required"),
  description: Yup.string().required("Claim Description is required"),
  amount: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than zero")
    .required("Claim Amount is required"),
  // file: Yup.mixed().required("Supporting file is required"),
});

export default function CreateClaim() {
  const location = useLocation();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const viewPolicyListDetails = location.state?.userData;
  const auth = useContext(AuthContext);
  const userDatas = auth.userData;
  console.log("Sdgsafgsa", userDatas);

  const [category, setCategory] = useState("");
  const [profile, setProfile] = useState({});
  console.log("asdfgsafgafsga", profile);

  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedDiag, setSelectedDiag] = useState([]);
  const [selectedDiag1, setSelectedDiag1] = useState([]);
  const [medicalReport, setMedicalReport] = useState([]);
  const [medicalReportDeg, setMedicalReportDeg] = useState([]);
  const [medicalReportDeg1, setMedicalReportDeg1] = useState([]);
  const typeOfHos = window.localStorage.getItem("typeOfHospital");
console.log("typeOfHostypeOfHostypeOfHos",typeOfHos);

  // const mergedReports = [...medicalReport, ...medicalReportDeg];

  const [searchQuery, setSearchQuery] = useState("");
  const [reportStored, setReportStored] = useState([]);
  console.log("diagoneseessData", reportStored);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const imageData = {
    image: process.env.PUBLIC_URL + "/logo512.png",
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setPdfData1((prev) => ({
      ...prev,
      patient_type: value, // update patient_type
    }));
  };

  console.log("medicalReportmedicalReportmedicalReport", selectedOption);
  const [totalMedicinePrice, setTotalMedicinePrice] = useState(0);
  const [totalDiagosisPrice, setTotalDiagosisPrice] = useState(0);
  const [totalDiagosisPrice1, setTotalDiagosisPrice1] = useState(0);
  const [medicineOptions, setMedicineOptions] = useState([]);
  console.log("bdeiuwfbuweguoerh", medicineOptions);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [upload, setUpload] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // Stores image URLs
  console.log("medicineOptioffffnsmedicineOptions", viewPolicyListDetails);
  const [selectedDate, setSelectedDate] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();
  const [open, setOpen] = useState(false);
  const [pdfData1, setPdfData1] = useState({ patient_type: "" });
  const pdfData = {
    fullName: viewPolicyListDetails?.full_name,
    phoneNumber: viewPolicyListDetails?.phone_number,
    email: viewPolicyListDetails?.emailid,
    amount: totalMedicinePrice,
    amount2: totalDiagosisPrice,
    plan_name: viewPolicyListDetails?.plan_name,
    medical_history: viewPolicyListDetails?.medical_history,
    patient_type: selectedOption,
    investigation: totalDiagosisPrice1,
  };

  const totalPrice =
  (Number(totalDiagosisPrice) || 0) +
  (Number(totalDiagosisPrice1) || 0) +
  (Number(totalMedicinePrice) || 0);

  console.log("sdgfadsgsadfgs",totalPrice);

  const pdfDownload = async () => {
    const logoBase64 = await getBase64("/logopdf.png"); // if it's in public folder

    console.log("dfdszgfsd55555555s", medicalReport);

    const parsedReport = JSON?.parse(medicalReport || "[]");

    const medicineRows = parsedReport?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
      med.amount || "N/A", // Description
    ]);

    const parsedReport1 = JSON?.parse(medicalReportDeg || "[]");

    const medicineRows1 = parsedReport1?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
      med.amount || "N/A", // Description
    ]);

    const parsedReport12 = JSON?.parse(medicalReportDeg1 || "[]");

    const medicineRows12 = parsedReport12?.map((med, index) => [
      `${index + 1}`,
      `${med.name} (${med.id})`, // Medicine name and ID
      med.description || "N/A", // Description
      med.amount || "N/A", // Description
    ]);

    console.log("medinoDaraaaaa", medicineRows);

    const docDefinition = {
      pageMargins: [40, 60, 40, 80], // left, top, right, bottom

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
                  text: `Date: ${viewPolicyListDetails.created_at}`,
                  bold: true,
                  fontSize: 10,
                  alignment: "right",
                },
                { text: "\n" },
                {
                  text: `Claim Number: ${formik.values.claimNumber || "N/A"}`,
                  bold: true,
                  fontSize: 10,
                  alignment: "right",
                },
              ],
              style: "invoiceTitle",
            },
          ],
        },
        // {
        //   text: "Patient Details:",
        //   style: "sectionHeader",
        //   margin: [0, 20, 0, 8],
        // },
        // {
        //   table: {
        //     widths: ["25%", "75%"],
        //     body: [
        //       ["Full Name:", pdfData.fullName || "N/A"],
        //       ["Phone Number:", pdfData.phoneNumber || "N/A"],
        //       ["Email:", pdfData.email || "N/A"],
        //       ["Plan Name:", pdfData.plan_name || "N/A"],
        //       ["Disease Name:", pdfData.medical_history || "N/A"],
        //       ["Patient Type:", pdfData.patient_type || "N/A"],
        //       ["Description:", formik.values.description || "N/A"],
        //     ],
        //   },
        //   layout: "noBorders",
        // },
        // {
        //   text: "Hospital Details:",
        //   style: "sectionHeader",
        //   margin: [0, 20, 0, 8],
        // },
        // {
        //   table: {
        //     widths: ["25%", "75%"],
        //     body: [
        //       ["Full Name:", userDatas.full_name || "N/A"],
        //       ["Phone Number:", userDatas.phone_number || "N/A"],
        //       ["Email:", userDatas.emailid|| "N/A"],
        //     ],
        //   },
        //   layout: "noBorders",
        // },
        {
          columns: [
            {
              width: "50%",
              stack: [
                {
                  text: "Patient Details:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  table: {
                    widths: ["30%", "70%"],
                    body: [
                      [
                        { text: "Full Name:", fontSize: 10 },
                        { text: pdfData.fullName || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Phone:", fontSize: 10 },
                        { text: pdfData.phoneNumber || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Email:", fontSize: 10 },
                        { text: pdfData.email || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Plan Name:", fontSize: 10 },
                        { text: pdfData.plan_name || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Disease Name:", fontSize: 10 },
                        {
                          text: pdfData.medical_history || "N/A",
                          fontSize: 10,
                        },
                      ],
                      [
                        { text: "Patient Type:", fontSize: 10 },
                        { text: pdfData1.patient_type || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Description:", fontSize: 10 },
                        {
                          text: formik.values.description || "N/A",
                          fontSize: 10,
                        },
                      ],
                    ],
                  },

                  layout: "noBorders",
                },
              ],
            },
            {
              width: "50%",
              stack: [
                {
                  text: "Hospital Details:",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 8],
                },
                {
                  table: {
                    widths: ["30%", "70%"],
                    body: [
                      [
                        { text: "Full Name:", fontSize: 10 },
                        { text: userDatas.full_name || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Phone:", fontSize: 10 },
                        { text: userDatas.phone_number || "N/A", fontSize: 10 },
                      ],
                      [
                        { text: "Email:", fontSize: 10 },
                        { text: userDatas.emailid || "N/A", fontSize: 10 },
                      ],
                    ],
                  },

                  layout: "noBorders",
                },
              ],
            },
          ],
          columnGap: 80,
        },
        {
          text: "Diagnosis Information:",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true, fontSize: 10 },
                { text: "Diagnosis name", bold: true, fontSize: 10 },
                { text: "Description", bold: true, fontSize: 10 },
                { text: "Amount", bold: true, fontSize: 10 },
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
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              table: {
                body: [
                  [
                    { text: "Total Amount:", bold: true, alignment: "right" },
                    {
                      text: `GHC ${parseFloat(pdfData?.amount2 || 0).toFixed(
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
        {
          text: "Investigation Information:",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true, fontSize: 10 },
                { text: "Investigation name", bold: true, fontSize: 10 },
                { text: "Description", bold: true, fontSize: 10 },
                { text: "Amount", bold: true, fontSize: 10 },
              ],
              ...medicineRows12.map((row) =>
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
                    { text: "Total Amount:", bold: true, alignment: "right" },
                    {
                      text: `GHC ${parseFloat(pdfData?.amount2 || 0).toFixed(
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
        {
          text: "Medicine Information:",
          style: "sectionHeader",
          margin: [0, 30, 0, 8],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "40%", "40%", "10%"],
            body: [
              [
                { text: "Sr No", bold: true, fontSize: 10 },
                { text: "Medicine name", bold: true, fontSize: 10 },
                { text: "Description", bold: true, fontSize: 10 },
                { text: "Amount", bold: true, fontSize: 10 },
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
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              table: {
                body: [
                  [
                    { text: "Total Amount:", bold: true, alignment: "right" },
                    {
                      text: `GHC ${parseFloat(pdfData?.amount || 0).toFixed(
                        2
                      )}`,
                      alignment: "right",
                    },
                    { text: "Grand total Amount:", bold: true, alignment: "center" },
                    {
                      text: `GHC ${parseFloat(totalPrice || 0).toFixed(
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

        terms: {
          fontSize: 7,
          italics: true,
          color: "#888",
        },
        logos: {
          width: 40,
          height: 40,
        },
        invoiceTitles: {
          fontSize: 16,
          bold: true,
          color: "#000",
          marginTop: 20,
          alignment: "right",
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          color: "#154360",
        },
        footer: {
          fontSize: 11,
          italics: true,
          color: "#000",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Invoice.pdf");
  };

  const formik = useFormik({
    initialValues: {
      claimNumber: "",
      description: "",
      amount: "",
      amount2: "",
    },
    validationSchema,
    enableReinitialize: false,
    onSubmit: async (values, { resetForm }) => {
      getUploadCreateHanlder(values);
      const formData = new FormData();
      formData.append("claimNumber", values.claimNumber);
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      console.log("Submitting:", values);
    },
  });

  const uploadImageHandler = async (type, image) => {
    // const formData = new FormData();
    // formData.append("userPhoto", {
    //   uri: image?.path,
    //   name: image?.filename || "image.jpg",
    //   type: image?.mime,
    // });
    // // Add extra fields
    // formData.append("mimetype", image?.mime);
    // formData.append("filename", image?.filename || "image.jpg");
    // formData.append("doc_id", "123"); // Replace with actual doc_id
    // formData.append("doc_category", category);
  };

  const getUploadCreateHanlder = async (values) => {
    setLoading(true);
    console.log("selectedMedicines", selectedMedicines);
    console.log("totalMedicinePrice", totalMedicinePrice);
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.claimAdd,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          claim_amount:totalPrice ?? values?.amount,
          claim_description: values.description,
          claim_doc_ids: JSON?.stringify(upload), // converts to '["14","15"]'
          claim_number: values.claimNumber,
          policy_id: viewPolicyListDetails?.policy_id ?? null,
          medical_report:medicalReport,
          patient_type: selectedOption,
          diagnosis:medicalReportDeg,
          investigation:medicalReportDeg1,
          discharge_date: selectedDate,
        },
      });

      if (response.data.success === true) {
        toast.success(response?.data?.message);
        setLoading(false);

        setUpload([]);
        setUploadedImages([]);
        pdfDownload();
        navigate("/policies");
        // resetForm();
      } else {
        setLoading(false);

        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setLoading(false);

      console.log("asdfadsgfasd", error);
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.error("API Error:", error);
    }
  };

  const getDataHandlerWithToken = async () => {
    console.log("ADfasdfsadf");
    try {
      const token = window.localStorage.getItem("adminToken");
      const response = await axios({
        method: "GET",
        url: ApiConfig.profile,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success === true) {
        setProfile(response?.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMedicinesHandler = async () => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios.get(ApiConfig.preceptions, {
        headers: { authorization: `Bearer ${token}` },
                 params: {
          page: page,
          limit: 2000,
        },
      });

      if (response?.data?.success === true) {
        console.log("PDF Export Response:", response?.data?.data?.total);
        setMedicineOptions(response?.data?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching report list:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchMedicines = async () => {
  //     try {
  //       const token = localStorage.getItem("adminToken");
  //       const response = await axios.get(ApiConfig.preceptions, {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           page: 1,
  //           limit: 100,
  //         },
  //       });
  //       if (response?.data?.success === true) {
  //         console.log("Medicines fetched successfully:", response.data.data);
  //         setMedicineOptions(response?.data?.data?.data); // Adjust depending on your API response structure
  //       }
  //     } catch (error) {
  //       console.error("Error fetching medicines:", error);
  //     }
  //   };

  //   fetchMedicines();
  // }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!category) newErrors.category = "Category is required";
    if (!file) newErrors.file = "File is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});
    console.log("asgasdgasdgasdg", file);
    const formData = new FormData();

    formData.append("userPhoto", file);
    // formData.append("mimetype", file.type);
    // formData.append("filename", file.name);
    // formData.append("doc_id", file?.size); // You can replace with dynamic ID
    formData.append("doc_category", category);
    setLoading1(true);
    try {
      const token = window.localStorage.getItem("adminToken");

      const res = await axios.post(
        `${API_BASE_URL}api/v1/claims/uploads`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res?.data?.success === true) {
        console.log("Afgadsgsadfg");
        const imageUrl = res?.data?.data?.filename; // Adjust according to your actual response
        const docId = res?.data?.data?.doc_id?.toString(); // ensure it's a string
        if (imageUrl) {
          setUploadedImages((prev) => [
            ...prev,
            { url: imageUrl, doc_id: docId },
          ]);
          setUpload((prev) => [...prev, docId]);
        }
        // setUpload((prev) => [...prev, newDocId]);
        setLoading1(false);
        toast.success("File uploaded successfully");
        // setUpload(res?.data?.data);
      } else {
        toast.error("Something went wrong");
      }

      console.log("Upload success:", res.data);
      setLoading1(false);

      // Reset values and close dialog
      setCategory("");
      setFile(null);
      setOpen(false);
    } catch (error) {
      setLoading1(false);
      toast.error("Something went wrong");

      console.error("upload error ---->", error);
    }
  };

  const handleUpload22222 = async (e) => {
    const newErrors = {};
    if (!file) newErrors.file = "File is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});
    console.log("asgasdgasdgasdg", file);
    const formData = new FormData();

    formData.append("userPhoto", file);
    // formData.append("mimetype", file.type);
    // formData.append("filename", file.name);
    // formData.append("doc_id", file?.size); // You can replace with dynamic ID
    formData.append("doc_category", "receipt");
    setLoading1(true);
    try {
      const token = window.localStorage.getItem("adminToken");

      const res = await axios.post(
        `${API_BASE_URL}api/v1/claims/uploads`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res?.data?.success === true) {
        console.log("Afgadsgsadfg");
        const imageUrl = res?.data?.data?.filename; // Adjust according to your actual response
        const docId = res?.data?.data?.doc_id?.toString(); // ensure it's a string
        if (imageUrl) {
          setUploadedImages((prev) => [
            ...prev,
            { url: imageUrl, doc_id: docId },
          ]);
          setUpload((prev) => [...prev, docId]);
        }
        // setUpload((prev) => [...prev, newDocId]);
        setLoading1(false);
        toast.success("File uploaded successfully");
        // setUpload(res?.data?.data);
      } else {
        toast.error("Something went wrong");
      }

      console.log("Upload success:", res.data);
      setLoading1(false);

      // Reset values and close dialog
      setCategory("");
      setFile(null);
      setOpen(false);
    } catch (error) {
      setLoading1(false);
      toast.error("Something went wrong");

      console.error("upload error ---->", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const topClaimListingData = async () => {
    console.log("userDatas?.type_of_hospital");
    
    const token = window.localStorage.getItem("adminToken");
    const typeOfHospital = window.localStorage.getItem("typeOfHospital");

console.log("typeOfHospital",typeOfHospital);

    // Early return if profile?.type_of_hospital is missing

    try {
      const response = await axios.get(ApiConfig.diagnosisList, {
        headers: { authorization: `Bearer ${token}` },
        params: {
          page: page,
          limit: 2000,
        },
      });

      if (response?.data?.success === true) {
        console.log("PDF Export Response:", response?.data?.data?.total);
        setReportStored(
          response?.data?.data?.data?.filter((item) => item?.type === typeOfHos)
        );
      }
    } catch (error) {
      console.error("Error fetching report list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getDataHandlerWithToken();
  }, []);

  useEffect(() => {
    fetchMedicinesHandler();
    getDataHandlerWithToken();
    topClaimListingData();
  }, []);

  return (
    <>
      <Box sx={{ height: "100vh" }}>
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
          onClick={() => navigate("/policies")}
        >
          <IoArrowBackSharp size={25} />
        </Box>

        <Box
          maxWidth="650px"
          mx="auto"
          mt={4}
          p={3}
          boxShadow={3}
          borderRadius={2}
          bgcolor="#fff"
        >
          <Typography variant="h5" fontWeight={600} mb={1}>
            Create New Claim
          </Typography>

          <Typography variant="body1" mb={3}>
            {/* Raise a claim */}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {/* Policy ID - Readonly */}
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    //   label="Claim ID"
                    disabled={true}
                    name="ID"
                    value={viewPolicyListDetails?.policy_id ?? ""}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    style={{ color: "transparent" }}
                  >
                    Assign a claim number as per your convenience.
                  </Typography>
                </Grid>

                {/* Claim Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Claim Number"
                    name="claimNumber"
                    value={formik.values.claimNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.claimNumber &&
                      Boolean(formik.errors.claimNumber)
                    }
                    helperText={
                      formik.touched.claimNumber && formik.errors.claimNumber
                    }
                    FormHelperTextProps={{
                      style: {
                        color: "red",
                        fontSize: "0.7rem",
                        marginTop: "4px",
                        marginLeft: "0px",
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Assign a claim number as per your convenience.
                  </Typography>
                </Grid>
              </Box>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Claim description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  multiline
                  rows={4}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  sx={{ width: { xs: "100%", md: "600px" } }}
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  FormHelperTextProps={{
                    style: {
                      color: "red",
                      fontSize: "0.7rem",
                      marginTop: "4px",
                      marginLeft: "0px",
                    },
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Add a short explanation for the claim request.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Select Medicines</InputLabel>
                <Box sx={{}}>
                  <Autocomplete
                    multiple
                    options={medicineOptions || []}
                    getOptionLabel={(option) =>
                      `${option?.name} - ${option?.pre_type} - ${option?.med_type} - ${option?.description} - ${option?.amount} `
                    }
                    value={selectedMedicines?.map((id) =>
                      medicineOptions.find((m) => m?.id === id)
                    )}
                    onChange={(e, selectedOptions) => {
                      const selectedIds = selectedOptions.map(
                        (option) => option.id
                      );
                      setSelectedMedicines(selectedIds);

                      const total = selectedOptions.reduce((sum, med) => {
                        return sum + parseFloat(med?.amount || 0);
                      }, 0);

                      setTotalMedicinePrice(total);
                      formik.setFieldValue("amount", total.toFixed(2));
                      const simplifiedData = selectedOptions?.map(
                        ({ id, name, description, amount }) => ({
                          id,
                          name,
                          description,
                          amount,
                        })
                      );

                      // Convert to JSON string
                      const serialized = JSON?.stringify(simplifiedData);
                      setMedicalReport(serialized);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search medicine" />
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected
                        .slice(0, 2)
                        .map((option, index) => (
                          <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            key={option.id}
                          />
                        ))
                        .concat(
                          selected.length > 2 ? (
                            <Chip
                              key="extra"
                              label={`+${selected.length - 2} more`}
                            />
                          ) : (
                            []
                          )
                        )
                    }
                    sx={{ width: { xs: "280px", sm: "430px", md: "600px" } }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Select Diagnoses</InputLabel>
                <Box sx={{}}>
                  <Autocomplete
                    multiple
                    options={reportStored || []}
                    getOptionLabel={(option) =>
                      `${option?.name} - ${option?.description} - ${option?.amount} `
                    }
                    value={selectedDiag?.map((id) =>
                      reportStored.find((m) => m?.id === id)
                    )}
                    onChange={(e, selectedOptions) => {
                      const selectedIds = selectedOptions.map(
                        (option) => option.id
                      );
                      setSelectedDiag(selectedIds);

                      const total = selectedOptions.reduce((sum, med) => {
                        return sum + parseFloat(med?.amount || 0);
                      }, 0);

                      setTotalDiagosisPrice(total);
                      formik.setFieldValue("amount2", total.toFixed(2));

                      const simplifiedData = selectedOptions?.map(
                        ({ id, name, description, amount }) => ({
                          id,
                          name,
                          description,
                          amount,
                        })
                      );

                      // Convert to JSON string
                      const serialized = JSON?.stringify(simplifiedData);
                      setMedicalReportDeg(serialized);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search diagnoses" />
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected
                        .slice(0, 2)
                        .map((option, index) => (
                          <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            key={option.id}
                          />
                        ))
                        .concat(
                          selected.length > 2 ? (
                            <Chip
                              key="extra"
                              label={`+${selected.length - 2} more`}
                            />
                          ) : (
                            []
                          )
                        )
                    }
                    sx={{ width: { xs: "280px", sm: "430px", md: "600px" } }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Select Investigation</InputLabel>
                <Box sx={{}}>
                  <Autocomplete
                    multiple
                    options={reportStored || []}
                    getOptionLabel={(option) =>
                      `${option?.name} - ${option?.description} - ${option?.amount} `
                    }
                    value={selectedDiag1?.map((id) =>
                      reportStored.find((m) => m?.id === id)
                    )}
                    onChange={(e, selectedOptions) => {
                      const selectedIds = selectedOptions.map(
                        (option) => option.id
                      );
                      setSelectedDiag1(selectedIds);

                      const total = selectedOptions.reduce((sum, med) => {
                        return sum + parseFloat(med?.amount || 0);
                      }, 0);

                      setTotalDiagosisPrice1(total);
                      formik.setFieldValue("amount2", total.toFixed(2));

                      const simplifiedData = selectedOptions?.map(
                        ({ id, name, description, amount }) => ({
                          id,
                          name,
                          description,
                          amount,
                        })
                      );

                      // Convert to JSON string
                      const serialized = JSON?.stringify(simplifiedData);
                      setMedicalReportDeg1(serialized);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search investigation"
                      />
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected
                        .slice(0, 2)
                        .map((option, index) => (
                          <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            key={option.id}
                          />
                        ))
                        .concat(
                          selected.length > 2 ? (
                            <Chip
                              key="extra"
                              label={`+${selected.length - 2} more`}
                            />
                          ) : (
                            []
                          )
                        )
                    }
                    sx={{ width: { xs: "280px", sm: "430px", md: "600px" } }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Patient Type</InputLabel>
                <div style={{ position: "relative", width: "600px" }}>
                  <select
                    value={selectedOption}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      height: "55px",
                      padding: "10px",
                      fontSize: "17px",
                      color: selectedOption === "" ? "gray" : "black",
                      appearance: "none", // hide default arrow
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Inpatient">In Patient</option>
                    <option value="Outpatient">Out Patient</option>
                  </select>

                  {/* Custom Icon */}
                  <MdOutlineArrowDropDown
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#666",
                      fontSize: "23px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item={12}>
                <InputLabel sx={{ mb: 1 }}>Patient Discharge</InputLabel>
                <TextField
                  // label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  sx={{ width: { xs: "auto", sm: "600px" }, marginTop: "5px" }}
                />
              </Grid>

              {/* Full-width selected medicine display */}
              {/* {selectedMedicines?.length > 0 && (
                <Grid item xs={12}>
                  <Box mt={0} display="flex" flexWrap="wrap" gap={1}>
                    {selectedMedicines?.map((id) => {
                      const med = medicineOptions?.find((m) => m?.id === id);
                      if (!med) return null;
                      return (
                        <Box
                          key={id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "6px 12px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "20px",
                          }}
                        >
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {med?.name} - ${med?.amount}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              )} */}

              {/* Amount */}
              <Box mt={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Claim Amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    helperText={formik.touched.amount && formik.errors.amount}
                    sx={{ width: { xs: "100%", md: "600px" } }}
                    FormHelperTextProps={{
                      style: {
                        color: "red",
                        fontSize: "0.7rem",
                        marginTop: "4px",
                        marginLeft: "0px",
                      },
                    }}
                  />
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      mt={1}
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Mention the financial amount you wish to claim.
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Total Medicine Price: GHS {totalMedicinePrice}
                      </Typography>
                    </Box>
                    {/* <Box>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => pdfDownload()}
                        sx={{ textTransform: "capitalize", marginTop: "2rem" }}
                        disabled={
                          !formik.values.description || !formik.values.amount
                        }
                      >
                        Report
                      </Button>
                    </Box> */}
                  </Box>
                </Grid>
              </Box>

              <Box mt={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnosis Amount"
                    name="amount"
                    value={formik.values.amount2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.amount2 && Boolean(formik.errors.amount2)
                    }
                    helperText={formik.touched.amount2 && formik.errors.amount2}
                    sx={{ width: { xs: "100%", md: "600px" } }}
                    FormHelperTextProps={{
                      style: {
                        color: "red",
                        fontSize: "0.7rem",
                        marginTop: "4px",
                        marginLeft: "0px",
                      },
                    }}
                  />
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      mt={1}
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Mention the financial amount you wish to claim.
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Total Diagnosis Price: GHS {totalDiagosisPrice}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        Total Investigation Price: GHS {totalDiagosisPrice1}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => pdfDownload()}
                        sx={{ textTransform: "capitalize", marginTop: "2rem" }}
                        disabled={
                          !formik.values.description || !formik.values.amount
                        }
                      >
                        Report
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>

              {/* File Upload */}
              <Grid item xs={12}>
                <InputLabel>Upload Medical Document:</InputLabel>
                <Button variant="outlined" onClick={() => setOpen(true)}>
                  Select Files
                </Button>
              </Grid>

              {/* Submit Button */}
              {uploadedImages?.length > 0 && (
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  {uploadedImages?.map((img, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography>{img.url}</Typography>
                      {/* <img
                        src={`${IMAGEURL}uploads/${img.url}`}
                        // src={img.url}
                        alt={`Uploaded ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      /> */}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <InputLabel>Upload Document ID</InputLabel>

                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current.click()}
                >
                  Select Files
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);

                    if (selectedFile) {
                      const imageUrl = URL.createObjectURL(selectedFile);
                      setPreviewUrl(imageUrl);

                      setTimeout(() => {
                        handleUpload22222();
                        e.target.value = "";
                      }, 100);
                    }
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} mt={4}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#00b2ff",
                    textTransform: "none",
                    px: 4,
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: "500",
                    color: "#fff",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "#0090cc",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Claim"
                  )}
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
      </Box>
      {/* Modal Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 500 }}>File Upload</DialogTitle>

        <form onSubmit={handleUpload}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* Category Selection */}
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Select Category</InputLabel>
                <Select
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="medical_report">Medical Report</MenuItem>
                  <MenuItem value="receipt">Receipt</MenuItem>
                  <MenuItem value="prescription">Prescription</MenuItem>
                </Select>
                {errors.category && (
                  <Typography color="error" variant="caption">
                    {errors.category}
                  </Typography>
                )}
              </Grid>

              {/* File Upload */}
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Choose File</InputLabel>
                <input
                  type="file"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    if (selectedFile) {
                      const imageUrl = URL.createObjectURL(selectedFile);
                      setPreviewUrl(imageUrl);
                    }
                  }}
                  style={{ marginTop: 4 }}
                />
                {errors.file && (
                  <Typography color="error" variant="caption">
                    {errors.file}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpen(false)} color="primary">
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={uploadImageHandler}
            >
              {loading1 ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Upload"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
