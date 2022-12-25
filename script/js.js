function DataTable(config, data) {
  let newArray = [{ title: '№', value: 'id' }].concat(config.columns);
  let tableDiv = document.querySelector(config.parent);
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  tableDiv.appendChild(table);
  table.appendChild(thead);
  table.appendChild(tbody);
  for (let j = 0; j < data.length + 1; j++) {
    let trTag = document.createElement('tr');
    if (j == 0) {
      thead.appendChild(trTag);
      createThead(trTag, newArray);
    } else {
      trTag.id = data[j - 1].id;
      tbody.appendChild(trTag);
      createTbudy(trTag,data,newArray,j);
    };
  }
}

function createThead(tr, newArray1) {
  for (let i = 0; i < newArray1.length; i++) {
    let th = document.createElement('th');
    th.className = newArray1[i].value;
    th.innerHTML = newArray1[i].title + ((i !== 0) ? '<div class = "sorted"></div>' : '');
    tr.appendChild(th);
  }
  tr.appendChild(document.createElement('th'));
}

function createTbudy(tr,data1,newArray1,col) {
  for (let i = 0; i < newArray1.length; i++) {
    let td = document.createElement('td');
    td.className = newArray1[i].value;
    td.innerHTML = (td.className === 'id') ? col : data1[col - 1][newArray1[i].value];
    tr.appendChild(td);
  };
  tr.appendChild(createButtonDel(tr.id));
}
const config1 = {
  parent: '#usersTable',
  columns: [
    { title: 'Имя', value: 'name' },
    { title: 'Фамилия', value: 'surname' },
    { title: 'Возраст', value: 'age' },
  ]
};


const users = [
  { id: 30050, name: 'Вася', surname: 'Петров', age: 12 },
  { id: 30051, name: 'Вася', surname: 'Васечкин', age: 15 },
  { id: 30052, name: 'Саша', surname: 'Дмитриев', age: 11 },
  { id: 30053, name: 'Дима', surname: 'Александров', age: 14 },
  { id: 30054, name: 'Рома', surname: 'Николаев', age: 16 },
  { id: 30055, name: 'Коля', surname: 'Романов', age: 13 },
];

DataTable(config1, users);
document.addEventListener('click', (event) => {
  let element = event.target;
  let message;
  console.log(element.tagName);
  if (element.className === 'SORTED') sorted(config1, users);
  if (element.tagName === 'TD') {
    users.forEach(a => {
      if (a.id == element.parentNode.id) {
        message = 'Имя: ' + a.name + '\nФамилия: ' + a.surname + '\nВозраст: ' + a.age;
      }
    })
    alert(message);
  }
});


function sorted(config, data) {
  let newData = [].concat(users);
  let divId = config.parent;
  let elementParent = element.parentNode.className;
  newData.sort((a, b) => a[elementParent] - b[elementParent]);
}

function createButtonDel(id) {
  let td = document.createElement('td');
  td.innerHTML = '<button class = "buttonDel" data-id="' + id + '">Delete</button>';
  return td;
}


