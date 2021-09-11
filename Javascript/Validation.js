function Validation() {
  // Method : kiểm tra rỗng
  this.checkEmpty = function (inputValue, spanID, message) {
    if (inputValue.trim() === "") {
      // console.log("run1");
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).classList.add("sp-thongbao--show");
      return true;
    } else {
      document.getElementById(spanID).innerHTML = "";
      return false;
    }
  };
  // kiểm tra tk trùng
  this.checkAcc = function (inputValue, spanID, message, arrayAcc) {
    var isExist = arrayAcc.some(function (nv) {
      return nv.taiKhoan === inputValue.trim();
    });
    // console.log({ isExist });
    if (isExist) {
      document.getElementById(spanID).innerHTML = message;
      return true;
    } else {
      return false;
    }
  };

  // Kiểm tra tên
  this.checkName = function (inputValue, spanID, message) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
    );

    if (pattern.test(inputValue)) {
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };
  // Kiểm tra Email
  this.checkEmail = function (inputValue, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputValue.match(pattern)) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };

  // Kiểm tra mật khẩu
  this.checkPass = function (inputValue, spanID, message) {
    var pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (inputValue.match(pattern)) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };
  this.checkDay = function (inputValue, spanID, message) {
    var pattern =
      /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    if (inputValue.match(pattern)) {
      document.getElementById(spanID).innerHTML = "";
      return true;
    } else {
      document.getElementById(spanID).innerHTML = message;
      return false;
    }
  };

  // Kiểm tra chức vụ
  this.checkPosition = function (selectID, spanID, message) {
    var optionIndex = document.getElementById(selectID).selectedIndex;
    if (optionIndex === 0) {
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).classList.add("sp-thongbao--show");
      return true;
    } else {
      document.getElementById(spanID).innerHTML = "";
      return false;
    }
  };
}
