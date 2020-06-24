let counter = 1;

let patterns = {
    enterpName: /^[\w ]{1,15}$/,
    incomeValue: /^\d{1,3}$/
}

const inputs = document.querySelectorAll('input');

let diagrams = document.getElementById('diagrams');
let items = document.getElementById('items');
let form = document.getElementById('addForm');
let diagramContainer = document.getElementById('diagrams');

// Validation function 
function validate(field, regex){
    if(regex.test(field.value)) {
        console.log(true);
        field.style.borderColor = '#36cc36';
    }
    else {
        field.style.borderColor = '#CC0000';
        console.log(false);
    }
}
// Attach validation
inputs.forEach(inp => {
    inp.addEventListener('keyup', e => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();

    let nameColor = document.getElementById('enterpr').style.borderColor;
    let incomeColor = document.getElementById('income').style.borderColor;
    console.log(nameColor);
    if(nameColor === 'rgb(204, 0, 0)' || incomeColor === 'rgb(204, 0, 0)') {
        alert('Invalid name or income.');
        return;
    }
    let newEnterprText = document.getElementById('enterpr').value;
    let newIncomeText = document.getElementById('income').value;

    let newLi = document.createElement('li');
    let newDiv = document.createElement('div');
    let newEnterprSpan = document.createElement('span');
    let newIncomeSpan = document.createElement('span');

    newEnterprSpan.appendChild(document.createTextNode(newEnterprText));
    newIncomeSpan.appendChild(document.createTextNode(newIncomeText));

    newEnterprSpan.classList = 'name-span';
    newIncomeSpan.classList = 'income-span';

    newEnterprSpan.setAttribute('contenteditable', 'true');
    newIncomeSpan.setAttribute('contenteditable', 'true');

    newLi.className = 'list-group-item';
    newLi.appendChild(newEnterprSpan);
    newLi.appendChild(newIncomeSpan);
    newLi.setAttribute('data-counter', counter);
    
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.appendChild(document.createTextNode('X'));

    newLi.appendChild(deleteBtn);

    items.appendChild(newLi);
    
    //Add diagram
    newDiv.appendChild(document.createTextNode(newEnterprText));
    newDiv.classList = 'diagram';
    newDiv.setAttribute('data-counter', counter);
    newDiv.setAttribute('data-income', newIncomeText);
    newDiv.setAttribute('data-name', newEnterprText);
    newDiv.style.height = `${newIncomeText * 5}px`;
    let toolTipSpan = document.createElement('span');
    toolTipSpan.classList = 'tooltip';
    newDiv.setAttribute('onmouseover', 'show(this)');
    newDiv.setAttribute('onmouseout', 'hide(this)');

    diagramContainer.appendChild(newDiv);
    counter++;

    document.getElementById('enterpr').value = null;
    document.getElementById('income').value = null;

});

function show(e){
    e.textContent = e.getAttribute('data-income');
}

function hide(e){
    e.textContent = e.getAttribute('data-name');
}

items.addEventListener('click', e => {
    let localCounter = e.target.parentNode.getAttribute('data-counter');
    if(e.target.classList.contains('delete-btn')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement;
            items.removeChild(li);
        }
        let diagramArr = Array.from(document.getElementsByClassName('diagram'));
        let diagrToDelete;
        diagramArr.forEach(elem => {
            if(elem.getAttribute('data-counter') === localCounter) {
                diagrToDelete = elem;
            }
        });
        diagrToDelete.parentElement.removeChild(diagrToDelete);
    }
    if(e.target.tagName === 'LI') return;
    
    let childn = Array.from(e.target.parentElement.childNodes);
    // childn.forEach(e => console.log(e.tagName));
    let filtered = childn.filter(element => {
        return element.tagName == 'SPAN';
    });
    console.log(filtered);
    filtered.forEach(element => {
        element.addEventListener('keyup', ev => {
            let editibleDiagrArr = Array.from(document.getElementsByClassName('diagram'));
            console.log(filtered[0].textContent);
            console.log('keyup');
            editibleDiagrArr[localCounter - 1].setAttribute('data-name', filtered[0].textContent);
            editibleDiagrArr[localCounter - 1].setAttribute('data-income', filtered[1].textContent);
            editibleDiagrArr[localCounter - 1].style.height = `${filtered[1].textContent * 5}px`;
        });
    });
});






























// let form = document.getElementById('addForm');
// let itemList = document.getElementById('items');

// form.addEventListener('submit', e => {

//     e.preventDefault();
    
//     let newItem = document.getElementById('item').value;

//     let li = document.createElement('li');

//     li.className = 'list-group-item';

//     li.appendChild(document.createTextNode(newItem));

//     let deleteBtn = document.createElement('button');
//     deleteBtn.className = 'delete-btn';
//     deleteBtn.appendChild(document.createTextNode('X'));

//     li.appendChild(deleteBtn);

//     itemList.appendChild(li);
// });

// itemList.addEventListener('click', e => {
//     if(e.target.classList.contains('delete-btn')){
//         if(confirm('Are you sure?')){
//             let li = e.target.parentElement;
//             itemList.removeChild(li);
//         }
//     }
// });