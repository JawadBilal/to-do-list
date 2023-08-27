const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):
[]
console.log(itemsArray)

document.querySelector('#add').addEventListener("click", ()=>{
    const item = document.querySelector("#items")
    createItem(item)

})
function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items" , JSON.stringify(itemsArray))
    location.reload();
}
function displayItems(){
    let items = ""
    for(let i=0; i<itemsArray.length; i++){
        items += ` <div class="items">
                        <div class="input">
                            <textarea disabled>${itemsArray[i]}</textarea>
                            <span>
                                <i class="fa-solid fa-square-check fa-lg deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square fa-lg updateBtn"></i>
                            </span>
                        </div>
                        <div class="update">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    deleteListener()
    upadateListener()
    saveListener()
    cancelListener()
}
function deleteListener(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i)=>{
        db.addEventListener("click", ()=>{ deleteItems(i) })
    })
}
function upadateListener(){
    let updateBtn = document.querySelectorAll(".updateBtn")
    let updateControl = document.querySelectorAll(".update")
    let inputs = document.querySelectorAll(".input textarea") 
    updateBtn.forEach((eb, i) =>{
        eb.addEventListener("click", ()=>{
            updateControl[i].style.display = "block"
            inputs[i].disabled = false
        } )
        
    })
}
function saveListener(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input textarea")
    saveBtn.forEach((sb, i) =>{
        sb.addEventListener("click", ()=>{
            updateItem(inputs[i].value, i)
        })
    })
}
function cancelListener(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    let updateControl = document.querySelectorAll(".update") 
    let inputs = document.querySelectorAll(".input textarea")
    cancelBtn.forEach((cb, i)=>{
        cb.addEventListener("click", ()=>{
            updateControl[i].style.display = "none"
            inputs[i].disabled = true 
        })
    })
}
function updateItem(value, i){
    itemsArray[i] = value
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()
}
function deleteItems(i){
    itemsArray.splice(i,1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload();
}
window.onload = function(){
    displayItems()
}