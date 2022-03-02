( function () {
    // IndexedDB
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        // IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1.0;

    // Create/open database
    var request = indexedDB.open("dataFiles", dbVersion),
        createObjectStore = function (dataBase) {
            // Create an objectStore
            console.log("Creating objectStore")
            dataBase.createObjectStore("data",{autoIncrement:true});
        },
        putData = async function () {
            console.log("Putting data in IndexedDB");

            // Open a transaction to the database
            // let request = objectStore.put(item, key);
            var transaction = db.transaction(["data"], "readwrite");

            // Put the data into the dabase
            let key = "name";
            let value = {firstName:"Brandy",middleNmae:"Lee",lastName:"Camacho"};
            var put = await transaction.objectStore("data").put(value,key);
            var getName = await transaction.objectStore("data").get(key);

            getName.onsuccess = () => {
              console.log(getName.result);
            };


        };

    request.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };

    request.onsuccess = function (event) {
        console.log("Success creating/accessing IndexedDB database");
        db = request.result;

        db.onerror = function (event) {
            console.log("Error creating/accessing IndexedDB database");
        };

        // Interim solution for Google Chrome to create an objectStore. Will be deprecated
        if (db.setVersion) {
            if (db.version != dbVersion) {
                var setVersion = db.setVersion(dbVersion);
                setVersion.onsuccess = function () {
                    createObjectStore(db);
                    putData();
                };
            }
            else {
                putData();
            }
        }
        else {
            putData();
        }
    }

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
        createObjectStore(event.target.result);
    };
})();
