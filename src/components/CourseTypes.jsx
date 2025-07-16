import React, { useState } from 'react';
import {  Edit2, Trash2 } from 'lucide-react';

const CourseTypes = ({ courseTypes, setCourseTypes }) => {
  const [newCourseType, setNewCourseType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const addCourseType = () => {
    if (newCourseType.trim()) {
      const newType = {
        id: Date.now(),
        name: newCourseType.trim()
      };
      setCourseTypes([...courseTypes, newType]);
      setNewCourseType('');
    }
  };

  const deleteCourseType = (id) => {
    setCourseTypes(courseTypes.filter(type => type.id !== id));
  };

  const startEditing = (type) => {
    setEditingId(type.id);
    setEditingName(type.name);
  };

  const saveEdit = () => {
    setCourseTypes(courseTypes.map(type => 
      type.id === editingId ? { ...type, name: editingName } : type
    ));
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        Course Types
      </h2>
      
      {/* Add New Course Type */}

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCourseType}
            onChange={(e) => setNewCourseType(e.target.value)}
            placeholder="Enter course type name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCourseType}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
          >
            Add
          </button>
        </div>
      </div>

      {/* Course Types List */}
      <div className="space-y-2">
        {courseTypes.map(type => (
          <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            {editingId === type.id ? (
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
                <span className="font-medium">{type.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(type)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteCourseType(type.id)}
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

export default CourseTypes