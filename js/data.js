/* Update this file to customize the portfolio content. */
window.PORTFOLIO_DATA = {
  owner: {
    name: "Shivannagowda Patil",
    email: "shivannagowdapolicepatil@gmail.com",
    location: "Kalaburagi, Karnataka",
    phone: "",
    education: "B.Tech Computer Science & Design, Sharnbasva University",
    roles: ["Full-Stack Developer", "AI/ML Engineer", "Problem Solver"]
  },
  projects: [
    {
      title: "Fraud Transaction Detection System",
      summary: "An imbalanced transaction classification pipeline with 95%+ reported accuracy, explainable predictions, and a Flask API for real-time scoring.",
      description: "A binary classification workflow designed for imbalanced transaction data. It uses SMOTE to address class imbalance, Logistic Regression for scoring, a Flask REST API for real-time fraud predictions, and SHAP to make model behavior easier to understand. The portfolio reports 95%+ accuracy.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Logistic Regression", "SMOTE", "Flask API", "SHAP"],
      github: "",
      live: ""
    },
    {
      title: "Car Price Prediction System",
      summary: "A Random Forest regression workflow with a Flask API and React frontend, tested on a 10,000-row dataset.",
      description: "An end-to-end car price prediction workflow covering data preparation, feature engineering, Random Forest model training, and evaluation. A Flask API serves real-time inference to a React frontend. The portfolio describes testing with a 10,000-row dataset.",
      technologies: ["Python", "Random Forest", "Scikit-learn", "Flask API", "React", "Pandas"],
      github: "",
      live: ""
    },
    {
      title: "Personal Portfolio Website",
      summary: "A Django portfolio with project showcases, skills, experience, and role-based access.",
      description: "A Django web application for presenting projects, skills, experience, and certificates. It uses Bootstrap and SQLite, with role-based viewer access and admin-only content management.",
      technologies: ["Django", "Bootstrap", "SQLite", "Role-based access"],
      github: "",
      live: ""
    }
  ],
  experience: [
    {
      role: "AI/ML Intern",
      company: "Kalpas Innovation",
      location: "",
      dates: "August 2026 – Present",
      description: "Researched, built, and deployed a multilingual OCR system supporting Indian regional languages for real-time text extraction. Developed and deployed the OCR model as a Flask REST API and tested it end-to-end on printed and handwritten text images. Owned the workflow from model research through API deployment and testing."
    },
    {
      role: "Frontend Engineering Intern",
      company: "Labmentix",
      location: "Remote",
      dates: "October – November 2025",
      description: "Built reusable React components, reduced redundant CSS, optimized Lighthouse performance, and added role-based UI restrictions."
    }
  ],
  skills: [
    {
      category: "Languages",
      items: [
        { name: "Python", level: 90 }, { name: "Java", level: 72 }, { name: "C", level: 68 },
        { name: "JavaScript", level: 82 }, { name: "HTML5", level: 92 }, { name: "CSS3", level: 88 }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React.js", level: 78 }, { name: "Component-Based Architecture", level: 82 },
        { name: "Lighthouse Optimization", level: 74 }
      ]
    },
    {
      category: "Backend & ML",
      items: [
        { name: "Flask", level: 82 }, { name: "Django", level: 78 }, { name: "REST APIs", level: 82 },
        { name: "Scikit-learn", level: 78 }, { name: "Random Forest", level: 75 }, { name: "Pandas", level: 80 }
      ]
    },
    {
      category: "Cloud & Security",
      items: [
        { name: "AWS EC2", level: 68 }, { name: "AWS S3", level: 68 },
        { name: "AWS IAM", level: 65 }, { name: "RBAC", level: 75 }
      ]
    }
  ]
};
