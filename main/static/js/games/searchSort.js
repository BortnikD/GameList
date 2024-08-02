"use strict";

import { getListGames, section, createNewGamesCard, loadGames } from "./games_card.js";

const searchField = document.querySelector('#search-input');
const sortSelect = document.querySelector("#sort-select");
const btnSearch = document.querySelector('#search-by-name');
var sortValue = false;

/**
 * Ищет игры по названию, скрывает все карточки игр и показывает только те, 
 * которые соответствуют запросу.
 */
function search(){
    let listGames = getListGames();
    const textToSearch = searchField.value.toLowerCase();
    const searchGames = listGames.filter(obj => 
        obj.name.toLowerCase().includes(textToSearch));
    const allGameCards = document.querySelectorAll('.game-card');
    allGameCards.forEach(card => card.style.display = 'none');
    // Показываем только те карточки, которые подходят под поиск
    searchGames.forEach(game => {
        let gameCard = document.getElementById(game.id);
        if (gameCard) {
            gameCard.style.display = 'block'; // Показываем карточку
        }
    });
}

/**
 * Сортирует игры по выбранному критерию и обновляет отображаемый список игр.
 * 
 * @param {Event} [event] - Событие выбора в интерфейсе сортировки. 
 * Если не передано, используется ранее выбранное значение.
 */
function sort(event){
    let listGames = getListGames();
    let selectedValue;
    if (sortValue && !event) {
        selectedValue = sortValue;
    } else if (event) {
        selectedValue = event.target.value;
        sortValue = selectedValue;
    }
    let sortedGames;
     switch (selectedValue) {
        case 'price-asc':
            sortedGames = [...listGames].sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedGames = [...listGames].sort((a, b) => b.price - a.price);
            break;
        case 'rate':
            sortedGames = [...listGames].sort((a, b) => b.rate - a.rate);
            break;
        default:
            sortedGames = listGames;
            break;
    }
    section.innerHTML = '';
    sortedGames.forEach(game => createNewGamesCard(game));
    search();
}

/**
 * Ищет игры по названию через API, 
 * скрывает все карточки игр и загружает результаты поиска.
 */
function searchByName(){
    const textToSearch = searchField.value.toLowerCase();
    const searchEndpoint = `/api/v1/games/?search=${textToSearch}`;
    const allGameCards = document.querySelectorAll('.game-card');
    allGameCards.forEach(card => card.style.display = 'none');   
    loadGames(searchEndpoint);
}


searchField.addEventListener('input', search);
sortSelect.addEventListener('change', sort);
btnSearch.addEventListener('click', searchByName);

export { sort, search };