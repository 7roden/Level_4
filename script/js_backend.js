const config1 = {
  parent: '#usersTable',
  columns: [
    { title: 'Имя', value: 'name' },
    { title: 'Фамилия', value: 'surname' },
    { title: 'Возраст', value: 'age' },
  ],
  apiUrl: 'https://mock-api.shpp.me/rdenysenko/users'
};

let columns = [{ title: '№', value: 'id' }];
let maxID = 51;
let colNum;

let buttonDel;

function DataTable(config) {
  colNum = 1;
  maxID = 0;
  if (config.apiUrl) {
    getNewData(config.apiUrl)
      .then(newData => {
        console.log(newData);
        for (let key in newData[2]) {
          columns = columns.concat([{ title: key, value: key }]);
        }
        createTable(columns, newData);
      })
      .catch(error => console.log(error));
  }
}

async function getNewData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.data;
}

function createTable(newArray, data) {
  let tableDiv = document.querySelector(config1.parent);
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  tableDiv.appendChild(table);
  table.appendChild(thead);
  table.appendChild(tbody);
  let trTagInThead = document.createElement('tr');
  thead.appendChild(trTagInThead);
  createThead(trTagInThead, newArray);
  for (let key in data) {
    createTbody(tbody, key, data[key], newArray, colNum);
    colNum++;
    maxID = Math.max(maxID, key);
  }
}

function createThead(tr, newArray1) {
  for (let i = 0; i < newArray1.length; i++) {
    let th = document.createElement('th');
    th.className = newArray1[i].value;
    th.innerHTML = newArray1[i].title;
    tr.appendChild(th);
  }
  tr.appendChild(document.createElement('th'));
}

function createTbody(tbody, id, data1, newArray1, col) {
  let tr = document.createElement('tr');
  tr.id = id;
  tr.className = 'userData';
  tbody.appendChild(tr);
  for (let i = 0; i < newArray1.length; i++) {
    let td = document.createElement('td');
    td.className = newArray1[i].value;
    if (td.className === 'id') {
      td.innerHTML = col;
    } else if (td.className === 'avatar') {
      td.innerHTML = '<img src="' + data1[newArray1[i].value] + '" alt="' + data1.surname + '">';
    } else if (td.className === 'birthday') {
      let date = data1[newArray1[i].value] + '';
      td.innerHTML = date.slice(8, 10) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4);
    } else {
      td.innerHTML = data1[newArray1[i].value];
    };
    tr.appendChild(td);
  }
  tr.appendChild(createButtonDel(tr.id));
}

function createButtonDel(id) {
  let td = document.createElement('td');
  let btn = document.createElement('button');
  btn.className = 'buttonDel';
  btn.innerText = 'Delete';
  btn.dataset.id = id;
  td.appendChild(btn);
  btn.addEventListener('click', (e) => {
    console.log('Button clicked ' + e.target.dataset.id)
    let isDelete = confirm('Delete?');
    if (isDelete) {
      let response = fetch(config1.apiUrl + `/${e.target.dataset.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          window.location.reload();
        })
    }
  });
  return td;
}

function addUser(newUser) {
  maxID++;
  let response = fetch(config1.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newUser)
  })
    .then(() => {
      alert('User ' + newUser.name + ' ' + newUser.surname + ' added');
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document.querySelector('#addUser').addEventListener('click', () => {

  if (!document.querySelector('.addForm')) {
    let trForm = document.createElement('tr');
    trForm.className = 'addForm'
    trForm.innerHTML = '<td></td>' +
      '<td><input type="text" name="name" required></td>' +
      '<td><input type="text" name="surname" required></td>' +
      '<td><input type="text" name="avatar"></td>' +
      '<td><input type="date" name="birthday" required></td>' +
      '<td><input id="buttonAdd" type="submit" value="Add">';

    let tr = document.querySelector('.userData');
    tr.parentNode.insertBefore(trForm, tr);
    document.getElementById('buttonAdd').addEventListener('click', (e) => {
      clickAddUser(e);
    });
  }
});

function clickAddUser(even) {
  let input = document.querySelectorAll(`${config1.parent} input[required]`);
  let inputAll = document.querySelectorAll(`${config1.parent} input`)
  console.log('1 ' + inputAll[0].value);
  let newUser = {
    [inputAll[0].name]: inputAll[0].value,
    [inputAll[1].name]: inputAll[1].value,
    [inputAll[2].name]: inputAll[2].value,
    [inputAll[3].name]: inputAll[3].value,
  }
  let isNoValid = checkValid(input);
  if (!isNoValid) {
    addUser(newUser);
    console.log(JSON.parse(JSON.stringify(newUser)));
    even.preventDefault();
  } else {
    input.forEach(a => a.className = 'red');
    alert('Fill in required fields');
    even.preventDefault();
  };
}

function checkValid(input1) {
  for (let i = 0; i < input1.length; i++) {
    console.log(i + ' ' + input1[i].value);
    if (input1[i].value === '') return true;
  }
  return false;
}

DataTable(config1);

// https://doka.guide/js/deal-with-forms/ отправка формы

/* 
    (async () => {
      let response = await fetch(config1.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(new FormData(form))
      });
    });


      let newUser = Array.from((new FormData(form)).entries())
    .reduce((a, item) => ((a[item[0]] = item[1]), a), {});
  let isNoValid = form.checkValidity();
  input.forEach(a => {
    a.className = 'red';
    if (!isNoValid) {
      even.preventDefault();
    }
  });
    */
