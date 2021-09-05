function getELE(id) {
  return document.getElementById(id);
}
var dsnv = new DanhSachNhanVien();

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
}

function xoaNV(taiKhoanNhanVien) {
  dsnv.xoaNhanVien(taiKhoanNhanVien);
  hienThiDanhSach(dsnv.mangNV);
  setLocalStorage();
}

//*
// const modalEl = document.querySelector("#myModal");
// const bodyEl = document.querySelector("body");
// const overlayEl = document.createElement("div");
//*
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
