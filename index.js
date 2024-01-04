showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let timestamp = new Date().toLocaleString();

  let notesObj;
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let newNote = {
    title: addTitle.value,
    text: addTxt.value,
    createdAt: timestamp,
    lastModified: timestamp,
  };

  notesObj.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesElm = document.getElementById("notes");

  if (notes === null || notes === "[]") {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    return;
  }

  let notesObj = JSON.parse(notes);
  notesObj.reverse();

  let html = "";

  notesObj.forEach(function(element, index) {
    html += `
      <div class="note-card">
        <h5>${element.title}</h5>
        <p>${element.text}</p>
        <p>Created: ${element.createdAt}</p>
        <p>Last Modified: ${element.lastModified}</p>
        <button class="btn btn-danger" onclick="deleteNote(${index})">Delete</button>
        <button class="btn btn-primary" onclick="editNote(${index})">Edit</button>
        <button class="btn btn-success" onclick="saveEditedNote(${index})" style="display:none;">Save</button>
      </div>`;
  });

  notesElm.innerHTML = html;
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function editNote(index) {
  let notesElm = document.getElementById("notes");
  let noteCard = notesElm.querySelectorAll(".note-card")[index];
  let buttons = noteCard.querySelectorAll("button");

  buttons[1].style.display = "none"; // Hide Edit button
  buttons[2].style.display = "inline-block"; // Show Save button

  let title = noteCard.querySelector("h5").innerText;
  let text = noteCard.querySelector("p").innerText;

  noteCard.querySelector("h5").innerHTML = `<input type="text" class="form-control" value="${title}">`;
  noteCard.querySelector("p").innerHTML = `<textarea class="form-control">${text}</textarea>`;
}

function saveEditedNote(index) {
  let notesElm = document.getElementById("notes");
  let noteCard = notesElm.querySelectorAll(".note-card")[index];
  let buttons = noteCard.querySelectorAll("button");

  buttons[1].style.display = "inline-block";
  buttons[2].style.display = "none";

  let updatedTitle = noteCard.querySelector("h5 input").value;
  let updatedText = noteCard.querySelector("p textarea").value;
  let timestamp = new Date().toLocaleString();

  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);

  notesObj[index].title = updatedTitle;
  notesObj[index].text = updatedText;
  notesObj[index].lastModified = timestamp;
  localStorage.setItem("notes", JSON.stringify(notesObj));

  noteCard.querySelector("h5").innerText = updatedTitle;
  noteCard.querySelector("p").innerText = updatedText;
}
