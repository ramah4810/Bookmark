var websiteName = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("bookmarkUrl");
var websitesArray= [];
var tableContent = document.getElementById("tableContent");
var submitBtn = document.getElementById("submitBtn");

if(localStorage.getItem("websitesArray") != null){
    websitesArray = JSON.parse(localStorage.getItem("websitesArray"));
    updateTable();
}


function submit() {
    var name = websiteName.value;
    var url = websiteUrl.value;

    if (name === "" || url === "") {
        errorMessage.classList.remove('d-none');
        errorMessage.classList.add('d-block');
        return;
    } else {
        errorMessage.classList.remove('d-block');
        errorMessage.classList.add('d-none');
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    var newWebsite = {
        name: name,
        url: url
    };
    websitesArray.push(newWebsite);
    updateTable();
    clear();
    localStorageUpdate();
}

function updateTable (){
    var newSite= ``;
    for (var i=0 ; i<websitesArray.length ; i++){
        newSite += `<tr class="border border-start-0 border-end-0">
       <td class="py-3">${i + 1}</td>
       <td class="">${websitesArray[i].name}</td>
       <td><button id="visitBtn" class="border-0"><a href="${websitesArray[i].url}" class="btn btn-green text-light" target="_blank"><i class="fa-solid fa-eye me-2"></i>Visit</a></button></td>
       <td><button id="deleteBtn" class="btn btn-red text-light" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
    </tr>`;
    }
    tableContent.innerHTML = newSite;
}

function clear() {
    websiteName.value = null;
    websiteUrl.value = null;
}

function deleteSite(index) {
    websitesArray.splice(index,1);
    updateTable();
    localStorageUpdate()
}

function localStorageUpdate() {
     localStorage.setItem("websitesArray", JSON.stringify(websitesArray));
}
