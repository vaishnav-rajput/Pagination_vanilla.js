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


