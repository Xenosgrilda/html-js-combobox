const dropdownBtn = document.querySelector('.nice-input-dropdown-button');
const icon = document.querySelector('.nice-input-dropdown-button > i');
const input = document.querySelector('#nice-input');
const datalist = document.querySelector('.datalist');

dropdownBtn.addEventListener('click', () => {
    datalist.classList.toggle('shown');
    icon.classList.toggle('rotate-180');
})

// Filtering and Displaying ComboBox
input.addEventListener('input', filterList);
input.addEventListener('dblclick', filterList);

// Put value into input
datalist.querySelectorAll('ul > li').forEach(item => {
    item.addEventListener('click', () => {

        input.value = item.textContent;

        if((datalist.classList.contains('shown'))){
            datalist.classList.remove('shown');
        }
    })
})

// Closing ComboBox
window.addEventListener('click', () => {

    if( (event.target != datalist)      && 
        (event.target != dropdownBtn)   && 
        (event.target != icon)          &&
        (event.target != input)) {

        if((datalist.classList.contains('shown'))){
            datalist.classList.remove('shown');
        }
        if((icon.classList.contains('rotate-180'))){
            icon.classList.remove('rotate-180');
        }
    }
});

function filterList() {

    let found = false;

    // Removing message item
    const messageItem = document.querySelector('#message-list-item');
    messageItem !== null ? messageItem.remove() : null;

    if(!(datalist.classList.contains('shown'))){
        datalist.classList.add('shown');
    }
    if(!(icon.classList.contains('rotate-180'))){
        icon.classList.add('rotate-180');
    }

    const regex = new RegExp(`${input.value}`, "i");
    const listItems = datalist.querySelectorAll('ul > li');

    listItems.forEach(item => {

        if(regex.test(item.textContent)){
            item.style.display = 'block';
            found = true;
        } else {
            item.style.display = 'none';
        }
    })

    if(!found){
        const li = document.createElement('li');
        li.textContent = 'There was not match found...';
        li.id = 'message-list-item';

        datalist.querySelector('ul').appendChild(li);
    }
}