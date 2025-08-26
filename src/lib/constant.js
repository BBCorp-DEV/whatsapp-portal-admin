export const exclusions = [
    // {
    //   title: "1. General Exclusions",
    //   items: [
    //     "Pre-existing conditions (subject to waiting periods)",
    //     "Cosmetic and elective procedures, including:",
    //     [
    //       "Cosmetic surgery for aesthetic purposes and reconstructive procedures"
    //     ],
    //     "Non-prescribed medications and supplements",
    //     "Over-the-counter medications and supplies",
    //     "Experimental or non-FDA-approved treatments",
    //     "Herbal/homeopathic treatments",
    //     "Diagnosis and treatment overseas",
    //     "Any benefit not specified within the selected benefit option",
    //   ],
    // },
    {
      // title: "4.2 Medical Devices & Equipment",
      items: [
        // "Medical devices for secondary management, such as:",
        [
          "Hearing aids, contact lenses, braces, elastic stockings, Zimmer frames, and wheelchairs",
          "Self-use medical devices (e.g., BP monitors, glucometers)"
        ],
      ],
    },
    {
      title: "4.3. Specific Treatments & Procedures",
      items: [
        "Investigations, treatments, and surgery for obesity, including slimming medications",
        "Endoscopic procedures (scoping procedures) unless pre-authorized",
        "Chiropractic procedures and alternative medicine",
        "Assisted reproduction, fertility treatment, and treatment of sexual dysfunction",
        "Termination of pregnancy except where there is an immediate threat to maternal life",
        "Rehabilitation treatments other than physiotherapy"
      ],
    },
    {
      title: "4.4 Public Health & Non-Medical Services",
      items: [
        "Treatment available as free public health services, including:",
        [
          "Immunization, TB, Buruli Ulcer, mental health/psychiatric conditions, VCT for HIV, trachoma, family planning, contraception, etc."
        ],
        "Medical examinations for non-medical purposes, such as:",
        [
          "Pre-marital medical examinations, pre-employment screenings, visa applications, etc."
        ],
        "Mortuary services"
      ]
    },
    // {
    //   title: "5. Accidents & Liabilities",
    //   items: [
    //     "Treatment of sickness or injury where another party is liable, such as:",
    //     [
    //       "Motor accidents, workman's compensation, or group accident policies"
    //     ],
    //     "Any expenses incurred due to:",
    //     [
    //       "Injury or illness caused by war, invasion, military operations, riots, or civil commotion",
    //       "Engagement in military, naval, or air force services"
    //     ]
    //   ]
    // },
    // {
    //   title: "6. Dental & Vision Exclusions",
    //   items: [
    //     "Dental exclusions, including:",
    //     [
    //       "Orthodontics (cosmetic dental surgery), dentures, artificial teeth, bridges, crowns, and braces"
    //     ],
    //     "Maternity and fertility treatments (unless covered under a specific plan)",
    //     "Dental and vision care (unless covered under a specific plan)"
    //   ]
    // }
  ];

export const policyExclusions = {
  introduction:[
    "The maximum age limit for the principal is 65 years",
    "Dependents have a maximum age limit of 25 years.",
  ],
  enrollment:[
    "Low-risk conditions (e.g., mild hypertension, controlled diabetes): 6 months waiting period",
    "Moderate-risk conditions (e.g., early-stage kidney disease, epilepsy): 9 months waiting period",
    "High-risk conditions (e.g., dialysis-dependent kidney disease, advanced heart disease): 12 months waiting period. After the waiting period, policyholders are eligible  for benefits as specified under their policy plan",
  ],
  benefits:[
    "Cosmetic Procedures: Includes cosmetic surgery, teeth whitening, and dental prosthetics.",
    "Alternative Medicine: Includes treatments falling under unorthodox or non-traditional medicine.",
    "Hospice & Home Care: Domiciliary or hospice care services.",
    "Congenital & Neonatal Care: Any neonatal services not listed under the defined neonatal benefits.",
    "Injuries & Conditions: Self-inflicted injuries, congenital abnormalities, and conditions resulting from war, epidemics, or riots.",
    "Weight & Substance-related Treatments: Includes weight loss programs, obesity treatments, and substance abuse rehabilitation.",
    "Infertility Treatments: All investigations and treatments related to infertility.",
    "Orthodontics & Advanced Dental: Includes orthodontic treatments and complex dental procedures.",
    "Advanced Investigations & Treatments: Advanced radiological investigations (e.g., C.T. scan, Myelogram, EEG), marrow biopsy, and skeletal surveys",
    "Prosthetic & Complex Surgeries: Prosthetic devices, pacemakers, orthopedic implants, heart and brain surgeries, cancer management, transplants, dialysis, and neurological surgeries",
    "Abortions: Induced abortions are not covered.",
    "Professional Risks: Professional sports-related injuries and injuries due to willful exposure to danger",
    "nfectious Diseases: Infectious diseases during an epidemic outbreak",
    "Non-covered Services: Any procedures, treatments, or investigations not explicitly mentioned in the benefit schedule"
  ],
  payments: [
    "Premiums must be paid on time to maintain active coverage.",
    "Late payments may result in suspension or cancellation of benefits.",
    "Premiums are non-refundable, except in cases of administrative errors.",
    "Plans automatically renew unless canceled before the renewal date."
  ],
  payments1: [
    "A copy of the medical report detailing the condition, diagnosis, and treatment.",
    "Original receipts itemizing consultation, investigations, procedures, and medications",
    "Pre-authorization number issued by UhuruCare",
  ],
  claims: [
    "7.1 Treatment Prior to Date of Commencement UhuruCare will not cover or pay for any treatment that was given before an enrollee’s commencement date of cover, after cancellation/termination of cover, or during any period for which UhuruCare has not received premiums",
    "Out-of-Network Reimbursements: If you receive emergency care outside the network, you must:",
    "Submit a claim request within 30 days",
    "Provide supporting medical documentation",
    "Claims are subject to verification and policy limits.",
    "Fraudulent claims will result in immediate policy termination."
  ],
  changes: [
    "These conditions apply to all UhuruCare health plans.",
    "UhuruCare reserves the right to review and update policy terms periodically",
    "By enrolling, the enrollee agrees to all terms outlined in this document."
  ],
  disputes: [
    "Disputes should first be addressed to UhuruCare Customer Support.",
    "If unresolved, disputes may be referred to arbitration or relevant regulatory authorities."
  ]
}

