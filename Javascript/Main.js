// Biến chung

function getELE(id) {
  return document.getElementById(id);
}
var dsnv = new DanhSachNhanVien();

var validation = new Validation();

// ========================

function hienThiDanhSach(mang) {
  var content = "";
  mang.map(function (nv) {
    content += `<tr>
    <td>${nv.taiKhoan}</td>
    <td>${nv.hoTen}</td>
    <td>${nv.email}</td>
    <td>${nv.ngayLam}</td>
    <td>${nv.chucVu}</td>
    <td>${nv.tongLuong}</td>
    <td>${nv.xepLoai}</td>
    <td>
      <button class = "btn btn-danger" onclick ="xoaNV('${nv.taiKhoan}')">Xóa</button>
      <button class = "btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick ="xemChiTiet('${nv.taiKhoan}')">Xem</button>

    </td> 
    </tr>`;
  });

  // console.log(mang);

  getELE("tableDanhSach").innerHTML = content;
}

function setLocalStorage() {
  localStorage.setItem("Danh sách nhân viên", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
  if (localStorage.getItem("Danh sách nhân viên") != null)
    dsnv.mangNV = JSON.parse(localStorage.getItem("Danh sách nhân viên"));
  hienThiDanhSach(dsnv.mangNV);
}
getLocalStorage();

function themNV() {
  var taiKhoanNV = getELE("tknv").value;
  var tenNV = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngay = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  /////////////check validation////////////

  // == Kiểm tra tài khoản ============
  var isEmpty = validation.checkEmpty(
    taiKhoanNV,
    "tbTKNV",
    "Tài khoản nhân viên trống! "
  );
  var isExist = validation.checkAcc(
    taiKhoanNV,
    "tbTKNV",
    "Tài khoản nhân viên bị trùng!",
    dsnv.mangNV
  );
  //kiểm tra tên ==============
  var emptyName = validation.checkEmpty(
    tenNV,
    "tbTen",
    "Tên nhân viên trống! "
  );
  if (!emptyName) {
    var isName = validation.checkName(
      tenNV,
      "tbTen",
      "Tên nhân viên phải là ký tự chữ!"
    );
  }
  ////Kiểm tra Email ==============
  var emptyEmail = validation.checkEmpty(
    email,
    "tbEmail",
    "Email đang để trống!"
  );
  if (!emptyEmail) {
    var isEmail = validation.checkEmail(
      email,
      "tbEmail",
      "Email không hợp lệ!"
    );
  }
  ///////////Kiểm tra pass
  var emptyPass = validation.checkEmpty(
    matKhau,
    "tbMatKhau",
    "Mật khẩu trống!"
  );
  if (!emptyPass) {
    var isPass = validation.checkPass(
      matKhau,
      "tbMatKhau",
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );
  }
  ////////// Kiểm tra ngày làm
  var emptyDay = validation.checkEmpty(ngay, "tbNgay", "Ngày làm trống!");
  if (!emptyDay) {
    var isDay = validation.checkDay(
      ngay,
      "tbNgay",
      "Ngày làm chưa đúng định dạng"
    );
  }

  ////////// Kiểm tra lương cơ bản

  var salaryEmpty = validation.checkEmpty(
    luong,
    "tbLuongCB",
    "Chưa nhập lương!"
  );

  if (!salaryEmpty) {
    var isValidatedSalary = true;

    if (luong < 1e6 || luong > 2e7) {
      isValidatedSalary = false;
      document.getElementById("tbLuongCB").classList.add("sp-thongbao--show");

      document.getElementById("tbLuongCB").innerHTML =
        "Lương cơ bản 1 000 000 - 20 000 000";
    }
  }

  ///// Kiểm tra giờ làm

  var workHours = validation.checkEmpty(
    gioLam,
    "tbGiolam",
    "Chưa nhập giờ làm!"
  );
  if (!workHours) {
    if (gioLam < 80 || gioLam > 200) {
      document.getElementById("tbGiolam").classList.add("sp-thongbao--show");

      document.getElementById("tbGiolam").innerHTML =
        "Số giờ làm trong tháng 80 - 200 giờ";
      return;
    }
  }
  //////////Kiểm tra Chức vụ
  var isPosition = validation.checkPosition(
    "chucvu",
    "tbChucVu",
    "Chưa chọn chức vụ!"
  );

  if (
    !isEmpty &&
    !isExist &&
    !emptyName &&
    isName &&
    !emptyEmail &&
    isEmail &&
    !emptyPass &&
    isPass &&
    !isPosition &&
    !emptyDay &&
    isDay &&
    isValidatedSalary &&
    luong &&
    !workHours
  ) {
    var nv = new NhanVien(
      taiKhoanNV,
      tenNV,
      email,
      matKhau,
      ngay,
      luong,
      chucVu,
      gioLam
    );

    dsnv.themNhanVien(nv);

    nv.tongLuong = nv.tinhTongLuong();
    // console.table(nv);
    nv.xepLoai = nv.hamXepLoai();
    setLocalStorage();

    hienThiDanhSach(dsnv.mangNV);
    document.querySelector("#btnDong").click();
  }
}

function xoaNV(taiKhoanNhanVien) {
  dsnv.xoaNhanVien(taiKhoanNhanVien);
  hienThiDanhSach(dsnv.mangNV);
  setLocalStorage();
}

function xemChiTiet(taiKhoanNhanVien) {
  var viTri = dsnv.timViTri(taiKhoanNhanVien);
  var nv = dsnv.mangNV[viTri];
  getELE("tknv").disabled = true;
  getELE("tknv").value = nv.taiKhoan;
  getELE("name").value = nv.hoTen;
  getELE("email").value = nv.email;
  getELE("password").value = nv.matKhau;
  getELE("datepicker").value = nv.ngayLam;
  getELE("luongCB").value = nv.luongCB;
  getELE("chucvu").value = nv.chucVu;
  getELE("gioLam").value = nv.gioLam;
}

function capNhatNV() {
  var taiKhoanNV = getELE("tknv").value;
  var tenNV = getELE("name").value;
  var email = getELE("email").value;
  var matKhau = getELE("password").value;
  var ngay = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucVu = getELE("chucvu").value;
  var gioLam = getELE("gioLam").value;

  /////////////check validation////////////

  // == Kiểm tra tài khoản ============
  // var isEmpty = validation.checkEmpty(
  //   taiKhoanNV,
  //   "tbTKNV",
  //   "Tài khoản nhân viên trống! "
  // );
  // var isExist = validation.checkAcc(
  //   taiKhoanNV,
  //   "tbTKNV",
  //   "Tài khoản nhân viên bị trùng!",
  //   dsnv.mangNV
  // );
  //kiểm tra tên ==============
  var emptyName = validation.checkEmpty(
    tenNV,
    "tbTen",
    "Tên nhân viên trống! "
  );
  if (!emptyName) {
    var isName = validation.checkName(
      tenNV,
      "tbTen",
      "Tên nhân viên phải là ký tự chữ!"
    );
  }
  ////Kiểm tra Email ==============
  var emptyEmail = validation.checkEmpty(
    email,
    "tbEmail",
    "Email đang để trống!"
  );
  if (!emptyEmail) {
    var isEmail = validation.checkEmail(
      email,
      "tbEmail",
      "Email không hợp lệ!"
    );
  }
  ///////////Kiểm tra pass
  var emptyPass = validation.checkEmpty(
    matKhau,
    "tbMatKhau",
    "Mật khẩu trống!"
  );
  if (!emptyPass) {
    var isPass = validation.checkPass(
      matKhau,
      "tbMatKhau",
      "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );
  }
  ////////// Kiểm tra ngày làm
  var emptyDay = validation.checkEmpty(ngay, "tbNgay", "Ngày làm trống!");
  if (!emptyDay) {
    var isDay = validation.checkDay(
      ngay,
      "tbNgay",
      "Ngày làm chưa đúng định dạng"
    );
  }

  ////////// Kiểm tra lương cơ bản

  var salaryEmpty = validation.checkEmpty(
    luong,
    "tbLuongCB",
    "Chưa nhập lương!"
  );

  if (!salaryEmpty) {
    var isValidatedSalary = true;

    if (luong < 1e6 || luong > 2e7) {
      isValidatedSalary = false;
      document.getElementById("tbLuongCB").classList.add("sp-thongbao--show");

      document.getElementById("tbLuongCB").innerHTML =
        "Lương cơ bản 1 000 000 - 20 000 000";
    }
  }
  ///// Kiểm tra giờ làm

  var workHours = validation.checkEmpty(
    gioLam,
    "tbGiolam",
    "Chưa nhập giờ làm!"
  );
  if (!workHours) {
    if (gioLam < 80 || gioLam > 200) {
      document.getElementById("tbGiolam").innerHTML =
        "Số giờ làm trong tháng 80 - 200 giờ";
      return;
    }
  }
  //////////Kiểm tra Chức vụ
  var isPosition = validation.checkPosition(
    "chucvu",
    "tbChucVu",
    "Chưa chọn chức vụ!"
  );
  // !isEmpty &&
  //   !isExist &&
  if (
    !emptyName &&
    isName &&
    !emptyEmail &&
    isEmail &&
    !emptyPass &&
    isPass &&
    !isPosition &&
    !emptyDay &&
    isDay &&
    isValidatedSalary &&
    luong &&
    !workHours
  ) {
    var nv = new NhanVien(
      taiKhoanNV,
      tenNV,
      email,
      matKhau,
      ngay,
      luong,
      chucVu,
      gioLam
    );

    nv.tongLuong = nv.tinhTongLuong();

    nv.xepLoai = nv.hamXepLoai();

    dsnv.capNhatNhanVien(nv);

    hienThiDanhSach(dsnv.mangNV);

    setLocalStorage();
  }
}

function resetForm() {
  getELE("form-qlnv").reset();

  getELE("tknv").disabled = false;
}

function resetFormErr() {
  let errsEl = document.querySelectorAll(".sp-thongbao");

  errsEl.forEach((el) => {
    el.classList.remove("sp-thongbao--show");
  });
}

function timTheoLoai() {
  var tukhoaTK = getELE("searchName").value;
  var mangKetQua = dsnv.timKiem(tukhoaTK);
  hienThiDanhSach(mangKetQua);
}
const searchBtn = document.querySelector("#search-ranking");

// searchBtn.addEventListener("click", timTheoLoai);
getELE("searchName").addEventListener("keyup", timTheoLoai);

/////////////////////////// Trash///////////////////////

//*
// const modalEl = document.querySelector("#myModal");
// const bodyEl = document.querySelector("body");
// const overlayEl = document.createElement("div");
//*

// ==

// modalEl.classList.add("show");
// modalEl.style.display = "block";
// bodyEl.classList.add("modal-open");

// overlayEl.classList.add("modal-backdrop", "fade", "show");
// bodyEl.appendChild(overlayEl);

// ==

// const btnDongEl = document.querySelector("#btnDong");
// btnDongEl.addEventListener("click", () => {
//   modalEl.classList.remove("show");
//   modalEl.style.display = "none";
//   bodyEl.classList.remove("modal-open");
//   bodyEl.removeChild(overlayEl);
// });
