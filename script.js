window.onload = function() {

  if (!confirm('Restore last task list?')) {
    localStorage.clear();
  }
  var toDoList = document.getElementById('toDoList');
  var input = document.getElementById('input');
  var li = document.getElementsByTagName('li');

  //load task list from storage if exists
  if (localStorage.task) {
    toDoList.innerHTML = localStorage.task;
  }

  //add control buttons to use in each li
  function buttons(el) {
    var btnup = document.createElement('span');
    var btndown = document.createElement('span');
    var remove = document.createElement('span');
    var btnupTxt = document.createTextNode('\u2227');
    var btndownTxt = document.createTextNode('\u2228');
    var removeTxt = document.createTextNode('×');
    remove.className = 'remove';
    btnup.className = 'btnup';
    btndown.className = 'btndown';
    remove.appendChild(removeTxt);
    btnup.appendChild(btnupTxt);
    btndown.appendChild(btndownTxt);
    var div = document.createElement('div');
    div.appendChild(btnup);
    div.appendChild(btndown);
    div.appendChild(remove);
    el.appendChild(div);
  }

  //add functions for task control
  function taskControl(e) {
    var li = e.target.parentNode.parentNode;
    if (e.target.classList.contains('remove')) {
      li.remove();
      localStorage.task = toDoList.innerHTML;
    } else if (e.target.classList.contains('task')) {
      e.target.classList.toggle('checked');
      localStorage.task = toDoList.innerHTML;
    } else if (e.target.classList.contains('btnup')) {
      var prev = li.previousElementSibling;
      if (prev != null) {
        toDoList.insertBefore(li, prev);
        localStorage.task = toDoList.innerHTML;
      }
    } else if (e.target.classList.contains('btndown')) {
      var next = li.nextElementSibling;
      if (next != null) {
        toDoList.insertBefore(next, li);
        localStorage.task = toDoList.innerHTML;
      }
    }
  }

  toDoList.addEventListener('click', taskControl);

  //create new todo task
  function add() {
    var li = document.createElement('li');
    var task = document.createElement('span');
    task.className = 'task';

    var today = new Date();
    var todayDate = document.createTextNode(today.toISOString().slice(0, 10));
    var taskDate = document.createElement('span');
    taskDate.className = 'taskDate';
    taskDate.appendChild(todayDate);

    var inputValue = input.value;
    var title = document.createTextNode(inputValue);
    task.appendChild(title);
    li.appendChild(task);
    li.appendChild(taskDate);

    if (inputValue === '') {
      alert('Enter task title');
    } else {
      toDoList.appendChild(li);
      buttons(li);
    }
    input.value = '';
    localStorage.task = toDoList.innerHTML;
  }

  document.getElementById('add').addEventListener('click', add);

  //search task by title
  function search() {
    input.placeholder = 'Search';
    document.getElementById('cancel').style.display = 'inline';
    //search for matches when input has changed
    input.onchange = function() {
      var search = input.value.toLowerCase();
      for (i = 0; i < li.length; i++) {
        task = li[i].getElementsByClassName('task')[0];
        if (task.innerHTML.toLowerCase().indexOf(search) == -1) {
          li[i].style.display = "none";
        }
      }
    };
  }

  document.getElementById('search').addEventListener('mouseup', search);

  //quit search, show full list
  document.getElementById('cancel').addEventListener('click', function() {
    input.value = '';
    this.style.display = 'none';
    for (i = 0; i < li.length; i++) {
      li[i].style.display = "flex";
    }
    input.placeholder = 'Enter task title';
    input.onchange = function() {};
  });
}