export const waitingPeriodData = [
  {
    title: "5.3 Maternity & Childbirth (If Applicable)",
    items: [
      "A 9-month waiting period applies for maternity benefits.",
      "Pregnancies confirmed before enrollment are not covered."
    ]
  },
  {
    title: "5.4 Specialized Treatments & Surgeries",
    items: [
      "A 90-day waiting period applies for elective surgeries, advanced diagnostics (MRI, CT scans), and specialist consultations, unless deemed medically necessary in an emergency",
     
    ]
  },
  // {
  //   title: "3. Maternity & Childbirth (If Applicable)",
  //   items: [
  //     "A 9-month waiting period applies for maternity benefits.",
  //     "Pregnancies confirmed before enrollment are not covered."
  //   ]
  // },
  // {
  //   title: "4. Specialized Treatments & Surgeries",
  //   items: [
  //     "A 90-day waiting period applies for elective surgeries, advanced diagnostics (MRI, CT scans), and specialist consultations, unless deemed medically necessary in an emergency."
  //   ]
  // },
  {
    title: "5.5 Exceptions",
    items: [
      "Accidents & emergencies are covered immediately with no waiting period.",
      "Policy upgrades do not reset waiting periods."
    ]
  }
];

export const cancellationData = [
  {
    title: "7.1 Treatment Prior to Date of Commencement",
    items: [
      "UhuruCare will not cover or pay for any treatment that was given before an enrollee’s commencement date of cover, after cancellation/termination of cover, or during any period for which UhuruCare has not received premiums"
    ]
  },
  {
    title: "7.2 Treatment Not Covered Under the Benefit Schedule",
    items: [
      "UhuruCare will not cover or pay for any treatment that is not specifically covered under the Benefit Schedule of the policy. Similarly,all plans do not cover consultations with unrecognized/unorthodox consultants, hospitals, family doctors, therapists, dental practitioners, or complementary medicine practitioners. In the same vein, complications from such unrecognized/unorthodox sources are not covered under any of the plans.",
     
    ]
  },
  {
    title: "7.3 Transferability",
    items: [
      "The plans are person-specific and non-transferable.",
     
    ]
  },
  {
    title: "7.4 Confidentiality",
    items: [
      "UhuruCare is committed to protecting the information of its enrollees and is bound by law and regulatory standards to maintain the privacy of enrollees’ medical information and records. UhuruCare also enforces strict policies to protect enrollee information among employees, providers, consultants, and business associates. Information collected at enrollment and other transactions may include biodata as well as medical history through claims anutilization data submitted from healthcare providers. UhuruCare may also access an enrollee’s medical records in furtherance of its role under the health plans, and enrollees consent to such access accordingly",
     
    ]
  },
  {
    title: "7.5 Categorization of Healthcare Facilities",
    items: [
      "Healthcare providers are categorized by UhuruCareto facilitate access to care. UhuruCare reserves the right to review this categorization periodically. Changes may include additions or deletions of healthcare providers from the general list or from specific plan provider lists. Enrollees must select their preferred hospital(s) from the list of in-network hospitals accessible under their plan. UhuruCare is not liable for care accessed from an in-network hospital that is not included in the enrollee’s plan. If UhuruCare chooses to cover such care, reimbursement will be limited to what would have been paid if the service had been accessed from a designated in-network hospital",
     
    ]
  },
  {
    title: "7.6 Liability",
    items: [
      "UhuruCare shall not be liable for any damages or losses arising from an enrollee’s failure to pay premiums as and when due",
     
    ]
  },
  {
    title: "7.6 Refunds",
    items: [
      "Enrollees must access care within UhuruCare’s network of providers and should notpay out-of-pocket for covered services. Reimbursement applies only in extreme emergency casesrequiring access to a non-network hospital, provided UhuruCare is notified within 72 hours for approval. Refunds will be issued only upon submission of:",
     
    ]
  },
  
];

