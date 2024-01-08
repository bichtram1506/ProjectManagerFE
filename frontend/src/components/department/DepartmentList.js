import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentCode, setNewDepartmentCode] = useState('');
  const [editDepartmentId, setEditDepartmentId] = useState('');
  const [editDepartmentName, setEditDepartmentName] = useState('');
  const [editDepartmentCode, setEditDepartmentCode] = useState(''); // Thêm khai báo và khởi tạo cho biến editDepartmentCode

  useEffect(() => {
    fetchDepartments();
  }, []);

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

  const addDepartment = () => {
    axios
      .post('/departments/add', { name: newDepartmentName, code: newDepartmentCode })
      .then(() => {
        setNewDepartmentName('');
        setNewDepartmentCode(''); // Assuming you have a state variable named 'newDepartmentCode' to store the new department code
        fetchDepartments();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const deleteDepartment = departmentId => {
    axios
      .delete(`/departments/${departmentId}`)
      .then(() => {
        fetchDepartments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editDepartment = departmentId => {
    setEditDepartmentId(departmentId);
    const department = departments.find(department => department.id === departmentId);
    setEditDepartmentName(department.name);
    setEditDepartmentCode(department.code);
  };

  const saveDepartment = () => {
    axios
      .put(`/departments/${editDepartmentId}`, { name: editDepartmentName, code: editDepartmentCode })
      .then(() => {
        setEditDepartmentId('');
        setEditDepartmentName('');
        setEditDepartmentCode('');
        fetchDepartments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="department-list-container">
    <h1>Danh sách khoa</h1>
    <div className="add-department-container">
      <input
        type="text"
        value={newDepartmentName}
        onChange={e => setNewDepartmentName(e.target.value)}
        className="department-input"
        placeholder="Tên khoa"
      />
      <input
        type="text"
        value={newDepartmentCode}
        onChange={e => setNewDepartmentCode(e.target.value)}
        className="department-input"
        placeholder="Mã khoa"
      />
      <button className="add-button" onClick={addDepartment}>
        Thêm
      </button>
    </div>
    <table className="department-table">
      <thead>
        <tr>
          <th>Tên khoa</th>
          <th>Mã khoa</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(department => (
          <tr key={department.id} className="department-item">
            {department.id === editDepartmentId ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editDepartmentName}
                    onChange={e => setEditDepartmentName(e.target.value)}
                    className="edit-department-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editDepartmentCode}
                    onChange={e => setEditDepartmentCode(e.target.value)}
                    className="edit-department-input"
                  />
                </td>
              </>
            ) : (
              <>
                <td>{department.name}</td>
                <td>{department.code}</td>
              </>
            )}
              <td>
            {department.id === editDepartmentId ? (
              <button className="save-button" onClick={saveDepartment}>
                Lưu
              </button>
            ) : (
              <button className="edit-button" onClick={() => editDepartment(department.id)}>
                Sửa
              </button>
            )}
            <button className="delete-button" onClick={() => deleteDepartment(department.id)}>
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

export default DepartmentList;