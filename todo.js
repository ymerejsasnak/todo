(function(){

    const PREFIX = 'myjstodolist-';
    var elements = {toAddItem:   document.getElementById('to-add-item'),
                    addItem:     document.getElementById('add-item'),
                    toDoList:    document.getElementById('todo-list'),
                    clearButton: document.getElementById('clear'),
                    saveButton:  document.getElementById('save'),
                    loadButton:  document.getElementById('load'),
                    savedLists:  document.getElementById('saved-lists')
                    };
    var toDoList = [];




    
    //add li to appropriate ul
    function addItem(list, item) {
        var itemNode = document.createElement('li');
        var textNode = document.createTextNode(item);
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        
        list.appendChild(checkBox); 
        itemNode.appendChild(textNode);
        list.appendChild(itemNode);
            
    }

    function clearLists() {
        elements.toDoList.innerHTML = '';
        toDoList = [];
    }

    //get new item from text box and add it
    function newItem() {
        var item = elements.toAddItem.value;
        if (item !== '') {
            toDoList.push(item)
            addItem(elements.toDoList, item);
            elements.toAddItem.value = '';
        }
        elements.toAddItem.focus();
    }

    


    
    //add an element after hitting 'add' button
    elements.addItem.addEventListener('click', function() {
        newItem();
    });

    //hitting enter on text box adds it too
    elements.toAddItem.addEventListener('keypress', function(e) {
        if (e.which === 13) {
            newItem();
        }
    })


    //remove an element from to do list if clicked on
    elements.toDoList.addEventListener('click', function(event) {
        var itemNode = event.target;
        var item = itemNode.innerText;

        if (itemNode.tagName.toLowerCase() === 'li') {
            toDoList.splice(toDoList.indexOf(item), 1);
            itemNode.parentNode.removeChild(itemNode);
        }
    });

    
    //save lists
    elements.saveButton.addEventListener('click', function() {
        var saveName = prompt('Enter a name under which to save this list.');
        localStorage.setItem(PREFIX + saveName, JSON.stringify(toDoList));
    });

    
    //load saved lists to display in previously hidden div
    elements.loadButton.addEventListener('click', function() {
        var listNames = [];
        
        //load valid save names from local storage
        for (var name in localStorage){
            if (name.substring(0, PREFIX.length) === PREFIX) {
                listNames.push(name);
            }
        }

        //add names to list to load from (additem function works here too)
        listNames.forEach(function(item) {
            addItem(elements.savedLists, item.substring(PREFIX.length));
        });

        //make div visible
        elements.savedLists.style.visibility = 'visible';
    });


    //load a saved list from 'saved lists' div
    elements.savedLists.addEventListener('click', function(event) {
        var loadName = event.target.innerText;

        clearLists();        

        toDoList = JSON.parse(localStorage.getItem(PREFIX + loadName));   
        console.log(toDoList)     

        toDoList.forEach(function(item) {
            addItem(elements.toDoList, item);
        });
        
        //hide it and remove old names
        elements.savedLists.style.visibility = 'hidden';
        elements.savedLists.innerHTML = '';

    });


    //clear button 
    elements.clearButton.addEventListener('click', function() {
        clearLists();        
    });




})();