const promise = new Promise((rejekt) => {
    const data = {
        userName: "user name",
        userAge: 22,
        hobbi: "Play Game",
    };

    const jsonData = JSON.stringify(data);
    const fromJSONData = JSON.parse(jsonData);

    setTimeout(() => {
       let errorIndicate = true;

        if(errorIndicate === false) {
            rejekt("dont touch here");
        } else {
            console.log("Server get response ...", data);
        }
    });
    return fromJSONData
});

promise
  .then((fromJSONData) => console.log(fromJSONData));