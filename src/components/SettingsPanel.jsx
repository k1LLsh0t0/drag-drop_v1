const SettingsPanel = ({ addWidget }) => {
    return (
        <div className="settings-panel p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Settings</h2>
            <button onClick={() => addWidget("chart")} className="add-button px-4 py-2 bg-green-500 text-white rounded-full mx-2 hover:bg-green-600 transition-all">
                Add Chart
            </button>
            <button onClick={() => addWidget("table")} className="add-button px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
                Add Table
            </button>
        </div>
    );
};

export default SettingsPanel;
