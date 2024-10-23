// Thêm nhân viên
function getNewNhanVienValue() {
  let arrField = document.querySelectorAll(
    ".form-group input, .form-group select"
  );

  // console.log(arrField);

  let nhanVien = new NhanVien();
  // console.log(nhanVien);
  let isValid = true;

  for (let field of arrField) {
    // console.log(field);
    let { id, value } = field;
    nhanVien[id] = value;

    let parent = field.parentElement.parentElement;
    let spanThongBao = parent.querySelector(".sp-thongbao");
    // console.log(spanThongBao);

    let dataAtrribute = field.getAttribute("data-validation");

    let isEmpty = checkEmpty(value, spanThongBao);
    if (!isEmpty) isValid = false;
    else isValid &= isEmpty;

    switch (dataAtrribute) {
      case "tknv":
        {
          if (Number.isInteger(value * 1)) {
            isValid &= checkLength(value, spanThongBao, 4, 6);
            if (!isValid) spanThongBao.innerHTML += " ký số!";
            else {
              isValid &= checkExist(value, spanThongBao, arrNhanVien);
            }
          } else {
            isValid = false;
            spanThongBao.style.display = "block";
            spanThongBao.innerHTML = "Tài khoản phải là số!";
          }
        }
        break;

      case "name":
        isValid &= checkNameValid(value, spanThongBao);
        break;

      case "email":
        isValid &= checkEmailValid(value, spanThongBao);
        break;

      case "password":
        {
          isValid &= checkLength(value, spanThongBao, 6, 10);
          if (isValid) isValid &= checkPasswordValid(value, spanThongBao);
          else {
            spanThongBao.innerHTML += " ký tự!";
          }
        }
        break;

      case "luongCB":
        isValid &= checkValue(value, spanThongBao, 1000000, 20000000);
        break;

      case "gioLam":
        {
          isValid &= checkValue(value, spanThongBao, 80, 200);
          if (!isValid) spanThongBao.innerHTML += " giờ!";
        }
        break;

      default:
        break;
    }
  }
  if (!isValid) return;
  return nhanVien;
}

function getExistNhanVienValue() {
  let arrField = document.querySelectorAll(
    ".form-group input, .form-group select"
  );

  // console.log(arrField);

  let nhanVien = new NhanVien();
  // console.log(nhanVien);
  let isValid = true;

  for (let field of arrField) {
    // console.log(field);
    let { id, value } = field;
    nhanVien[id] = value;

    let parent = field.parentElement.parentElement;
    let spanThongBao = parent.querySelector(".sp-thongbao");
    // console.log(spanThongBao);

    let dataAtrribute = field.getAttribute("data-validation");

    let isEmpty = checkEmpty(value, spanThongBao);
    if (!isEmpty) isValid = false;
    else isValid &= isEmpty;

    switch (dataAtrribute) {
      case "tknv":
        {
          if (Number.isInteger(value * 1)) {
            isValid &= checkLength(value, spanThongBao, 4, 6);
            if (!isValid) spanThongBao.innerHTML += " ký số!";
          } else {
            isValid = false;
            spanThongBao.style.display = "block";
            spanThongBao.innerHTML = "Tài khoản phải là số!";
          }
        }
        break;

      case "name":
        isValid &= checkNameValid(value, spanThongBao);
        break;

      case "email":
        isValid &= checkEmailValid(value, spanThongBao);
        break;

      case "password":
        {
          isValid &= checkLength(value, spanThongBao, 6, 10);
          if (isValid) isValid &= checkPasswordValid(value, spanThongBao);
          else {
            spanThongBao.innerHTML += " ký tự!";
          }
        }
        break;

      case "luongCB":
        isValid &= checkValue(value, spanThongBao, 1000000, 20000000);
        break;

      case "gioLam":
        {
          isValid &= checkValue(value, spanThongBao, 80, 200);
          if (!isValid) spanThongBao.innerHTML += " giờ!";
        }
        break;

      default:
        break;
    }
  }
  if (!isValid) return;
  return nhanVien;
}

function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let arrSave = JSON.stringify(value);
  localStorage.setItem(key, arrSave);
}

function getLocalStorage(key = "arrNhanVien") {
  let dataLocal = localStorage.getItem(key);

  let dataParsed = [];
  dataLocal ? (dataParsed = JSON.parse(dataLocal)) : [];
  return dataParsed;
}

let arrNhanVien = getLocalStorage();
renderNhanVien();

function renderNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nv of arr) {
    let nvNew = new NhanVien();
    Object.assign(nvNew, nv);
    let { tknv, name, email, datepicker, chucvu, luongCB, gioLam } = nvNew;
    let tongLuong = nvNew.tongLuong(luongCB, chucvu);
    let xepLoai = nvNew.xepLoai(gioLam);
    let formatedDate = convertToMMDDYYYY(datepicker);

    content += `<tr>
    <td>${tknv}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${formatedDate}</td>
    <td>${chucvu}</td>
    <td>${tongLuong}</td>
    <td>${xepLoai}</td>
    <td>
      <i style="cursor: pointer;" data-toggle="modal" data-target="#myModal" onclick="getInfoNV('${tknv}')" class="fa-solid fa-wrench text-warning mx-0" id="updateNV"></i>   
      <i style="cursor: pointer;" class="fa-solid fa-xmark text-danger" onclick="xoaNV('${tknv}')" ></i>
    </td>
    </tr>`;
  }

  document.getElementById("tableDanhSach").innerHTML = content;
}

document
  .getElementById("btnThemNV")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Đây là sự kiện submit");
    let nhanVien = getNewNhanVienValue();
    if (!nhanVien) return;
    arrNhanVien.push(nhanVien);
    saveLocalStorage();

    renderNhanVien();
    let formNhanVien = document.getElementById("formNhanVien");
    formNhanVien.reset();
    hienThiThongBao("Thêm nhân viên thành công", "bg-success");
    document.getElementById("searchType").value = "";
  });

document.getElementById("btnDong").onclick = function () {
  let formNhanVien = document.getElementById("formNhanVien");
  formNhanVien.reset();
};
// Xóa nhân viên
function xoaNV(tknv) {
  let index = arrNhanVien.findIndex((item) => item.tknv == tknv);

  arrNhanVien.splice(index, 1);
  saveLocalStorage();
  renderNhanVien();
  hienThiThongBao("Xóa nhân viên thành công", "bg-danger");
}

// Update Nhân viên
function getInfoNV(tknv) {
  let arrField = document.querySelectorAll(
    ".form-group input, .form-group select"
  );

  let nv = arrNhanVien.find((item) => item.tknv == tknv);
  if (nv) {
    for (field of arrField) {
      field.value = nv[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

document.getElementById("btnCapNhat").onclick = function () {
  let nhanVien = getExistNhanVienValue();

  let index = arrNhanVien.findIndex((item) => item.tknv == nhanVien.tknv);
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    saveLocalStorage();
    renderNhanVien();
  }
  document.getElementById("tknv").readOnly = false;
  formNhanVien.reset();
  hienThiThongBao("Cập nhật nhân viên thành công", "bg-warning");
};

// Search nhân viên
document.getElementById("searchType").oninput = function (event) {
  let keyword = removeVietnameseTones(event.target.value).trim().toLowerCase();

  let newSearchArr = arrNhanVien;
  let arrResult = newSearchArr
    .map((item) => {
      let nv = new NhanVien();
      Object.assign(nv, item);
      return nv;
    })
    .filter((nv) =>
      removeVietnameseTones(nv.xepLoai(nv.gioLam))
        .trim()
        .toLowerCase()
        .includes(keyword)
    );

  renderNhanVien(arrResult);
};

// Hiển thị thông báo
function hienThiThongBao(text, className) {
  Toastify({
    text,
    duration: 3000,
    className,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "white",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Sắp xếp
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function sapXepTangDan(arr = arrNhanVien) {
  let newSortArr = [...arr];
  for (let i = 0; i < newSortArr.length - 1; i++) {
    for (let j = 0; j < newSortArr.length - 1 - i; j++) {
      if (newSortArr[j].tknv * 1 > newSortArr[j + 1].tknv * 1) {
        swap(newSortArr, j, j + 1);
      }
    }
  }
  renderNhanVien(newSortArr);
}

function sapXepGiamDan(arr = arrNhanVien) {
  let newSortArr = [...arr];
  for (let i = 0; i < newSortArr.length - 1; i++) {
    for (let j = 0; j < newSortArr.length - 1 - i; j++) {
      if (newSortArr[j].tknv * 1 < newSortArr[j + 1].tknv * 1) {
        swap(newSortArr, j, j + 1);
      }
    }
  }
  renderNhanVien(newSortArr);
}

let SapXepTang = document.getElementById("SapXepTang");
let SapXepGiam = document.getElementById("SapXepGiam");

SapXepTang.onclick = function () {
  sapXepTangDan();
  SapXepTang.style.display = "none";
  SapXepGiam.style.display = "inline-block";
};

SapXepGiam.onclick = function () {
  sapXepGiamDan();
  SapXepGiam.style.display = "none";
  SapXepTang.style.display = "inline-block";
};
