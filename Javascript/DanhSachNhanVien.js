function DanhSachNhanVien() {
  this.mangNV = [];
  this.themNhanVien = function (nv) {
    this.mangNV.push(nv);
  };

  this.timViTri = function (taiKhoanNhanVien) {
    var viTriNV = -1;
    this.mangNV.map(function (nv, index) {
      if (nv.taiKhoan == taiKhoanNhanVien) {
        viTriNV = index;
      }
    });

    return viTriNV;
  };

  this.xoaNhanVien = function (taiKhoanNhanVien) {
    var viTriNV = this.timViTri(taiKhoanNhanVien);
    if (viTriNV >= 0) {
      this.mangNV.splice(viTriNV, 1);
    }
  };
}
