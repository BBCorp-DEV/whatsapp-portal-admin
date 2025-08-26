import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiConfig from "../../Auth/ApiConfig";
import { AuthContext } from "../../Auth/context/Auth";

const Enroll = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const { enrollment, setEnrollment } = useContext(AuthContext);

  useEffect(() => {
    getPlansHandler();
  }, []);

  const getPlansHandler = async () => {
    try {
      const response = await axios.get(ApiConfig.plans);
      if (response?.data?.success) {
        setPlans(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      plan_id: enrollment?.plan_id || "",
      policy_enroll_for: enrollment?.policy_enroll_for || "",
    },
    validationSchema: Yup.object({
      plan_id: Yup.string().required("Please select a plan"),
      policy_enroll_for: Yup.string().required("Please select an enrollment type"),
    }),
    onSubmit: (values) => {
      setEnrollment((prev) => ({
        ...prev,
        ...values,
      }));
      navigate("/enrollLogin");
    },
  });

  return (
    <Box>
      <Box sx={{ bgcolor: "#0077cc", p: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
          UhuruCare Plan Enrollment
        </Typography>
      </Box>

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
          Step 1: Choose a Plan & Coverage Type
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
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
        {/* Plan Select */}
        <FormControl fullWidth sx={{ my: 3 }} error={formik.touched.plan_id && Boolean(formik.errors.plan_id)}>
          <InputLabel id="plan-label">Select a plan:</InputLabel>
          <Select
            labelId="plan-label"
            id="plan_id"
            name="plan_id"
            value={formik.values.plan_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Select a plan:"
          >
            <MenuItem value="">
              <em>Select a policy</em>
            </MenuItem>
            {plans?.map((item, index) => (
              <MenuItem key={index} value={item?.plan_id}>
                {item?.plan_name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.plan_id && formik.errors.plan_id && (
            <FormHelperText sx={{marginLeft:'0px'}}>{formik.errors.plan_id}</FormHelperText>
          )}
        </FormControl>

        {/* Enrollment Type */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Select who you are enrolling the plan for:
        </Typography>

        <FormControl
          component="fieldset"
          error={formik.touched.policy_enroll_for && Boolean(formik.errors.policy_enroll_for)}
        >
          <RadioGroup
            id="policy_enroll_for"
            name="policy_enroll_for"
            value={formik.values.policy_enroll_for}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <FormControlLabel value="self" control={<Radio />} label="Self (Individual Coverage)" />
            <FormControlLabel
              value="someone"
              control={<Radio />}
              label="Someone Else (Enroll on behalf of another person)"
            />
          </RadioGroup>
          {formik.touched.policy_enroll_for && formik.errors.policy_enroll_for && (
            <FormHelperText sx={{marginLeft:'0px'}}>{formik.errors.policy_enroll_for}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            sx={{
              background: "#03A7E5",
              color: "#fff !important",
              textTransform: "capitalize !important",
            }}
            startIcon={<ArrowForwardIcon />}
          >
            Next Step
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Enroll;
