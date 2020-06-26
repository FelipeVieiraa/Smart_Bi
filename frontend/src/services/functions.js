export default function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        //for( const state of states ) {
        //    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        //}
    } )
}

/*export default function getCities(e) {
    const citySelect = document.querySelector("select[name=city]");

    citySelect.innerHTML = '<option value="">Selecione a cidade</option>';
    citySelect.disabled = true;

    const stateInput = document.querySelector("input[name=state]");

    const ufValue = e.target.value;

    const indexOfSelectedState = e.target.selectedIndex;
    stateInput.value = e.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
           citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    } )

}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll('.items-grid li');

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

export default function handleSelectedItem(e) {
    const itemLi = e.target;
    const itemId = itemLi.dataset.id;
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    itemLi.classList.toggle("selected");

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;

            return itemIsDifferent;
        } )

        selectedItems = filteredItems
    }else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;

}
*/