import { useState } from "react";
import {Plus, Edit2, Trash2 } from 'lucide-react';
const Courses = ({ courses, setCourses }) => {
  const [newCourse, setNewCourse] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');


  const addCourse = () => {
    if (newCourse.trim()) {
      const newCourseObj = {
        id: Date.now(),
        name: newCourse.trim()
      };
      setCourses([...courses, newCourseObj]);
      setNewCourse('');
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const startEditing = (course) => {
    setEditingId(course.id);
    setEditingName(course.name);
  };

  const saveEdit = () => {
    setCourses(courses.map(course => 
      course.id === editingId ? { ...course, name: editingName } : course
    ));
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        Courses
      </h2>
      
      {/* Add New Course */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Enter course name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
          >
            Add
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-2">
        {courses.map(course => (
          <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            {editingId === course.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium">{course.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(course)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
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

export default Courses