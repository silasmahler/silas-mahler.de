/* Portfolio Configuration - TypeScript Version */

import emoji from "react-easy-emoji";
import fhdoLogo from "./assets/images/fhdo-logo.png";
import kreinnLogo from "./assets/images/kreinn.png";
import zeitmatroseLogo from "./assets/images/zeitmatrose-logo.svg";
import capgeminiLogo from "./assets/images/capgemini.png";
import appsAssociatesLogo from "./assets/images/appsassociates.png";
import adessoLogo from "./assets/images/adesso.png";
import dohackLogo from "./assets/images/dohack.png";
import adeprecatedLogo from "./assets/images/adeprecated.png";
import profilePhoto from "./assets/images/profile.jpg";

// Illustration Configuration
export const illustration = {
  animated: true // set to false to use static SVG
};

// Greeting Section Configuration
export const greeting = {
  username: "Silas Mahler",
  title: "Hi, I'm Silas Mahler",
  subTitle: emoji(
    "Senior Delivery Architect – Cloud & DevOps. I advise customers on architecture, security, and solution design for cloud-native AWS systems. " +
    "I specialize in Infrastructure as Code (IaC) with Terraform and Packer, AWS cloud architecture, and DevOps automation. " +
    "As a Certified Terraform Associate and AWS Certified professional, I optimize cloud infrastructures for scalability, security, and cost efficiency. " +
    "With expertise in Java-based microservices, the Spring ecosystem, and CI/CD workflows, I ensure seamless integration and high-performance delivery. 🚀"
  ),
  resumeLink: "",
  displayGreeting: true, // Set false to hide this section, defaults to true
  profileImage: profilePhoto
};

// Social Media Links Configuration
export const socialMediaLinks = {
  github: "https://github.com/silasmahler",
  linkedin: "https://www.linkedin.com/in/silas-mahler-b1b8aa127/",
  gmail: "info@silas-mahler.de",
  gitlab: "https://gitlab.com/silasmahler",
  facebook: "https://www.facebook.com/silas.mahler",
  twitter: "https://twitter.com/SilasMahler",
  display: true // Set true to display this section, defaults to false
};

// Skills Section Configuration
export const skillsSection = {
  title: "What I do",
  subTitle: "Senior Cloud Architect",
  skills: [
    emoji(
      "⚡ Consulting, design, and implementation of AWS cloud infrastructures for software migrations"
    ),
    emoji(
      "⚡ Infrastructure as Code (IaC) with Terraform, as well as DevOps build tools and workflows"
    ),
    emoji(
      "⚡ Expertise in cloud system architectures, Java-based microservices, and the Spring ecosystem and a focus on modular architectures"
    )
  ],
  softwareSkills: [
    {
      skillName: "AWS",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Terraform",
      fontAwesomeClassname: "fas fa-code"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "Spring Boot",
      fontAwesomeClassname: "fas fa-leaf"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "Jenkins",
      fontAwesomeClassname: "fab fa-jenkins"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section Configuration
export const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "FH Dortmund",
      logo: fhdoLogo,
      subHeader: "M.Sc. Informatik",
      duration: "2023",
      desc: "Master of Science in Computer Science",
      descBullets: []
    },
    {
      schoolName: "FH Dortmund",
      logo: fhdoLogo,
      subHeader: "B.Sc. Informatik",
      duration: "2018",
      desc: "Bachelor of Science in Computer Science",
      descBullets: []
    }
  ]
};

// Tech Stack Configuration
export const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Cloud Architecture (AWS)",
      progressPercentage: "95%"
    },
    {
      Stack: "Infrastructure as Code (Terraform)",
      progressPercentage: "95%"
    },
    {
      Stack: "DevOps & Automation",
      progressPercentage: "90%"
    },
    {
      Stack: "Java / Spring",
      progressPercentage: "85%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section
};

// Work Experience Configuration
export const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      companyKey: "capgemini",
      company: "Capgemini",
      companylogo: capgeminiLogo,
      date: "2024 – current"
    },
    {
      companyKey: "kreinn",
      company: "KreInn GmbH",
      companylogo: kreinnLogo,
      date: "2020 – current"
    },
    {
      companyKey: "appsAssociates",
      company: "Apps Associates GmbH",
      companylogo: appsAssociatesLogo,
      date: "2021 – 2024"
    },
    {
      companyKey: "adesso",
      company: "adesso SE",
      companylogo: adessoLogo,
      date: "2017 – 2020"
    },
    {
      companyKey: "fhdo",
      company: "FH Dortmund",
      companylogo: fhdoLogo,
      date: "2015 – 2017"
    }
  ]
};

// Certifications Configuration
export const certifications = {
  display: true,
  certifications: [
    {
      title: "HashiCorp Certified: Terraform Associate (003)",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Machine Learning",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Data Analytics",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Serverless Developer",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Security",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Networking",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Solutions Architect",
      date: "2024"
    },
    {
      title: "AWS Cloud Quest: Cloud Practitioner",
      date: "2024"
    },
    {
      title: "HashiCorp Certified: Terraform Associate",
      date: "2022"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      date: "2021"
    }
  ]
};

// Open Source Configuration
export const openSource = {
  title: "Open Source Contributions",
  subtitle: "Aktive Beiträge zu verschiedenen Open-Source-Projekten. Weitere Projekte und Aktivitäten auf GitHub.",
  showGithubProfile: "true", // Set true or false to show Contact profile using Github
  display: false // Set false to hide this section, defaults to true
};

// Big Projects Configuration
export const bigProjects = {
  title: "Big Projects",
  subtitle: "Organizations I helped build or contribute to",
  projects: [
    {
      image: kreinnLogo,
      projectKey: "kreinn",
      footerLink: [
        {
          nameKey: "link",
          url: "https://kreinn.de/"
        }
      ]
    },
    {
      image: zeitmatroseLogo,
      projectKey: "zeitmatrose",
      footerLink: [
        {
          nameKey: "link",
          url: "https://zeitmatrose.de/"
        }
      ]
    },
    {
      image: dohackLogo,
      projectKey: "dohack",
      footerLink: [
        {
          nameKey: "linkYoutube",
          url: "https://www.youtube.com/@dohack6855"
        }
      ]
    },
    {
      image: adeprecatedLogo,
      projectKey: "deprecated",
      footerLink: [
        {
          nameKey: "link",
          url: "https://beacons.page/alreadydeprecated"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section Configuration
export const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "Check out our Tech-Podcast! :)",
  podcast: [
    "https://beacons.page/alreadydeprecated"
  ],
  display: true // Set false to hide this section, defaults to true
};

// Contact Information Configuration
export const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "If you want to discuss a project or exchange ideas about technologies, feel free to contact me!",
  number: "",
  email_address: "info@silas-mahler.de"
};

// Twitter Configuration
export const twitterDetails = {
  userName: "silasmahler", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};