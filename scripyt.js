let students = [
  { studentCode: "STU-001", fullName: "Đặng Gia Huy", courseName: "Tiếng Anh Giao Tiếp", age: 19, placementScore: 65 },
  { studentCode: "STU-002", fullName: "Phan Ngọc Lan", courseName: "Tiếng Anh Học Thuật", age: 24, placementScore: 72 },
  { studentCode: "STU-003", fullName: "Trương Bảo Ngọc", courseName: "Tiếng Anh Thiếu Nhi", age: 9, placementScore: 40 }
];
function normalizeText(rawText) {
  if (rawText === null || rawText === undefined) {
    return "";
  }
  let words = String(rawText).trim().split(/\s+/);
  let result = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      result.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
    }
  }
}
  return result.join(" ");

function findStudentIndex(code) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].studentCode === code) {
      return i;
    }
  }
  return -1;
}
function validateStudentCode(code) {
  if (code === null || code === undefined || code === "") {
    return "Lỗi: Chưa nhập mã học viên";
  }
  if (code.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  if (code.indexOf("STU-") !== 0) {
    return 'Lỗi: Sai tiền tố "STU-"';
  }
  if (/\s/.test(code)) {
    return "Lỗi: Chứa khoảng trắng";
  }
  if (findStudentIndex(code) !== -1) {
    return "Lỗi: Mã học viên đã tồn tại";
  }
  return "";
}
function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    input = input.trim();
    if (input === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
    } else if (!/^-?\d+$/.test(input)) {
      console.log("Lỗi: không phải số nguyên, nhập lại");
    } else {
      let number = Number(input);
      if (number < min || number > max) {
        console.log("Lỗi: ngoài phạm vi " + min + " - " + max + ", nhập lại");
      } else {
        return number;
      }
    }
  }
}
function inputRequiredText(message) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let text = normalizeText(input);
    if (text === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
    } else {
      return text;
    }
  }
}
function inputStudentCode(message) {
  let input = prompt(message);
  if (input === null) {
    return null;
  }
  return input.trim().toUpperCase();
}

function displayStudents(list) {
  if (list.length === 0) {
    console.log("Danh sách học viên trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    let s = list[i];
    console.log((i + 1) + ". " + s.studentCode + " - " + s.fullName + " - " + s.courseName);
    console.log("   Tuổi: " + s.age + " | Điểm đầu vào: " + s.placementScore);
  }
  console.log("Tổng: " + list.length + " học viên");
}
function showStudents() {
  if (students.length === 0) {
    displayStudents(students);
    return;
  }
  let mode = inputIntegerInRange("Chọn cách hiển thị:\n1. Thứ tự hiện tại\n2. Điểm đầu vào tăng dần", 1, 2);
  if (mode === null) {
    console.log("Đã hủy thao tác hiển thị");
    return;
  }
  let list = students.slice();
  if (mode === 2) {
    list.sort(function (a, b) {
      return a.placementScore - b.placementScore;
    });
  }
  displayStudents(list);
}

function addStudent() {
  let code = inputStudentCode("Nhập mã học viên:");
  if (code === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  let error = validateStudentCode(code);
  if (error !== "") {
    console.log(error);
    return;
  }
  let fullName = inputRequiredText("Nhập họ tên:");
  if (fullName === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  let courseName = inputRequiredText("Nhập khóa học:");
  if (courseName === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  let age = inputIntegerInRange("Nhập tuổi (6 - 60):", 6, 60);
  if (age === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  let placementScore = inputIntegerInRange("Nhập điểm đầu vào (0 - 100):", 0, 100);
  if (placementScore === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  students.push({
    studentCode: code,
    fullName: fullName,
    courseName: courseName,
    age: age,
    placementScore: placementScore
  });
  console.log("Đã thêm học viên:");
  console.log(code + " - " + fullName + " - " + courseName);
  console.log("Tuổi: " + age + " | Điểm đầu vào: " + placementScore);
}
function updateStudent() {
  let code = inputStudentCode("Nhập mã học viên cần cập nhật:");
  if (code === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  let index = findStudentIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy học viên có mã " + code);
    return;
  }
  let newAge = inputIntegerInRange("Nhập tuổi mới (6 - 60):", 6, 60);
  if (newAge === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  let newScore = inputIntegerInRange("Nhập điểm đầu vào mới (0 - 100):", 0, 100);
  if (newScore === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  let student = students[index];
  console.log("Tuổi: " + student.age + " -> " + newAge);
  console.log("Điểm đầu vào: " + student.placementScore + " -> " + newScore);
  student.age = newAge;
  student.placementScore = newScore;
  console.log("Cập nhật thành công");
}
function deleteStudent() {
  let code = inputStudentCode("Nhập mã học viên cần xóa:");
  if (code === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }
  let index = findStudentIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy học viên có mã " + code);
    return;
  }
  let confirmInput = prompt("Xác nhận xóa " + code + "? (Y/N)");
  if (confirmInput !== null && confirmInput.trim() === "Y" || confirmInput !== null && confirmInput.trim() === "y") {
    students.splice(index, 1);
    console.log("Xóa thành công, còn " + students.length + " học viên");
  } else {
    console.log("Đã hủy thao tác xóa, còn " + students.length + " học viên");
  }
}
function searchStudents() {
  let input = prompt("Nhập từ khóa khóa học:");
  let keyword = input === null ? "" : input.trim().toLowerCase();
  if (keyword === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  let results = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].courseName.toLowerCase().indexOf(keyword) !== -1) {
      results.push(students[i]);
    }
  }
  if (results.length === 0) {
    console.log("Không tìm thấy học viên phù hợp");
    return;
  }
  displayStudents(results);
}
function showReport() {
  if (students.length === 0) {
    console.log("Chưa có học viên nào");
    return;
  }
  let total = 0;
  let best = students[0];
  for (let i = 0; i < students.length; i++) {
    total += students[i].placementScore;
    if (students[i].placementScore > best.placementScore) {
      best = students[i];
    }
  }
  console.log("BÁO CÁO TỔNG KẾT HỌC VIÊN");
  console.log("Tổng số học viên        : " + students.length);
  console.log("Điểm đầu vào trung bình : " + (total / students.length).toFixed(1));
  console.log("Điểm đầu vào cao nhất   : " + best.studentCode + " - " + best.fullName + " - " + best.placementScore);
}
function main() {
  let menuText =
    "HỆ THỐNG QUẢN LÝ HỌC VIÊN TRUNG TÂM GLOBAL ENGLISH\n\n" +
    "1. Hiển thị danh sách học viên\n" +
    "2. Thêm học viên mới\n" +
    "3. Cập nhật thông tin học viên\n" +
    "4. Xóa học viên\n" +
    "5. Tìm kiếm học viên theo khóa học\n" +
    "0. Thoát chương trình\n\n" +
    "Vui lòng nhập lựa chọn của bạn (0 - 5):";
  let running = true;
  while (running) {
    let input = prompt(menuText);
    let choice = input === null ? "" : input.trim();

    switch (choice) {
      case "1":
        showStudents();
        break;
      case "2":
        addStudent();
        break;
      case "3":
        updateStudent();
        break;
      case "4":
        deleteStudent();
        break;
      case "5":
        searchStudents();
        break;
      case "0":
        showReport();
        console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
        running = false;
        break;
    }
  }
}

main();