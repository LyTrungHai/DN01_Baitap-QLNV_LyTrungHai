function NhanVien(tk, hoVaTen, email, mk, ngay, luongCanBan, chucVu, gioLam) {
  this.taiKhoan = tk;
  this.hoTen = hoVaTen;
  this.email = email;
  this.matKhau = mk;
  this.ngayLam = ngay;
  this.luongCB = luongCanBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;

  //   ==
  this.tongLuong = 0;
  this.xepLoai = "";

  this.tinhTongLuong = function () {
    if (chucVu == "Sếp") {
      return this.luongCB * 3;
    } else if (chucVu == "Trưởng phòng") {
      return this.luongCB * 2;
    } else if (chucVu == "Nhân viên") {
      return this.luongCB;
    } else {
      console.log("Chưa chọn chức vụ");
    }
  };

  this.hamXepLoai = function () {
    if (gioLam >= 192) {
      return "NV xuất sắc";
    } else if (gioLam >= 176) {
      return "NV Giỏi";
    } else if (gioLam >= 160) {
      return "NV khá";
    } else {
      return "NV trung bình";
    }
  };
}
