const postsEL = document.getElementById("posts");

const getData = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data.filter((el) => el.userId === 1);
}
getData().then((el) => {
    const render = el.map(({userId, id, title, body}) => `
    <div class="post">
    <p> ${"User id: "}${userId}</p>
    <p>${"Id: "}${id}</p>
    <p>${title}<br>${body}</p>
    
    </div>
    `)
    postsEL.innerHTML = render.join("")
})

