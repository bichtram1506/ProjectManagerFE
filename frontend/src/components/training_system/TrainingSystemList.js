import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TrainingSystemList = () => {
  const [trainingSystems, setTrainingSystems] = useState([]);
  const [newTrainingSystemName, setNewTrainingSystemName] = useState('');
  const [newTrainingSystemCode, setNewTrainingSystemCode] = useState('');
  const [editTrainingSystemId, setEditTrainingSystemId] = useState('');
  const [editTrainingSystemName, setEditTrainingSystemName] = useState('');
  const [editTrainingSystemCode, setEditTrainingSystemCode] = useState('');

  useEffect(() => {
    fetchTrainingSystems();
  }, []);

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

  const addTrainingSystem = () => {
    axios
      .post('/training_systems/add', { name: newTrainingSystemName, code: newTrainingSystemCode })
      .then(() => {
        setNewTrainingSystemName('');
        setNewTrainingSystemCode('');
        fetchTrainingSystems();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteTrainingSystem = trainingSystemId => {
    axios
      .delete(`/training_systems/${trainingSystemId}`)
      .then(() => {
        fetchTrainingSystems();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editTrainingSystem = trainingSystemId => {
    setEditTrainingSystemId(trainingSystemId);
    const trainingSystem = trainingSystems.find(system => system.id === trainingSystemId);
    setEditTrainingSystemName(trainingSystem.name);
    setEditTrainingSystemCode(trainingSystem.code);
  };

  const saveTrainingSystem = () => {
    axios
      .put(`/training_systems/${editTrainingSystemId}`, { name: editTrainingSystemName, code: editTrainingSystemCode })
      .then(() => {
        setEditTrainingSystemId('');
        setEditTrainingSystemName('');
        setEditTrainingSystemCode('');
        fetchTrainingSystems();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="training-system-list-container">
      <h1>Danh sách hệ đào tạo</h1>
      <div className="add-training-system-container">
        <input
          type="text"
          value={newTrainingSystemName}
          onChange={e => setNewTrainingSystemName(e.target.value)}
          className="training-system-input"
          placeholder="Tên hệ đào tạo"
        />
        <input
          type="text"
          value={newTrainingSystemCode}
          onChange={e => setNewTrainingSystemCode(e.target.value)}
          className="training-system-input"
          placeholder="Mã hệ đào tạo"
        />
        <button className="add-button" onClick={addTrainingSystem}>
          Thêm
        </button>
      </div>
      <table className="department-table">
        <thead>
          <tr>
            <th>Tên hệ đào tạo</th>
            <th>Mã hệ đào tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {trainingSystems.map(trainingSystem => (
            <tr key={trainingSystem.id} className="training-system-item">
              {trainingSystem.id === editTrainingSystemId ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editTrainingSystemName}
                      onChange={e => setEditTrainingSystemName(e.target.value)}
                      className="edit-training-system-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editTrainingSystemCode}
                      onChange={e => setEditTrainingSystemCode(e.target.value)}
                      className="edit-training-system-input"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{trainingSystem.name}</td>
                  <td>{trainingSystem.code}</td>
                </>
              )}
              <td>
                {trainingSystem.id === editTrainingSystemId ? (
                  <button className="save-button" onClick={saveTrainingSystem}>
                    Lưu
                  </button>
                ) : (
                  <button className="edit-button" onClick={() => editTrainingSystem(trainingSystem.id)}>
                    Sửa
                  </button>
                )}
                <button className="delete-button" onClick={() => deleteTrainingSystem(trainingSystem.id)}>
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

export default TrainingSystemList;