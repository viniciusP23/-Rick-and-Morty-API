const characterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const btnReset = document.getElementById("btn-reset");
const content = document.getElementById("content");
const containerResult = document.getElementById("result-style");
const image = document.getElementById("img");

const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        });

    return result;
}

const keys = ["name", "status", "species", "gender", "origin", "episode"];
const newKeys = {
    name: "Nome",
    status: "Status",
    species: "Espécie",
    gender: "Gênero",
    origin: "Origem",
    episode: "Episódio"
};


const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((item) => {

            if (item.checked === true && (Array.isArray(result[item.name])) === true ) {
                const arrayResult = result[item.name].join("\r\n");
                const newElem = document.createElement("p");
                newElem.innerHTML = `${newKeys[item.name]}: ${arrayResult.length}`;
                content.appendChild(newElem);

            }else if (item.checked === true && (item.name === "origin")) {
                const newElem = document.createElement("p");
                newElem.innerHTML = `${newKeys[item.name]}: ${result[item.name].name}`;
                content.appendChild(newElem);

            }else if (item.checked === true && typeof (result[item.name]) !== "object") {
                const newElem = document.createElement("p");
                newElem.innerHTML = `${newKeys[item.name]}: ${result[item.name]}`;
                content.appendChild(newElem);
            }
        })
}

btnGo.addEventListener("click", async (event) => {
    event.preventDefault();

    if (characterId.value === "") {
        return content.innerHTML = "È necessário fazer um filtro.";
    };

    const result = await fetchApi(characterId.value);
    if (content.firstChild === null) {
        image.src = `${result.image}`;
        buildResult(result);
    } else {
        content.innerHTML = "";
        image.src = `${result.image}`;
        buildResult(result);
    };
});

btnReset.addEventListener("click", () => location.reload());