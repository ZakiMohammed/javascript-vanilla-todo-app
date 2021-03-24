"use strict"

// variables
let tasks = [];

// elements
const list = document.getElementById('list');
const empty = document.getElementById('empty');
const taskContainer = document.getElementById('taskContainer');
const add = document.getElementById('add');
const clearAll = document.getElementById('clearAll');
const title = document.getElementById('title');

// functions
const getId = () => {
    const id = Math.floor(Math.random() * 1000);
    const found = tasks.find(i => i.id === id);
    if (found) {
        getId();
    } else {
        return id;
    }
};

const toggleContainer = () => {
    // show empty message or task container
    if (tasks.length !== 0) {
        taskContainer.className = '';
        empty.className = 'd-none';
    } else {
        taskContainer.className = 'd-none';
        empty.className = '';
        list.innerHTML = '';
    }
};

const remove = function (e, id) {
    tasks = tasks.filter(i => i.id !== id);
    e.closest('.list-group-item').remove();
    toggleContainer();
};

const toggleComplete = function (e, id) {
    const task = tasks.find(i => i.id === id);
    const label = e.closest('.form-group').lastElementChild;

    if (task.completed) {
        task.completed = false;
        label.innerHTML = task.title;
    } else {
        task.completed = true;
        label.innerHTML = `<del>${task.title}</del>`;
    }
};

// listeners
add.addEventListener('click', function (e) {
    // e.preventDefault(); // when using form element

    // undefined or null or empty string or 0
    if (!title.value) {
        alert('Please enter task title');
        return;
    }

    const task = { id: getId(), title: title.value, completed: false };
    tasks.push(task);

    list.innerHTML += `
        <li class="list-group-item">
            <div class="row">
                <div class="col-10">
                    <div class="form-group form-check mb-0">
                        <input type="checkbox" class="form-check-input" ${task.completed ? 'checked' : ''}  onclick='toggleComplete(this, ${task.id})'>
                        <label class="form-check-label">
                            ${task.completed ? `<del>${task.title}</del>` : task.title}
                        </label>
                    </div>
                </div>
                <div class="col-2 text-right">
                    <button type="button" class="btn btn-danger btn-sm" onclick="remove(this, ${task.id})">X</button>
                </div>
            </div>
        </li>`;

    toggleContainer();

    title.value = '';
});
title.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        add.click();
    }
})
clearAll.addEventListener('click', function () {
    tasks = [];
    toggleContainer();
});

// on page load
toggleContainer();
