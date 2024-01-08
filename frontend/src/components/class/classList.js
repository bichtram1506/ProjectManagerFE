import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from "react-modal";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newSpecializationId, setNewSpecializationId] = useState('');
  const [newTrainingSystemId, setNewTrainingSystemId] = useState('');
  const [newAcademicYearId, setNewAcademicYearId] = useState('');
  const [editClassId, setEditClassId] = useState('');
  const [editClassName, setEditClassName] = useState('');
  const [editClassCode, setEditClassCode] = useState('');
  const [editSpecializationId, setEditSpecializationId] = useState('');
  const [editTrainingSystemId, setEditTrainingSystemId] = useState('');
  const [editAcademicYearId, setEditAcademicYearId] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [trainingSystems, setTrainingSystems] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchSpecializations();
    fetchTrainingSystems();
    fetchAcademicYears();
  }, []);

  const fetchClasses = () => {
    axios
      .get('/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchSpecializations = () => {
    axios
      .get('/specializations')
      .then(response => {
        setSpecializations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchTrainingSystems = () => {
    axios
      .get('/training_systems')
      .then(response => {
        setTrainingSystems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchAcademicYears = () => {
    axios
      .get('/academic_years')
      .then(response => {
        setAcademicYears(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addClass = () => {
    axios
      .post('/classes/add', {
        name: newClassName,
        code: newClassCode,
        specialization_id: newSpecializationId,
        trainingsystem_id: newTrainingSystemId,
        academicyear_id: newAcademicYearId
      })
      .then(() => {
        setNewClassName('');
        setNewClassCode('');
        setNewSpecializationId('');
        setNewTrainingSystemId('');
        setNewAcademicYearId('');
        fetchClasses();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteClass = classId => {
    axios
      .delete(`/classes/${classId}`)
      .then(() => {
        fetchClasses();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editClass = classId => {
    setEditClassId(classId);
    const selectedClass = classes.find(cls => cls.id === classId);
    if (selectedClass) {
      setEditClassName(selectedClass.name);
      setEditClassCode(selectedClass.code);
      setEditSpecializationId(selectedClass.specialization_id);
      setEditTrainingSystemId(selectedClass.trainingsystem_id);
      setEditAcademicYearId(selectedClass.academicyear_id);
      openEditModal();
    }
  };

  const saveClass = () => {
    axios
      .put(`/classes/${editClassId}`, {
        name: editClassName,
        code: editClassCode,
        specialization_id: editSpecializationId,
        trainingsystem_id: editTrainingSystemId,
        academicyear_id: editAcademicYearId
      })
      .then(() => {
        setEditClassId('');
        setEditClassName('');
        setEditClassCode('');
        setEditSpecializationId('');
        setEditTrainingSystemId('');
        setEditAcademicYearId('');
        fetchClasses();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
   setIsEditModalOpen(false);
  };

  const isFormValid = () => {
    return (
      newClassName.trim() !== '' &&
      newClassCode.trim() !== '' &&
      newSpecializationId !== '' &&
      newTrainingSystemId !== '' &&
      newAcademicYearId !== ''
    );
  };
  return (
    <div>
      <Modal isOpen={isAddModalOpen} onRequestClose={closeAddModal}>
        <div className="modal-content">
          <h2>Chỉnh sửa</h2>
          <div className="form-group">
            <label>Tên lớp:</label>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mã lớp:</label>
            <input
              type="text"
              value={newClassCode}
              onChange={(e) => setNewClassCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Chuyên ngành:</label>
            <select
              value={newSpecializationId}
              onChange={(e) => setNewSpecializationId(e.target.value)}
            >
              <option value="">Chọn chuyên ngành</option>
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Hệ Đào Tạo:</label>
            <select
              value={newTrainingSystemId}
              onChange={(e) => setNewTrainingSystemId(e.target.value)}
            >
              <option value="">Chọn hệ đào tạo</option>
              {trainingSystems.map((trainingSystem) => (
                <option key={trainingSystem.id} value={trainingSystem.id}>
                  {trainingSystem.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Niên Khóa:</label>
            <select
              value={newAcademicYearId}
              onChange={(e) => setNewAcademicYearId(e.target.value)}
            >
              <option value="">Chọn niên khóa</option>
              {academicYears.map((academicYear) => (
                <option key={academicYear.id} value={academicYear.id}>
                  {`${academicYear.start_date} - ${academicYear.end_date}`}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addClass} className="save-button" disabled={!isFormValid()}>
            Lưu
          </button>
          <button onClick={closeAddModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>
  
      <h2>Danh sách lớp</h2>
      <button onClick={openAddModal} style={{ marginBottom: '10px' }}>
        Thêm mới
      </button>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Mã lớp</th>
            <th>Chuyên ngành</th>
            <th>Hệ đào tạo</th>
            <th>Niên khóa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.name}</td>
              <td>{cls.code}</td>
              <td>{specializations.find(spec => spec.id === cls.specialization_id)?.name}</td>
              <td>{trainingSystems.find(trains => trains.id === cls.trainingsystem_id)?.name}</td>
              <td>{academicYears.find(acY => acY.id === cls.academicyear_id)?.start_date} - {academicYears.find(acY => acY.id === cls.academicyear_id)?.end_date}</td>
              <td>
                <button className="edit-button" onClick={() => editClass(cls.id)}>
                  Sửa
                </button>
                <button className="delete-button" onClick={() => deleteClass(cls.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {editClassId && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <div className="modal-content">
            <h2>Edit Class</h2>
            <div className="form-group">
              <label htmlFor="className">Name:</label>
              <input
                type="text"
                id="className"
                value={editClassName}
                onChange={(e) => setEditClassName(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label htmlFor="classCode">Code:</label>
            <input
              type="text"
              id="classCode"
              value={editClassCode}
              onChange={(e) => setEditClassCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="classSpecialization">Specialization:</label>
            <select
              id="classSpecialization"
              value={editSpecializationId}
              onChange={(e) => setEditSpecializationId(e.target.value)}
            >
              <option value="">Select specialization</option>
              {specializations.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="classTrainingSystem">Training System:</label>
            <select
              id="classTrainingSystem"
              value={editTrainingSystemId}
              onChange={(e) => setEditTrainingSystemId(e.target.value)}
            >
              <option value="">Select training system</option>
              {trainingSystems.map((trainingSystem) => (
                <option key={trainingSystem.id} value={trainingSystem.id}>
                  {trainingSystem.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="classAcademicYear">Academic Year:</label>
            <select
              id="classAcademicYear"
              value={editAcademicYearId}
              onChange={(e) => setEditAcademicYearId(e.target.value)}
            >
              <option value="">Select academic year</option>
              {academicYears.map((academicYear) => (
                <option key={academicYear.id} value={academicYear.id}>
                  {`${academicYear.start_date} - ${academicYear.end_date}`}
                </option>
              ))}
            </select>
          </div>
          <button onClick={saveClass} className="save-button">
            Save
          </button>
          <button onClick={closeEditModal} className="cancel-button">
            Close
          </button>
        </div>
      </Modal>
    )}
  </div>
  );
};
export default ClassList;
