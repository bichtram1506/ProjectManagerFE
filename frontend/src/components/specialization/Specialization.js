import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SpecializationList = () => {
  const [specializations, setSpecializations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newSpecializationName, setNewSpecializationName] = useState('');
  const [newSpecializationCode, setNewSpecializationCode] = useState('');
  const [newSpecializationDepartmentId, setNewSpecializationDepartmentId] = useState('');
  const [editSpecializationId, setEditSpecializationId] = useState('');
  const [editSpecializationName, setEditSpecializationName] = useState('');
  const [editSpecializationCode, setEditSpecializationCode] = useState('');
  const [editSpecializationDepartmentId, setEditSpecializationDepartmentId] = useState('');

  useEffect(() => {
    fetchSpecializations();
    fetchDepartments();
  }, []);

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

  const fetchDepartments = () => {
    axios
      .get('/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addSpecialization = () => {
    axios
      .post('/specializations/add', {
        name: newSpecializationName,
        code: newSpecializationCode,
        departmentId: newSpecializationDepartmentId
      })
      .then(() => {
        setNewSpecializationName('');
        setNewSpecializationCode('');
        setNewSpecializationDepartmentId('');
        fetchSpecializations();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteSpecialization = specializationId => {
    axios
      .delete(`/specializations/${specializationId}`)
      .then(() => {
        fetchSpecializations();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editSpecialization = specializationId => {
    setEditSpecializationId(specializationId);
    const specialization = specializations.find(specialization => specialization.id === specializationId);
    setEditSpecializationName(specialization.name);
    setEditSpecializationCode(specialization.code);
    setEditSpecializationDepartmentId(specialization.departmentId);
  };

  const saveSpecialization = () => {
    axios
      .put(`/specializations/${editSpecializationId}`, {
        name: editSpecializationName,
        code: editSpecializationCode,
        departmentId: editSpecializationDepartmentId
      })
      .then(() => {
        setEditSpecializationId('');
        setEditSpecializationName('');
        setEditSpecializationCode('');
        setEditSpecializationDepartmentId('');
        fetchSpecializations();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="specialization-list-container">
      <h1>Danh sách chuyên ngành</h1>
      <div className="add-specialization-container">
        <input
          type="text"
          value={newSpecializationName}
          onChange={e => setNewSpecializationName(e.target.value)}
          className="specialization-input"
          placeholder="Tên chuyên ngành"
        />
        <input
          type="text"
          value={newSpecializationCode}
          onChange={e => setNewSpecializationCode(e.target.value)}
          className="specialization-input"
          placeholder="Mã chuyên ngành"
        />
        <select value={newSpecializationDepartmentId} onChange={e => setNewSpecializationDepartmentId(e.target.value)}>
          <option value="">-- Chọn khoa --</option>
          {/* Hiển thị danh sách các khoa */}
          {departments.map(department => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
        <button className="add-button" onClick={addSpecialization}>
          Thêm
        </button>
      </div>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên chuyên ngành</th>
            <th>Mã chuyên ngành</th>
            <th>Tên khoa</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
  {specializations.map(specialization => (
    <tr key={specialization.id} className="specialization-item">
      {specialization.id === editSpecializationId ? (
        <>
          <td>
            <input
              type="text"
              value={editSpecializationName}
              onChange={(e) => setEditSpecializationName(e.target.value)}
              className="edit-specialization-input"
            />
          </td>
          <td>
            <input
              type="text"
              value={editSpecializationCode}
              onChange={(e) => setEditSpecializationCode(e.target.value)}
              className="edit-specialization-input"
            />
          </td>
          <td>
  {specialization.id === editSpecializationId ? (
   <select
   defaultValue={editSpecializationDepartmentId}
   onChange={(e) => setEditSpecializationDepartmentId(e.target.value)}
 >
   <option value="">-- Chọn phòng ban --</option>
   {/* Hiển thị danh sách các phòng ban */}
   {departments.map((department) => (
     <option
       key={department.id}
       value={department.id}
     >
       {department.name}
     </option>
   ))}
 </select>
  ) : (
    specialization.department_name
  )}
</td>
        </>
      ) : (
        <>
          <td>{specialization.name}</td>
          <td>{specialization.code}</td>
          <td>{specialization.department_name}</td>
        </>
      )}
      <td>
        {specialization.id === editSpecializationId ? (
          <button className="save-button" onClick={saveSpecialization}>
            Lưu
          </button>
        ) : (
          <button className="edit-button" onClick={() => editSpecialization(specialization.id)}>
            Sửa
          </button>
        )}
        <button className="delete-button" onClick={() => deleteSpecialization(specialization.id)}>
          Xóa
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default SpecializationList;