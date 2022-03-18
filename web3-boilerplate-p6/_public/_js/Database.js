// https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/onsuccess
class Database {

  constructor(){
    // IndexedDB
    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    // IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
    this.dbVersion = 1.0;
    this.dbName = "dataFiles";
    // this.dbStore = "data";
  }

 setKV(_key, _value){

   // Create/open database
   let request = this.indexedDB.open(this.dbName, this.dbVersion),
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
           var putValue = await transaction.objectStore("data").put(_value,_key);
           var getValue = await transaction.objectStore("data").get(_key);
           getValue.onsuccess = () => {
             console.log("Data added/modified --->",getValue.result);
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
           if (db.version != this.dbVersion) {
               var setVersion = db.setVersion(dbVersion);
               setVersion.onsuccess = function () {
                   createObjectStore(db);
                   putData();
               };
           } else {
               putData();
           }
       } else {
           putData();
       }
   }

   // For future use. Currently only in latest Firefox versions
   request.onupgradeneeded = function (event) {
       createObjectStore(event.target.result);
   };
  }

  getKV(_key){

    // Create/open database
    let request = this.indexedDB.open(this.dbName, this.dbVersion),
        createObjectStore = function (dataBase) {
            // Create an objectStore
            console.log("Creating objectStore")
            dataBase.createObjectStore("data",{autoIncrement:true});
        },
        getData = async function () {
            console.log("Getting data from IndexedDB");
            // Open a transaction
            var transaction = db.transaction(["data"], "readonly");
            // get the data from the database
            var getValue = await transaction.objectStore("data").get(_key);
            getValue.onsuccess = () => {
              console.log("getKV results: ",getValue.result);
              return getValue.result
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
            if (db.version != this.dbVersion) {
                var setVersion = db.setVersion(dbVersion);
                setVersion.onsuccess = function () {
                    createObjectStore(db);
                    getData();
                };
            } else {
                getData();
            }
        } else {
            getData();
        }
    }

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
        createObjectStore(event.target.result);
    };
   }

}



export { Database };
