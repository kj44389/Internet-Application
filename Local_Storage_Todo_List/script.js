function loading() {
  var table = document.getElementById("table");
  table.innerHTML = localStorage.getItem("table");
}
function togglebox(event) {
  if (event.checked == true) {
    event.setAttribute("checked", "checked");
  } else {
    event.removeAttribute("checked");
  }
  var table = document.getElementById("table");
  localStorage.setItem("table", table.innerHTML);
}
function savename(name) {
  let handler = document.getElementById("name_btn_edit");
  let text = document.getElementById("name_btn_edit").value;
  let dataval = handler.dataset.name;

  if (textval(text)) {
    handler.parentNode.setAttribute("onClick", "changetotext(this)");
    handler.parentNode.innerHTML = text;
    let table = document.getElementById("table");
    localStorage.setItem("table", table.innerHTML);
  } else {
    alert("Niepoprawna nazwa zadania!");
    handler.parentNode.setAttribute("onClick", "changetotext(this)");
    handler.parentNode.innerHTML = dataval;
    let table = document.getElementById("table");
    localStorage.setItem("table", table.innerHTML);
  }
}
function savedate(date) {
  let handler = document.getElementById("date_btn_edit");
  let text = document.getElementById("date_btn_edit").value;
  let dataval = handler.dataset.date;
  if (dateval(text)) {
    let date_day = text.split("-");
    handler.parentNode.setAttribute("onClick", "changetodate(this)");
    handler.parentNode.innerHTML =
      date_day[2] + "." + date_day[1] + "." + date_day[0];
    let table = document.getElementById("table");
    localStorage.setItem("table", table.innerHTML);
  } else {
    alert("Niepoprawna data!");
    let date_day = dataval.split("-");
    handler.parentNode.setAttribute("onClick", "changetodate(this)");
    handler.parentNode.innerHTML =
      date_day[2] + "." + date_day[1] + "." + date_day[0];
    let table = document.getElementById("table");
    localStorage.setItem("table", table.innerHTML);
  }
}
function textval(text) {
  if (text.length > 3 && text.length < 255) return true;
  return false;
}
function dateval(date) {
  let today = new Date().toISOString().slice(0, 10); // get format rrrr-mm-dd
  if (date >= today) return true;
  return false;
}
function changetotext(event) {
  let text = event.innerHTML;
  console.log(text);
  event.innerHTML =
    "<input type='text' id='name_btn_edit' data-name='" +
    text +
    "' onfocusout='savename(this)' value='" +
    text +
    "'>'";
  event.removeAttribute("onClick");
  let hndl = document.getElementById("name_btn_edit").focus();
}
function changetodate(event) {
  let text = event.innerHTML;
  console.log(text);
  let tmp = text.split(".");
  let value = tmp[2] + "-" + tmp[1] + "-" + tmp[0];
  console.log(value);
  event.innerHTML =
    "<input type='date' id='date_btn_edit' data-date='" +
    value +
    "' onfocusout='savedate(" +
    value +
    ")' value='" +
    value +
    "'>'";
  event.removeAttribute("onClick");
  let hndl = document.getElementById("date_btn_edit").focus();
}
function add_task() {
  let name = document.getElementById("name_btn").value;
  let date = document.getElementById("date_btn").value;
  if (textval(name) && dateval(date)) {
    let date_day = date.split("-");
    var table = document.getElementById("table");
    var query = "";
    query += '<div class="task_row">';
    query +=
      '<div class="task_mark"><input onClick="togglebox(this)" type="checkbox" /></div>';
    query +=
      '<div class="task_name" onClick="changetotext(this)">' + name + "</div>";
    query +=
      '<div class="task_date" onClick="changetodate(this)">' +
      date_day[2] +
      "." +
      date_day[1] +
      "." +
      date_day[0] +
      "</div>";
    query +=
      '<div class="task_delete"><button onClick="delete_task(this)" class="delete_btn">Usuń</button></div>';
    query += "</div>";
    table.innerHTML += query;
    localStorage.setItem("table", table.innerHTML);
  } else {
    alert("Niepoprawna notatka lub jej data!");
  }
}
function delete_task(event) {
  event.parentNode.parentNode.parentNode.removeChild(
    event.parentNode.parentNode
  );
  var table = document.getElementById("table");
  localStorage.setItem("table", table.innerHTML);
}
function delete_span() {
  let regex = new RegExp(`(<span class="highlight">)`, "g");
  let regex2 = new RegExp(`(</span>)`, "g");
  let task_names = document.getElementsByClassName("task_name");
  for (let i = 0; i < task_names.length; i++) {
    let tmp = task_names[i].innerHTML;
    let results = tmp.replace(regex, "");
    results = results.replace(regex2, "");
    task_names[i].innerHTML = results;
  }
}
function findNote() {
  delete_span();
  let handler = document.getElementById("search");
  let tmp = handler.value;
  if (tmp.length == 0) {
    let tasks = document.getElementsByClassName("task_row");
    console.log(tasks.length);
    for (let i = 0; i < tasks.length; i++) {
      let handler2 = tasks[i];
      tasks[i].removeAttribute("class");
      handler2.setAttribute("class", "task_row");
    }
  } else {
    let regex = new RegExp(`^(${tmp})?`, "g");
    let task_names = document.getElementsByClassName("task_name");
    for (let i = 0; i < task_names.length; i++) {
      let tmp = task_names[i].innerHTML;
      regex.test(tmp);
      if (!regex.test(tmp)) {
        task_names[i].parentNode.removeAttribute("class");
        task_names[i].parentNode.setAttribute("class", "task_row");
        let text = tmp.match(regex);
        var results = tmp.replace(
          regex,
          "<span class='highlight'>" + text + "</span>"
        );
        task_names[i].innerHTML = results;
      } else {
        task_names[i].parentNode.removeAttribute("class");
        task_names[i].parentNode.className += "task_row";
        task_names[i].parentNode.className += " hidden";
      }
    }
  }
}
