const classesEl = document.querySelector("#classes");
const loadingEl = document.querySelector("#loading");
let loading = false;

const getClassesFromBackend = async () => {
  loading = true;
  const res = await fetch("http://localhost:5000/classes");
  const data = await res.json();
  loading = false;
  return data;
};

const addClassesToDOM = async () => {
  const classes = await getClassesFromBackend();

  if (!loading) {
    loadingEl.innerHTML = "";
  }

  console.log(classes);

  classes.forEach((classElement) => {
    const div = document.createElement("div");
    div.className = "classElement";
    div.innerHTML = `
    <h3>${classElement.title}</h3>
    <ul>
      <li><strong>Status: </strong>${classElement.status}</li>
      <li><strong>URL: </strong><a href=${classElement.url}>Link</a></li>
    </ul>
    <div class="tags">${classElement.tags}</div>
    `;

    classesEl.appendChild(div);
  });
};

addClassesToDOM();
