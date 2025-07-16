import { useState } from "react";
import { Plus, Edit2, Trash2 } from 'lucide-react';
const CourseOfferings = ({ courseOfferings, setCourseOfferings, courses, courseTypes }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingCourse, setEditingCourse] = useState('');
  const [editingType, setEditingType] = useState('');

  const addCourseOffering = () => {
    if (selectedCourse && selectedCourseType) {
      const course = courses.find(c => c.id === parseInt(selectedCourse));
      const courseType = courseTypes.find(ct => ct.id === parseInt(selectedCourseType));
      
      const newOffering = {
        id: Date.now(),
        courseId: course.id,
        courseName: course.name,
        courseTypeId: courseType.id,
        courseTypeName: courseType.name
      };
      
      setCourseOfferings([...courseOfferings, newOffering]);
      setSelectedCourse('');
      setSelectedCourseType('');
    }
  };

  const deleteCourseOffering = (id) => {
    setCourseOfferings(courseOfferings.filter(offering => offering.id !== id));
  };

  const startEditing = (offering) => {
    setEditingId(offering.id);
    setEditingCourse(offering.courseId.toString());
    setEditingType(offering.courseTypeId.toString());
  };

  const saveEdit = () => {
    const course = courses.find(c => c.id === parseInt(editingCourse));
    const courseType = courseTypes.find(ct => ct.id === parseInt(editingType));
    
    setCourseOfferings(courseOfferings.map(offering => 
      offering.id === editingId ? {
        ...offering,
        courseId: course.id,
        courseName: course.name,
        courseTypeId: courseType.id,
        courseTypeName: courseType.name
      } : offering
    ));
    setEditingId(null);
    setEditingCourse('');
    setEditingType('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        Course Offerings
      </h2>
      
      {/* Add New Course Offering */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCourseType}
            onChange={(e) => setSelectedCourseType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course Type</option>
            {courseTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          
          <button
            onClick={addCourseOffering}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
          >
            Add
          </button>
        </div>
      </div>

      {/* Course Offerings List */}
      <div className="space-y-2">
        {courseOfferings.map(offering => (
          <div key={offering.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            {editingId === offering.id ? (
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <select
                  value={editingCourse}
                  onChange={(e) => setEditingCourse(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded"
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
                <select
                  value={editingType}
                  onChange={(e) => setEditingType(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded"
                >
                  {courseTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium">{offering.courseTypeName} - {offering.courseName}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(offering)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteCourseOffering(offering.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CourseOfferings;