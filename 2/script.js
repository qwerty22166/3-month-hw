const promise = new Promise((resolve, rejekt) => {
    const data = {
        userName: "user name",
        userAge: 22,
        hobbi: "Play Game",
    };

    const jsonData = JSON.stringify(data);
    const fromJSONData = JSON.parse(jsonData);

    setTimeout(() => {
       let errorIndicate = true;

       if(errorIndicate === true) {
            resolve(fromJSONData);
        } else {
            rejekt("dont touch here");
        }
    });

});

promise
  .then((resolve) => console.log("Server get response...", resolve))
  .catch((reject) => console.log(reject));