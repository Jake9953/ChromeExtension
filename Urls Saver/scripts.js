
let collections = []

const inputEl = document.getElementById("input-el")
const Btn = document.getElementById("inputBtn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delBtn")
const collectionsFromLocalStorage = JSON.parse(localStorage.getItem("collections"))
const saveButton = document.getElementById("saveBtn")

if (collectionsFromLocalStorage) {
  collections = collectionsFromLocalStorage
  render(collections)
}

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    collections.push(tabs[0].url)
    localStorage.setItem("collections", JSON.stringify(collections))
    render(collections)
  })
})
// render the urls inside a function
function render(Urls) {
  let listItems = ""
  for (let i = 0; i < Urls.length; i++) {
    listItems += `
    <li>
    <a target='_blank' href='${Urls[i]}'>
    ${Urls[i]}
    </a>
    </li>
    `
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  collections = []
  render(collections)
})
Btn.addEventListener("click", function () {
  let inputVal = document.getElementById("input-el").value;
  collections.push(inputVal)
  inputVal = document.getElementById('input-el');
  inputVal.value = '';
  localStorage.setItem("collections", JSON.stringify(collections))
  render(collections)
})