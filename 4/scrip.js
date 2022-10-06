const postEl = document.getElementById("posts")

const posts = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    const render = await data.map(({userId, id, title, body}) => `
<div class="post">
<p> ${"User id: "}${userId}</p>
<p>${"Id: "}${id}</p>
<p>${title}<br>${body}</p>

</div>
`)
postEl.innerHTML = render.join("<br>");
}
posts();