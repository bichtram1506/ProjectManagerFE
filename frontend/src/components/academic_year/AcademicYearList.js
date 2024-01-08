import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AcademicYearList = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [editAcademicYearId, setEditAcademicYearId] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  useEffect(() => {
    fetchAcademicYears();
  }, []);

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

  const addAcademicYear = () => {
    axios
      .post('/academic_years/add', { start_date: newStartDate, end_date: newEndDate })
      .then(() => {
        setNewStartDate('');
        setNewEndDate('');
        fetchAcademicYears();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteAcademicYear = academicYearId => {
    axios
      .delete(`/academic_years/${academicYearId}`)
      .then(() => {
        fetchAcademicYears();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editAcademicYear = academicYearId => {
    setEditAcademicYearId(academicYearId);
    const academicYear = academicYears.find(year => year.id === academicYearId);
    setEditStartDate(academicYear.start_date);
    setEditEndDate(academicYear.end_date);
  };

  const saveAcademicYear = () => {
    axios
      .put(`/academic_years/${editAcademicYearId}`, { start_date: editStartDate, end_date: editEndDate })
      .then(() => {
        setEditAcademicYearId('');
        setEditStartDate('');
        setEditEndDate('');
        fetchAcademicYears();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="academic-year-list-container">
      <h1>Danh sách năm học</h1>
      <div className="add-academic-year-container">
        <input
          type="text"
          value={newStartDate}
          onChange={e => setNewStartDate(e.target.value)}
          className="start-date-input"
          placeholder="Ngày bắt đầu"
        />
        <input
          type="text"
          value={newEndDate}
          onChange={e => setNewEndDate(e.target.value)}
          className="end-date-input"
          placeholder="Ngày kết thúc"
        />
        <button className="add-button" onClick={addAcademicYear}>
          Thêm
        </button>
      </div>
      <table className="department-table">
        <thead>
          <tr>
            <th>Năm bắt đầu</th>
            <th>Năm kết thúc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {academicYears.map(academicYear => (
            <tr key={academicYear.id} className="academic-year-item">
              {academicYear.id === editAcademicYearId ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editStartDate}
                      onChange={e => setEditStartDate(e.target.value)}
                      className="edit-academic-year-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editEndDate}
                      onChange={e => setEditEndDate(e.target.value)}
                      className="edit-academic-year-input"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{academicYear.start_date}</td>
                  <td>{academicYear.end_date}</td>
                </>
              )}
              <td>
                {academicYear.id === editAcademicYearId ? (
                  <button className="save-button" onClick={saveAcademicYear}>
                    Lưu
                  </button>
                ) : (
                  <button className="edit-button" onClick={() => editAcademicYear(academicYear.id)}>
                    Sửa
                  </button>
                )}
                <button className="delete-button" onClick={() => deleteAcademicYear(academicYear.id)}>
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

export default AcademicYearList;