import "./App.css";
import { useState } from "react";
// import { Settings, BookOpen, UserPlus } from "lucide-react";
import CourseTypes from "./components/CourseTypes";
import Courses from "./components/Courses";
import CourseOfferings from "./components/CourseOfferings";
import StudentRegistration from "./components/StudentRegistration";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const App = () => {
  const [activeTab, setActiveTab] = useState("courseTypes");
  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: "Individual" },
    { id: 2, name: "Group" },
    { id: 3, name: "Special" },
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: "Hindi" },
    { id: 2, name: "English" },
    { id: 3, name: "Urdu" },
  ]);
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const tabs = [
    { id: "courseTypes", label: "Course Types"},
    { id: "courses", label: "Courses" },
    { id: "courseOfferings", label: "Course Offerings" },
    { id: "registration", label: "Registration" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "courseTypes":
        return (
          <CourseTypes
            courseTypes={courseTypes}
            setCourseTypes={setCourseTypes}
          />
        );
      case "courses":
        return <Courses courses={courses} setCourses={setCourses} />;
      case "courseOfferings":
        return (
          <CourseOfferings
            courseOfferings={courseOfferings}
            setCourseOfferings={setCourseOfferings}
            courses={courses}
            courseTypes={courseTypes}
          />
        );
      case "registration":
        return (
          <StudentRegistration
            registrations={registrations}
            setRegistrations={setRegistrations}
            courseOfferings={courseOfferings}
            courseTypes={courseTypes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header/>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
