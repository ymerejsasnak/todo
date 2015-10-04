(function(){
    var elements = {toAddItem:   document.getElementById('to-add-item'),
                    addItem:     document.getElementById('add-item'),
                    toDoList:    document.getElementById('todo-list'),
                    doneList:    document.getElementById('done-list'),
                    clearButton: document.getElementById('clear'),
                    saveButton:  document.getElementById('save'),
                    loadButton:  document.getElementById('load'),
                    };
    var lists = {todo: [], done: []};

    
    function addItem(list, item) {
        var itemNode = document.createElement('li');
        var textNode = document.createTextNode(item);
        
        itemNode.appendChild(textNode);
        list.appendChild(itemNode);        
    }

    function clearLists() {
        elements.toDoList.innerHTML = '';
        elements.doneList.innerHTML = '';
        lists = {todo: [], done: []};
    }

    


    
    //add an element after hitting 'add' button or enter
    elements.addItem.addEventListener('click', function() {
        var item = elements.toAddItem.value;
        if (item !== '') {
            lists.todo.push(item)
            addItem(elements.toDoList, item);
            elements.toAddItem.value = '';
        }
        elements.toAddItem.focus();
    });


    //remove an element from to do list if clicked on and move it to done list
    elements.toDoList.addEventListener('click', function(event) {
        var itemNode = event.target;
        var item = itemNode.innerText;

        if (itemNode.tagName.toLowerCase() === 'li') {
            lists.done.push(item);
            lists.todo.splice(lists.todo.indexOf(item), 1);
            addItem(elements.doneList,item)
            itemNode.parentNode.removeChild(itemNode);
        }
    });


    //delete from done list if clicked
    elements.doneList.addEventListener('click', function(event) {
        var itemNode = event.target;
        var item = itemNode.innerText;

        if(itemNode.tagName.toLowerCase() === 'li') {
            lists.done.splice(lists.done.indexOf(item), 1);
            itemNode.parentNode.removeChild(itemNode);
        }
    });

    
    //save lists
    elements.saveButton.addEventListener('click', function() {
        var saveName = prompt('Enter a name under which to save this list.');
        localStorage.setItem(saveName, JSON.stringify(lists));
    });

    
    //load saved lists
    elements.loadButton.addEventListener('click', function() {
        var loadName = prompt('Enter a name to load those lists.');

        clearLists();        

        lists = JSON.parse(localStorage.getItem(loadName));        

        lists.todo.forEach(function(item) {
            addItem(elements.toDoList, item);
        });
        lists.done.forEach(function(item) {
            addItem(elements.doneList, item);
        });
    });



    //clear button 
    elements.clearButton.addEventListener('click', function() {
        clearLists();        
    });




})();