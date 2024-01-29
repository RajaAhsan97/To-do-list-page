var TdlArray = [];
var updateFlag = 0;
var listElementIdNum = 0;
var daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function changeColorOnFocus(objInst){
    objInst.style.backgroundColor = 'yellow';
}
function changeColorOnBlur(objInst){
    objInst.style.backgroundColor = 'white';
}

function saveTxt(text){
    var textInput = document.getElementById(text).value;

    if (textInput === ""){
        alert("Please enter text");
    } else{
        if (updateFlag == 0){
            TdlArray.push(textInput);
            alert("Task added to list: " + TdlArray[TdlArray.length - 1]);                    

            /* get ID of list */
            var orderList = document.getElementById("displayTdl");

            /* create list element */ 
            var createEle = document.createElement('li');
            createEle.setAttribute('id', [TdlArray.length - 1]);
            createEle.setAttribute('class', 'list-group-item list-group-item-success');
            console.log("Task "+[TdlArray.length - 1] + " is added to list");
            createEle.innerHTML = TdlArray[TdlArray.length - 1];
            
            /* create time stamp for TDL */
            var createTimeStamp = document.createElement('div');
            createTimeStamp.setAttribute('id', "TS"+[TdlArray.length - 1])
            var dateTime = new Date();
            var timeStamp = "created on: " + daysName[dateTime.getDay()] + " " + monthName[dateTime.getMonth()] + " " + dateTime.getDate() + " " + dateTime.getFullYear() + " " + dateTime.getHours()  + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
            createTimeStamp.innerHTML = timeStamp;
            createEle.appendChild(createTimeStamp);

            /* create control button for list element */
            // update button
            var updateButton = document.createElement('button');
            updateButton.setAttribute('id', "upBtn-"+[TdlArray.length-1]);
            updateButton.setAttribute('class', "btn btn-primary btn-sm");
            updateButton.innerHTML = "update";
            updateButton.addEventListener('click', uButton);
            createEle.appendChild(updateButton);

            // delete button
            var deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', "delBtn-"+[TdlArray.length-1]);
            deleteButton.setAttribute('class', 'btn btn-danger btn-sm');
            deleteButton.innerHTML = "Delete";
            createEle.appendChild(deleteButton);
            deleteButton.addEventListener('click', dButton);

            orderList.appendChild(createEle);

            document.getElementById("displayMsg").innerHTML = "Task " + [TdlArray.length] + " added in To-do list ";
            console.log("New task added to array: " + TdlArray);
        }else{
            var updateElement = document.getElementById(listElementIdNum);

            TdlArray.splice(listElementIdNum,1, document.getElementById("saveText").value);
            console.log("Task updated in array " + TdlArray);
            updateElement.innerHTML = TdlArray[listElementIdNum];

            /* create time stamp for TDL */
            var createTimeStamp = document.createElement('div');
            createTimeStamp.setAttribute('id', "TS"+[listElementIdNum]);
            var dateTime = new Date();
            var timeStamp = "updated on: " + daysName[dateTime.getDay()] + " " + monthName[dateTime.getMonth()] + " " + dateTime.getDate() + " " + dateTime.getFullYear() + " " + dateTime.getHours()  + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
            createTimeStamp.innerHTML = timeStamp;
            updateElement.appendChild(createTimeStamp);

            /* create control button for list element */
            // update button
            var updateButton = document.createElement('button');
            updateButton.setAttribute('id', "upBtn-"+[listElementIdNum]);
            updateButton.setAttribute('class', "btn btn-primary btn-sm ");
            updateButton.innerHTML = "update";
            updateButton.addEventListener('click', uButton);
            updateElement.appendChild(updateButton);

            // delete button
            var deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', "delBtn-"+[listElementIdNum]);
            deleteButton.setAttribute('class', 'btn btn-danger btn-sm');
            deleteButton.innerHTML = "Delete";
            updateElement.appendChild(deleteButton);
            deleteButton.addEventListener('click', dButton);

            document.getElementById("displayMsg").innerHTML = "Task " + [listElementIdNum+1] + " updated successfully";
            updateFlag = 0;
        }

        document.getElementById(text).value = "Enter Text...";
    }
}

function uButton(){
        //alert("buttonId:" + event.target.id);
        var eventId = event.target.id;
        var idLength = eventId.length;
        var listElementId = '';
        
        for (var iter=6; iter<idLength; iter++){
            listElementId += eventId.charAt(iter);
        }

        listElementIdNum = parseInt(listElementId);
        console.log("Task ID qcquired to update: " + listElementId);

        document.getElementById("saveText").value = TdlArray[listElementIdNum];
        updateFlag = 1;
    }

function dButton(){
        //alert("DELbuttonId:" + event.target.id);
        var eventId = event.target.id;
        var idLength = eventId.length;
        var id = '';
        for (var iter=7; iter<idLength; iter++){
            id += eventId.charAt(iter);
        }
        
        console.log("Acquired task ID to be removed: " + id);

        /* removing task from the list */
        var removeEle = document.getElementById(id);
        removeEle.remove();

        var strIdToNum = parseInt(id);
        TdlArray.splice(strIdToNum,1);
        console.log("Updated tasks array after removal of particular task: " + TdlArray);
        
        /* loop to update the IDs of all task followed by the removed task */
        for (var ids=strIdToNum; ids<TdlArray.length; ids++){
            var delBtnId = "delBtn-"+[ids+1];
            var updtBtnId = "upBtn-"+[ids+1];
            var timeStampId = "TS"+[ids+1];

            /* load elements objects in the list */
            var updateDelBtnIds = document.getElementById(delBtnId);
            var updateListId = document.getElementById(ids+1);
            var updateUpBtnIds = document.getElementById(updtBtnId);
            var updateTimeStampIds = document.getElementById(timeStampId);
            
            /* update their IDs */
            updateDelBtnIds.setAttribute('id', "delBtn-"+[ids]);
            updateListId.setAttribute('id', [ids]);
            updateUpBtnIds.setAttribute('id', "upBtn-"+[ids]);
            updateTimeStampIds.setAttribute('id', "TS"+[ids]);
        } 
        document.getElementById("displayMsg").innerHTML = "Task " + [strIdToNum+1] + " removed";

        /* If list is empty, display the message */
        if (TdlArray.length === 0){
            document.getElementById("displayMsg").innerHTML = "Add Tasks to your list";
        }
}