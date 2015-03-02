/**
 * Created by micer on 3/1/15.
 */

$(function(){
    var LocalStorageHelper = {
        setItem: function(key, val){
            if(window.localStorage){
                localStorage.setItem(key, val);
            }
        },
        getItem: function(key){
            if(window.localStorage){
                if(localStorage.getItem(key)){
                    return localStorage.getItem(key)
                }
            }
        }
    };

    var SessionStorageHelper = {
        setItem: function(key, val){
            if(window.sessionStorage){
                sessionStorage.setItem(key, val);
            }
        },
        getItem: function(key){
            if(window.sessionStorage){
                if(sessionStorage.getItem(key)){
                    return sessionStorage.getItem(key)
                }
            }
        },
        get GUID(){
            "use strict"
            var part;
            var guid;
            for(var i = 0; i < 8; i++){
                part = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                switch (i){
                    case 0: guid = part;
                        break;
                    case 1: guid += part + "-";
                        break;
                    case 2: guid += part + "-4";
                        break;
                    case 3: guid += part.substr(0,3) + "-";
                        break;
                    case 4: guid += part + "-";
                        break;
                    case 5: guid += part;
                        break;
                    case 6: guid += part;
                        break;
                    case 7: guid += part;
                        break;
                }

            }
            return guid.toLowerCase();
        }
    }

    var InitializeHelper = {
        init: function(){
            this.addEvent(document.getElementsByTagName("button").item(0), "click", function(e){
                "use strict"
                var inputName = document.getElementById("name").value;
                var backgroundColor = document.getElementById("backgroundColor").value;
                if (inputName !== "") {
                    LocalStorageHelper.setItem("name", inputName);
                    LocalStorageHelper.setItem(inputName, backgroundColor);
                } else {
                    alert("Please input your name!");
                }
                e.preventDefault();
            });
            this.showStorageData();
        },
        addEvent: function(handler, event, fun){
            handler.addEventListener(event,fun);
        },
        showStorageData: function()
        {
            "use strict"
            var footer = document.getElementsByTagName("footer").item(0);
            var guid = SessionStorageHelper.GUID;
            var name = LocalStorageHelper.getItem("name");
            var backgroundColor = LocalStorageHelper.getItem(name);
            var h = document.createElement("h4");
            if (name === undefined) {
                name = "[name]"
            }
            SessionStorageHelper.setItem("GUID", guid);
            h.textContent = "Hi " + name + ", your session GUID is " + guid;
            footer.appendChild(h);
            if (backgroundColor) {
                $('body').css("background", backgroundColor);
            }
        }
    }
    InitializeHelper.init();
});
