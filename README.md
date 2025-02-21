# **📊 Dynamic Drag-and-Drop Dashboard**

## **📌 Installed Packages**
This project was built using the following technologies and dependencies:

### **Core Frameworks & Libraries**
- **React.js** – Frontend framework
- **Vite** – Fast build tool for React projects

### **State Management**
- **Zustand** – Lightweight state management

### **Drag-and-Drop Functionality**
- **React-Grid-Layout** – Drag & resize dashboard widgets

### **Data Visualization**
- **Recharts** – Charts & graphs for analytics

### **Styling**
- **Tailwind CSS** – Modern utility-first CSS framework
- **Material UI** – Icons & UI components

### **Other Dependencies**
- **React-Resizable** – Resizable components
- **React-Draggable** – Additional drag-and-drop support


## **🛠️ How This Project Was Set Up**
Follow these steps to set up this project from scratch:

### **1️-Initialize the Project**
```sh
npm create vite@latest my-dashboard --template react
cd my-dashboard

2️-Install Dependencies
npm install react-grid-layout zustand recharts @mui/icons-material tailwindcss react-resizable

3️-Set Up Tailwind CSS
npx tailwindcss init -p

   -- Edit tailwind.config.js:
    module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: { extend: {} },
    plugins: [],
};
    --Add Tailwind styles to index.css:
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

4️- Set Up Zustand for State Management
        Create store.js and add:


import create from "zustand";

export const useDashboardStore = create((set) => ({
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { darkMode: newMode };
    }),
}));

💻 How to Set Up This Project Locally
Follow these steps to run this project on your local machine.

1️-Clone the Repository

    git clone https://github.com/your-username/dynamic-dashboard.git
    cd dynamic-dashboard

2️-Install Dependencies

" npm install "

3️-Run the Development Server

" npm run dev "
                                                Your app will be running at http://localhost:5173/.

