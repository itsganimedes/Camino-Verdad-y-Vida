const navIcon = document.getElementById("search_icon");
const navInput = document.getElementById("search_input");

const mainInput = document.getElementById("main_search");
const searchBtn = document.getElementById("search_btn");

const noResults = document.getElementById("no_results_message");




// =========================
// ABRIR BUSCADOR NAV
// =========================

navIcon.addEventListener("click", () => {

    navInput.classList.toggle("active");

    if(navInput.classList.contains("active")){
        navInput.focus();
    }

});




// =========================
// NORMALIZAR TEXTO
// =========================

function normalizeText(text){

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}




// =========================
// FUNCIÓN GLOBAL DE BÚSQUEDA
// =========================

function searchSections(searchValue){

    const search = normalizeText(searchValue);

    const sections = document.querySelectorAll("section");



    // SI ESTÁ VACÍO → MOSTRAR TODO
    if(search === ""){

        sections.forEach(section => {

            if(section.id === "comfort_search"){
                return;
            }

            section.style.display = "";

        });

        noResults.classList.remove("show");

        return;
    }



    let firstMatch = true;
    let foundAny = false;



    sections.forEach(section => {

        // NO OCULTAR EL SEARCH PRINCIPAL
        if(section.id === "comfort_search"){
            return;
        }



        const text = normalizeText(section.innerText);

        const tags = normalizeText(
            section.dataset.tags || ""
        );

        const searchableContent = text + " " + tags;



        if(searchableContent.includes(search)){

            section.style.display = "";

            foundAny = true;



            if(firstMatch){

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                firstMatch = false;
            }

        }else{

            section.style.display = "none";

        }

    });




    // =========================
    // MENSAJE SI NO HAY RESULTADOS
    // =========================

    if(!foundAny){

        noResults.classList.add("show");

    }else{

        noResults.classList.remove("show");

    }

}




// =========================
// BOTÓN PRINCIPAL
// =========================

searchBtn.addEventListener("click", () => {

    searchSections(mainInput.value);

});




// =========================
// ENTER EN SEARCH PRINCIPAL
// =========================

mainInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        searchSections(mainInput.value);

    }

});




// =========================
// BUSCADOR NAV EN TIEMPO REAL
// =========================

navInput.addEventListener("input", () => {

    searchSections(navInput.value);

});




// =========================
// ENTER EN NAV
// =========================

navInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        searchSections(navInput.value);

    }

});