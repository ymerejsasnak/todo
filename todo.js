(function(){
    var elements = {toAddItem: document.getElementById('to-add-item'),
                    addItem:  document.getElementById('add-item'),
                    toDoList: document.getElementById('todo-list'),
                    };

    
    function addItem(list, item) {
        var itemNode = document.createElement('li');
        var textNode = document.createTextNode(item);
        itemNode.appendChild(textNode);
        list.appendChild(itemNode);
    }


    

    elements.addItem.addEventListener('click', function() {
        addItem(elements.toDoList, elements.toAddItem.value);
    });
    










})();