import departmentService from './departmentService';

// Gọi hàm getAllDepartments từ departmentService
departmentService.getAllDepartments()
  .then(data => {
    // Xử lý dữ liệu trả về
    console.log(data);
  })
  .catch(error => {
    // Xử lý lỗi
    console.error(error);
  });