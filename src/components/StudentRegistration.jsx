import { useState } from "react";
import { Plus, Edit2, Trash2 } from 'lucide-react';
const StudentRegistration = ({ registrations, setRegistrations, courseOfferings, courseTypes }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [filterCourseType, setFilterCourseType] = useState('');
  const [selectedOfferingForList, setSelectedOfferingForList] = useState('');

  const registerStudent = () => {
    if (studentName.trim() && selectedOffering) {
      const offering = courseOfferings.find(o => o.id === parseInt(selectedOffering));
      
      const newRegistration = {
        id: Date.now(),
        studentName: studentName.trim(),
        offeringId: offering.id,
        offeringName: `${offering.courseTypeName} - ${offering.courseName}`
      };
      
      setRegistrations([...registrations, newRegistration]);
      setStudentName('');
      setSelectedOffering('');
    }
  };

  const filteredOfferings = filterCourseType 
    ? courseOfferings.filter(offering => offering.courseTypeId === parseInt(filterCourseType))
    : courseOfferings;

  const registrationsForOffering = selectedOfferingForList
    ? registrations.filter(reg => reg.offeringId === parseInt(selectedOfferingForList))
    : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        Student Registration
      </h2>
      
      {/* Filter by Course Type */}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter by Course Type:</label>
        <select
          value={filterCourseType}
          onChange={(e) => setFilterCourseType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Course Types</option>
          {courseTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      {/* Register Student */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={selectedOffering}
            onChange={(e) => setSelectedOffering(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course Offering</option>
            {filteredOfferings.map(offering => (
              <option key={offering.id} value={offering.id}>
                {offering.courseTypeName} - {offering.courseName}
              </option>
            ))}
          </select>
          
          <button
            onClick={registerStudent}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center justify-center"
          >
            Register
          </button>
        </div>
      </div>

      {/* View Registrations */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">View Registrations for:</label>
        <select
          value={selectedOfferingForList}
          onChange={(e) => setSelectedOfferingForList(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a course offering</option>
          {courseOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>
              {offering.courseTypeName} - {offering.courseName}
            </option>
          ))}
        </select>
      </div>

      {/* Registered Students List */}
      {selectedOfferingForList && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            Registered Students ({registrationsForOffering.length})
          </h3>
          <div className="space-y-2">
            {registrationsForOffering.length === 0 ? (
              <p className="text-gray-500">No students registered for this course offering.</p>
            ) : (
              registrationsForOffering.map(registration => (
                <div key={registration.id} className="p-3 bg-gray-50 rounded-md">
                  <span className="font-medium">{registration.studentName}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegistration