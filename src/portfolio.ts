/* Site content. Text lives in src/locales, facts and links live here. */

import kreinnLogo from "./assets/images/kreinn-cropped.png";
import zeitmatroseLogo from "./assets/images/zeitmatrose-logo-light.svg";
import dohackLogo from "./assets/images/dohack.png";
import adeprecatedLogo from "./assets/images/adeprecated-cropped.png";
import profilePhoto from "./assets/images/profile.jpg";

export const name = "Silas Mahler";
// Contact runs via KreInn GmbH (same as the imprint on kreinn.de/legal-notice)
export const email = "info@kreinn.de";
export const phone = "0231-6186842";
export const photo = profilePhoto;

export const socialLinks = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/silas-mahler-b1b8aa127/"
  },
  {label: "GitHub", url: "https://github.com/silasmahler"},
  {label: "GitLab", url: "https://gitlab.com/silasmahler"},
  {label: "X / Twitter", url: "https://twitter.com/SilasMahler"},
  {label: "Facebook", url: "https://www.facebook.com/silas.mahler"}
];

export const tools = [
  "AWS",
  "Terraform",
  "Packer",
  "Docker",
  "Java",
  "Spring Boot",
  "Linux",
  "Git",
  "Jenkins",
  "Python",
  "JavaScript"
];

// Bullet keys per company, in the order they were shown before.
export const experience = [
  {
    key: "capgemini",
    company: "Capgemini",
    from: "2024",
    to: null,
    bullets: [
      "finops",
      "adas",
      "waf",
      "sovereignCloud",
      "modernization",
      "iac",
      "security",
      "migration",
      "coordination",
      "devops"
    ].map(b => `bullets.${b}`)
  },
  {
    key: "kreinn",
    company: "KreInn GmbH",
    from: "2020",
    to: null,
    bullets: ["bullet1", "bullet2", "bullet3", "bullet4"]
  },
  {
    key: "appsAssociates",
    company: "Apps Associates GmbH",
    from: "2021",
    to: "2024",
    bullets: [
      "ifs",
      "university",
      "football",
      "carRental",
      "energy",
      "payment",
      "consulting",
      "ims",
      "terraform",
      "training"
    ].map(b => `bullets.${b}`)
  },
  {
    key: "adesso",
    company: "adesso SE",
    from: "2017",
    to: "2020",
    bullets: ["bullet1", "bullet2", "bullet3"]
  },
  {
    key: "fhdo",
    company: "FH Dortmund",
    from: "2015",
    to: "2017",
    bullets: ["bullet1", "bullet2", "bullet3"]
  }
];

export const education = [
  {
    school: "FH Dortmund",
    degree: "M.Sc. Informatik",
    descKey: "masterDesc",
    year: "2023"
  },
  {
    school: "FH Dortmund",
    degree: "B.Sc. Informatik",
    descKey: "bachelorDesc",
    year: "2018"
  }
];

export const certifications = [
  {title: "HashiCorp Certified: Terraform Associate (003)", year: "2024"},
  {title: "AWS Cloud Quest: Machine Learning", year: "2024"},
  {title: "AWS Cloud Quest: Data Analytics", year: "2024"},
  {title: "AWS Cloud Quest: Serverless Developer", year: "2024"},
  {title: "AWS Cloud Quest: Security", year: "2024"},
  {title: "AWS Cloud Quest: Networking", year: "2024"},
  {title: "AWS Cloud Quest: Solutions Architect", year: "2024"},
  {title: "AWS Cloud Quest: Cloud Practitioner", year: "2024"},
  {title: "HashiCorp Certified: Terraform Associate", year: "2022"},
  {title: "AWS Certified Cloud Practitioner", year: "2021"}
];

export const projects = [
  {
    key: "kreinn",
    logo: kreinnLogo,
    logoClass: "mx-2 h-8",
    url: "https://kreinn.de/",
    linkKey: "link"
  },
  {
    key: "zeitmatrose",
    logo: zeitmatroseLogo,
    logoClass: "mx-2 h-8",
    url: "https://zeitmatrose.de/",
    linkKey: "link"
  },
  {
    key: "dohack",
    logo: dohackLogo,
    logoClass: "h-full",
    url: "https://www.youtube.com/@dohack6855",
    linkKey: "linkYoutube"
  },
  {
    key: "deprecated",
    logo: adeprecatedLogo,
    logoClass: "h-full rounded-lg",
    url: "https://beacons.page/alreadydeprecated",
    linkKey: "link"
  }
];

// Pinned GitHub repos come from public/profile.json, written by fetch.mjs.
// Hidden as before, because profile.json currently holds sample data.
export const showGithubRepos = false;
