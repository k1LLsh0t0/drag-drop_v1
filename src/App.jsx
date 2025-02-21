import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { useDashboardStore } from "./store";
import ChartWidget from "./components/ChartWidget";
import TableWidget from "./components/TableWidget";
import SettingsPanel from "./components/SettingsPanel";
import {
  DarkMode,
  LightMode,
  Dashboard,
  Menu,
  BarChart,
  TableChart,
  Logout,
} from "@mui/icons-material";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.css";
import "./App.css";

const userProfilePic = "https://api.dicebear.com/7.x/adventurer/svg"; //Avatar

const generateLayout = (widgets) => {
  return widgets.map((widget, index) => ({
    i: widget.id,
    x: (index % 3) * 4, // Places widgets in columns 
    y: Math.floor(index / 3) * 3, // Increased row height to avoid overlap
    w: 4,
    h: 3, // Increased height for better spacing
    minW: 2,
    minH: 2,
  }));
};

const App = () => {
  const { darkMode, toggleDarkMode } = useDashboardStore();
  const [widgets, setWidgets] = useState([
    { id: "chart1", type: "chart" },
    { id: "table1", type: "table" },
  ]);
  const [layout, setLayout] = useState(generateLayout(widgets));

  // Load Saved Layout & Widgets from LocalStorage
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    const savedLayout = localStorage.getItem("dashboardLayout");

    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }

    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  // Update LocalStorage on Widget Changes
  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
    setLayout(generateLayout(widgets)); // Recalculate layout
  }, [widgets]);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);


  const addWidget = (type) => {
    setWidgets((prevWidgets) => {
      const newId = `widget${prevWidgets.length + 1}`;
      if (prevWidgets.some((widget) => widget.id === newId)) return prevWidgets;
      return [...prevWidgets, { id: newId, type }];
    });
  };

 
  const removeWidget = (id) => {
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.filter((item) => item.i !== id);
      localStorage.setItem("dashboardLayout", JSON.stringify(updatedLayout));
      return updatedLayout;
    });
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <Menu className="sidebar-icon" />
          <Dashboard className="sidebar-icon" />
          <BarChart className="sidebar-icon" />
          <TableChart className="sidebar-icon" />

          {/* Profile & Logout */}
          <div className="sidebar-footer">
            <img src={userProfilePic} alt="User" className="profile-pic" />
            <Logout className="sidebar-icon logout-icon" titleAccess="Logout" />
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          <div className="dashboard-header">
            <div className="title-container">
              <h1 className="dashboard-title">
                <Dashboard fontSize="large" /> DashBoard
              </h1>
            </div>
            <button onClick={toggleDarkMode} className="toggle-button">
              {darkMode ? <DarkMode /> : <LightMode />}
              {darkMode ? "Dark Mode" : "Light Mode"}
            </button>
          </div>

          <SettingsPanel addWidget={addWidget} />
          <div className="container mx-auto p-4">
            <GridLayout
              className="layout"
              layout={layout}
              cols={12}
              rowHeight={140} // Increased row height for spacing
              width={window.innerWidth - 120}
              margin={[20, 20]} // Adds spacing between widgets (X, Y)
              containerPadding={[20, 20]} // Adds padding to the grid
              onLayoutChange={(newLayout) => {
                setLayout(newLayout);
                localStorage.setItem("dashboardLayout", JSON.stringify(newLayout));
              }}
              draggableHandle=".drag-handle"
              isResizable={true}
              isDraggable={true}
              compactType="vertical" 
              preventCollision={true} // Allows dynamic spacing
            >
              {widgets.map((widget) => (
                <div key={widget.id}
                  data-grid={layout.find((item) => item.i === widget.id) || { x: 0, y: Infinity, w: 4, h: 3 }}
                  className="p-2 drag-handle">
                  <div className="widget-container">
                    <button onClick={() => removeWidget(widget.id)} className="close-button">×</button>
                    {widget.type === "chart" && <ChartWidget />}
                    {widget.type === "table" && <TableWidget />}
                  </div>
                </div>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
     {/*Footer */}
      <footer className="dashboard-footer">
        <p>Designed & Built by Avinash Singh</p>
      </footer>


    </>
    
    

  );
};

export default App;
