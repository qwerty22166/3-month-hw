const postsContainerEL = document.getElementById("posts-container");
const filterEl = document.getElementById("filter");
const loaderEl = document.getElementById("loader");

let limit = 10;
let page = 1;
let loaderIndicate = false; 
let dataFromBack = [];

const getData = async() => {
const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
);
const data =await response.json();
page += 1;

dataFromBack = [...dataFromBack, ...data];

return data;
};

const renderPost = ({id, title, body}) => {
    return`
    <div class="post">
        <div class="number"> ${id} </div>

        <div class="post-info>
            <h2 class="post-title">${title}</h2>
            <p class="post-body">${body}</p>
        </div>
    </div>
    `;
};

const createHTMLTemlate = (data) => {
    let text = data.reduce(
        (template, element) => template + renderPost(element),
        ""
    );

return text;
};

const renderHTMLTemplate = () => {
    loaderIndicate = true
    loaderEl.classList.add("show");

    getData()
      .then((posts) => {
        postsContainerEL.innerHTML += createHTMLTemlate(posts);
      })
      .finally(() => {
        loaderIndicate = false
        loaderEl.classList.remove("show");
      });
};

const scrollCheck = () => {
    if(loaderIndicate){
        return;
    }
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement
    console.log(scrollTop, clientHeight, scrollHeight);

    scrollTop + clientHeight >= scrollHeight && renderHTMLTemplate();
};

const searchPosts = (event) => {
    const term = event.target.value.toLowerCase();
    const filteresPosts = dataFromBack.filter(
        (el) => {
        return el.title.toLowerCase().indexOf(term) > -1 || el.body.toLowerCase().indexOf(term) > -1 || el.id.indexOf(term) >=0
        }
    );
    postsContainerEL.innerHTML = createHTMLTemlate(filteresPosts);
}

window.addEventListener("scroll", scrollCheck);
filterEl.addEventListener("input", searchPosts)

renderHTMLTemplate();