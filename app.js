let addBtn = document.getElementById("addUser")
let usernameInp = document.getElementById("username")
let edit_id = null;

let userArray = JSON.parse(localStorage.getItem("users")) || []
displayInfo()

addBtn.addEventListener("click", addBtnClicked)

function addBtnClicked(event){
    let usernameInp = document.getElementById("username")
    let name = usernameInp.value

    if(edit_id != null){
        //edit
        userArray.splice(edit_id, 1, ({"name" : name}))
        edit_id = null
    } else {
  
        userArray.push({name: name})
        //insert
    }

    saveInfo(userArray)
    usernameInp.value = ""
    displayInfo()
    addBtn.innerText = "Add User"
}


function saveInfo(userArray){
    localStorage.setItem("users", JSON.stringify(userArray))
}

function displayInfo(){
    let tableBody = document.getElementById("tBody")
    let userArray = JSON.parse(localStorage.getItem("users")) || []
    let tableData = ""
    userArray.forEach((user, index) => {
        tableData += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>
            <i onclick="editInfo(${index})" class='btn text-white btn-info mx-3 fa fa-edit' ></i>
            <i onclick = "deleteInfo(${index})" class="btn btn-danger text-white fa fa-trash-o" ></i>
        </td>
      </tr>`
    });
    tableBody.innerHTML = tableData
}

function editInfo(index){
    edit_id = index;
    usernameInp.value = userArray[edit_id].name
    addBtn.innerText = "save changes"       
}

function deleteInfo(index){
    // let userArray = JSON.parse(localStorage.getItem("users")) || []
    // let newArray =  userArray.filter((user,userIndex) => userIndex !== index )
    // localStorage.setItem("users", JSON.stringify(newArray))
    // displayInfo()

    //another alternate way to do this
    userArray.splice(index, 1)
    saveInfo(userArray)
    displayInfo()
}

const allTr = document.querySelectorAll("#tBody tr")
const searchInput = document.querySelector("#search")
const tableBody = document.getElementById("tBody")

searchInput.addEventListener("input", searchResults)

function searchResults(event){
    const searchStr = event.target.value.toLowerCase()
    tableBody.innerHTML = ""
    allTr.forEach((tr) => {
            const td_in_tr = tr.querySelectorAll("td")
            if(td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1){
                tableBody.appendChild(tr)
            } 
    })
    if(tableBody.innerHTML == ""){
        tableBody.innerHTML = "No records Found"
    }
}

let total_records_tr = document.querySelectorAll("#tBody tr")
let total_records = total_records_tr.length
let records_per_page = 5;
let page_number = 1;
let total_page = Math.ceil(total_records/records_per_page)


generatePage()
displayRecords()

function displayRecords(){
    let startIndex = (page_number -1 ) * records_per_page;
    let endIndex = startIndex + (records_per_page -1)
    if(endIndex >= total_records){
        endIndex = total_records -1
    }
    let statement = '';
    for(let i = startIndex; i<=endIndex; i++){
        statement += `<tr>${total_records_tr[i].innerHTML}</tr>`
    }
    tableBody.innerHTML = statement;
    document.querySelectorAll(".dynamic-item").forEach((item) => {
        item.classList.remove("active")
    })
   document.getElementById(`page${page_number}`).classList.add("active")

   if(page_number == 1){
    document.getElementById("prevBtn").parentElement.classList.add("disabled")
   }else{
    document.getElementById("prevBtn").parentElement.classList.remove("disabled")

   }

   if(page_number == total_page){
    document.getElementById("nextBtn").parentElement.classList.add("disabled")

   }else{
    document.getElementById("nextBtn").parentElement.classList.remove("disabled")

   }

}

function generatePage (){
    let prevBtn =   `<li class="page-item ">
    <a href="javascript:void(0)" id="prevBtn" class="page-link" onclick="prevBtn()">Previous</a>
</li>`
    let nextBtn = ` <li class="page-item"><a id="nextBtn" href="javascript:void(0)" class="page-link" onclick ="nextBtn()">
    Next
</a></li>`
    let buttons = "";
    let activeClass = "";

    for(let i = 1; i<= total_page;  i++){
        if(i == 1){
            activeClass = "active"
        }else{
            activeClass = ""
        }
        buttons += `<li class="page-item dynamic-item ${activeClass}" id="page${i}">
        <a href="#" class="page-link">
            ${i}
        </a>
    </li>`
    }
   document.getElementById("pagination").innerHTML = `${prevBtn} ${buttons} ${nextBtn}`

}

function prevBtn(){
    page_number--;
    displayRecords()
}

function nextBtn(){
    page_number++;
    displayRecords()
}