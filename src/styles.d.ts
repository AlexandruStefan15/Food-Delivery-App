// Assets
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.webp";

// CSS/SCSS Modules
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Global CSS/SCSS
declare module "*.scss";
declare module "*.css";


