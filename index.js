console.log("This is my project 6");


//Create variable for no of div
let addParamCount = 0;

//Utility classes to convert string to DOM  
function getElementFromString(string) {
    //here we create the obj of string
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Hide the parameter box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//Hide parameterBox when jsonBox is visible
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//Hide jsonBox when parameterBox is visible
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//Add parameters(boxes) on params(Id) after click on + button
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let Params = document.getElementById('params')

    let string = `  <div class="form-row my-3">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Value">
                        </div>
                        <button class="btn btn-primary deleteparam">-</button>
                    </div>`

    //convert string into Dom node
    let paramElement = getElementFromString(string);
    Params.appendChild(paramElement); //here we append a Dom(object) into params

    //Add a eventListner to remove parameter when clicking - button
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addParamCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    //fetch all the response enterd by the user
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //If user choose params option instead of Json then collect all the data in a string
    if (contentType == 'params')// params == params (bcz contentType return params)
    {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
            if ((document.getElementById('parameterKey' + (i + 1)) != undefined)) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; //Add a Key-Value Pair Using Bracket Notation in JavaScript
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    console.log("URL is ", url);
    console.log("RequestType is ", requestType);
    console.log("ContentType", contentType);
    console.log("Data is ", data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.text())
        .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
        Prism.highlightAll();
        });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById('responsePrism').innerHTML = text;
        Prism.highlightAll();
        });

    }
})


