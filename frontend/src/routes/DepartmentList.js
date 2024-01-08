axios.get('http://localhost:3000/departments')
  .then(response => {
    // Xử lý dữ liệu trả về từ API
    console.log(response.data);
  })
  .catch(error => {
    // Xử lý lỗi
    console.error(error);
  });