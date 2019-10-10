// UI
const wrapperElements = document.querySelectorAll('.nice-input-container');

// LISTENERS
wrapperElements.forEach(wrapper => {

    const dropdownBtn = wrapper.querySelector('.nice-input-dropdown-button');
    const input = wrapper.querySelector('.nice-input');

    // Show dropdown
    dropdownBtn.addEventListener('click', filterList);
    input.addEventListener('keydown', () => {
        if(( (event.key === 'ArrowDown') || (event.key === 'Enter') )){
            filterList(event);
        } else if((event.key === 'ArrowUp')){
            closeDataList(null);
            event.preventDefault();
        }
    });
    // Filter input
    input.addEventListener('input', filterList);
    input.addEventListener('dblclick', filterList);
    // Assign <li> value to input
    wrapper.querySelectorAll('ul > li').forEach(li => {
        li.addEventListener('click', getValueFromLi);
    });
});

window.addEventListener('click', closeDataList);

// Functions
function findDatalistParent(element){

    if(element.parentElement){
        if(element.parentElement.classList.contains('nice-input-container')){
            return element.parentElement;
        } else if(element.tagName === 'BODY' || element.tagName === 'HTML') {
            return null;
        } else {
            return findDatalistParent(element.parentElement);
        }
    } else {
        return null;
    }
}

function filterList(event) {

    let found = false;

    // Local UI Elements
    const wrapper = findDatalistParent(event.currentTarget);
    const datalist = wrapper.querySelector('.datalist');
    const icon = wrapper.querySelector('.nice-input-dropdown-button > i');
    const btn = wrapper.querySelector('.nice-input-dropdown-button');
    const input = wrapper.querySelector('.nice-input');

    // Closing others DataList
    wrapperElements.forEach(wrapperEl => {

        if(wrapperEl !== wrapper){
            const datalistAux = wrapperEl.querySelector('.datalist');
            const iconAux = wrapperEl.querySelector('.nice-input-dropdown-button > i');

            if((datalistAux.classList.contains('shown'))){
                datalistAux.classList.remove('shown');
            }
            if((iconAux.classList.contains('rotate-180'))){
                iconAux.classList.remove('rotate-180');
            }
        }
    });

    // // Checking if it's already open
    if((datalist.classList.contains('shown')) && (event.currentTarget === btn)){

        closeDataList(event, true);
        return false;
    }

    // Removing message item
    const messageItem = wrapper.querySelector('#message-list-item');
    messageItem !== null ? messageItem.remove() : null;

    // Second dblclick to close
    if((event.type === 'dblclick') && (datalist.classList.contains('shown'))){

        datalist.classList.remove('shown');
        icon.classList.remove('rotate-180');

        return false;
    }

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

    event.stopPropagation();
}

function getValueFromLi(event){
    
    const wrapper = findDatalistParent(event.currentTarget);
    const datalist = wrapper.querySelector('.datalist');
    const icon = wrapper.querySelector('.nice-input-dropdown-button > i');
    const li = event.currentTarget;
    const input = wrapper.querySelector('.nice-input');

    if(wrapper !== null) {

        input.value = li.textContent;

        if((datalist.classList.contains('shown'))){
            datalist.classList.remove('shown')
            icon.classList.remove('rotate-180');
        }
    } else {
        console.error('Couldn\'t find wrapper element to get children');
        return false;
    };
}

function closeDataList(event, btnClicked = false){

    // Checking if click comes from input
    if (event.target.classList){
        if(event.target.classList.contains('nice-input')){
            return false;
        }
    }

    if (!(findDatalistParent(event.target)) || (btnClicked)) {
        
        wrapperElements.forEach(wrapper => {
            
            const datalist = wrapper.querySelector('.datalist');
            const icon = wrapper.querySelector('.nice-input-dropdown-button > i');

            if((datalist.classList.contains('shown'))){
                datalist.classList.remove('shown');
            }
            if((icon.classList.contains('rotate-180'))){
                icon.classList.remove('rotate-180');
            }
        })

        event.stopPropagation();
    } else { 
        return false;
    }
}
