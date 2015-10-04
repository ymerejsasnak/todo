(function(){
    var elements = {toAddItem: document.getElementById('to-add-item'),
                    addItem:  document.getElementById('add-item'),
                    toDoList: document.getElementById('todo-list'),
                    doneList: document.getElementById('done-list')
                    };

    
    function addItem(list, item) {
        var itemNode = document.createElement('li');
        var textNode = document.createTextNode(item);
        
        itemNode.appendChild(textNode);
        list.appendChild(itemNode);        
    }

    


    
    //add an element after hitting 'add' button
    elements.addItem.addEventListener('click', function() {
        addItem(elements.toDoList, elements.toAddItem.value);
        elements.toAddItem.value = '';
    });


    //remove an element from to do list if clicked on and move it to done list
    elements.toDoList.addEventListener('click', function(event) {
        var itemNode = event.target;

        if (itemNode.tagName.toLowerCase() === 'li') {
            addItem(elements.doneList, itemNode.innerText)
            itemNode.parentNode.removeChild(itemNode);
        }
    });


    //delete from done list if clicked
    elements.doneList.addEventListener('click', function(event) {
        var itemNode = event.target;

        if(itemNode.tagName.toLowerCase() === 'li') {
            itemNode.parentNode.removeChild(itemNode);
        }
    })





})();