"use strict";

const petId = document.getElementById("input-id");
const petName = document.getElementById("input-name");
const petAge = document.getElementById("input-age");
const petType = document.getElementById("input-type");
const petWeight = document.getElementById("input-weight");
const petLength = document.getElementById("input-length");
const petColor = document.getElementById("input-color-1");
const petBreed = document.getElementById("input-breed");
const petVaccinated = document.getElementById("input-vaccinated");
const petDewormed = document.getElementById("input-dewormed");
const petSterillzed = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calcBtn = document.getElementById("calc-btn");

const tableBodyEl = document.getElementById("tbody");
const deleteBtn = document.querySelector(".btn-danger");
const petArr = [];

//6. Xóa các dữ liệu vừa nhập trên Form
const clearInput = function () {
  petId.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = "";
  petWeight.value = "";
  petLength.value = "";
  petBreed.value = "";
  petColor.value = "#000000";
  petVaccinated.checked = false;
  petDewormed.checked = false;
  petSterillzed.checked = false;
};

//5. Hiển thị danh sách thú cưng
let today = new Date();
let date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

const renderTable = function rendalTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    
    <td>${petArr[i].breed}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
    <td>${
      petArr[i].vaccinated
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      petArr[i].dewormed
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td>${
      petArr[i].sterillzed
        ? `<i class="bi bi-check-circle-fill"></i>`
        : `<i class="bi bi-x-circle-fill"></i>`
    }</td>
    <td onclick="calcBmi()">${!isNaN(petArr[i].bmi) ? petArr[i].bmi : "?"}</td>
    <td>${date}</td>
    <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
</td>`;
    tableBodyEl.appendChild(row);
  }
};

submitBtn.addEventListener("click", function (e) {
  const data = {
    id: petId.value,
    name: petName.value,
    age: parseInt(petAge.value), //hàm glocal có tác dụng chuyển chuỗi thành số nguyên trong JavaScript. Nếu như đối số truyền vào không phải là chuỗi thì hàm sẽ chuyển đổi kiểu dữ liệu sang chuỗi trước khi thực hiện việc chuyển thành số.
    type: petType.value,
    weight: parseInt(petWeight.value),
    length: parseInt(petLength.value),
    breed: petBreed.value,
    color: petColor.value,
    vaccinated: petVaccinated.checked,
    dewormed: petDewormed.checked,
    sterillzed: petSterillzed.checked,

    date: new Date(),
  };

  //3. Validate dữ liệu hợp lệ
  // ID khong trung nhau
  for (let i = 0; i < petArr.length; i++) {
    if (data.id == petArr[i].id) {
      alert("ID must unique!");
      return false;
    } else {
    }
  }
  function validateData(data) {
    if (data.id == "" || data.name == "") {
      alert("Please fill form");
      return false;
    } else if (isNaN(data.age) || isNaN(data.weight) || isNaN(data.length)) {
      alert("Please fill number");
      return false;
    } else if (data.color == "#000000") {
      alert("Please choose color!");
    } else if (data.age < 1 || data.age > 15) {
      alert("Age must be betwwen 1 and 15!");
      return false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
    } else if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data.type == "") {
      alert("Please select Type!");
      return false;
    } else if (data.breed == "") {
      alert("Please select Breed");
      return false;
    } else {
      return true;
    }
  }
  //4. Thêm thú cưng vào danh sách
  const validate = validateData(data);
  // them thu cung vao danh sach
  if (validate) {
    petArr.push(data);
    console.log(petArr);
    clearInput();
    renderTable(petArr);
  }
});

//7. Xóa một thú cưng

const deletePet = (pet) => {
  if (confirm("Are you sure?") == true) {
    for (let i = 0; i < petArr.length; i++) {
      if (pet == petArr[i].id) {
        let petDelete = petArr.findIndex((x) => x.id === pet);

        console.log(pet);
        console.log(petDelete);
        //xoa
        petArr.splice(petDelete, 1);
        renderTable(petArr);
      } else {
        console.log("There is no Id");
      }
    }
  } else {
    console.log("User don't want to remove");
  }
};

deleteBtn.addEventListener("click", function () {
  deletePet();
});

//8. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;
let healthyPetArr = [];

healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTable(petArr);
    healthyCheck = false;
  } else {
    healthyBtn.textContent = "Show All Pet";
    healthyPetArr = petArr.filter(function (pet) {
      if (pet.vaccinated && pet.dewormed & pet.sterillzed) {
        return true;
      } else {
        return false;
      }
    });
    renderTable(healthyPetArr);
    healthyCheck = true;
  }
});

//9. Tính toán chỉ số BMI

let bmi;
let petBmi = [];

let calcBmi = function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type == "Dog"
        ? (bmi =
            Math.round(
              ((petArr[i].weight * 703) / petArr[i].length ** 2) * 100
            ) / 100)
        : (bmi =
            Math.round(
              ((petArr[i].weight * 886) / petArr[i].length ** 2) * 100
            ) / 100);
    console.log(petArr[i].bmi);
  }
};
calcBtn.addEventListener("click", function () {
  calcBmi();
  renderTable(petArr);
});
