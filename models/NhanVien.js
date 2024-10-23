class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  tongLuong = function (luongCB, chucVu) {
    let tongLuong = 0;
    chucVu == "Sếp"
      ? (tongLuong = luongCB * 3)
      : chucVu == "Trưởng phòng"
      ? (tongLuong = luongCB * 2)
      : chucVu == "Nhân viên"
      ? (tongLuong = luongCB)
      : 0;

    return tongLuong;
  };

  xepLoai = function (gioLam) {
    let xepLoai = "";
    gioLam * 1 >= 192
      ? (xepLoai = "Nhân viên xuất sắc")
      : gioLam * 1 < 192 && gioLam * 1 >= 176
      ? (xepLoai = "Nhân viên giỏi")
      : gioLam * 1 < 176 && gioLam * 1 >= 160
      ? "Nhân viên khá"
      : gioLam * 1 < 160
      ? (xepLoai = "Nhân viên trung bình")
      : (xepLoai = "");

    return xepLoai;
  };
}
