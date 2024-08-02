"use strict";

import { addBaseUrl } from "../const.js";
import { sort, search } from './searchSort.js';

const btnLoadMore = document.querySelector('#load-more');
const section = document.querySelector('section.game-list');
const page_size = 5;
var page = 1;
var countPages;
var listGames = [];


function getListGames(){
    return listGames;
}

/**
 * Делает GET-запрос к серверу по API, принимает в качестве параметра endpoint.
 * Если он не был передан, то делается запрос к главному API сервера и получает
 * промис со списком объектов игр.
 * 
 * @param {string} [endpoint] - Конечная точка API для запроса.
 *  Если не указана, используется основная конечная точка.
 * @returns {Promise<object[]>} - Промис, который разрешается массивом объектов игр.
 */
function createNewGamesCard(game) {
    const container = document.createElement('div');
    container.classList.add('game-card')
    container.id = game.id;
    container.innerHTML = `
        <h2>${game.name}</h2>
        <p class="description">${game.description}</p>
        <p class="price">Цена = ${game.price} р.</p>
        <p class="rate">${game.rate}/10</p>
        <p class="game-type">Жанр ${game.game_type}</p>`;
    section.appendChild(container);
}

/**
 * Загружает игры с сервера, обрабатывает уникальные игры и обновляет список отображаемых игр.
 * Если передан endpoint, загружает игры с указанного endpoint. 
 * Если endpoint не указан, загружает игры с главного API сервера.
 *
 * @param {string} [endpoint=false] - Конечная точка API для запроса.
 *  Если не указана, используется основная конечная точка.
 * @returns {Promise<object[]>} - Промис, который разрешается массивом объектов игр.
 */
function getJsonGames(endpoint=false) {
    let isMainURL = !endpoint;
    if (isMainURL) {
        endpoint = `api/v1/games/?page=${page}&page_size=${page_size}`;
    }
    const url = addBaseUrl(endpoint);
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((games) => {
            if (isMainURL) {
                countPages = Math.ceil(games.count / page_size);
            }
            return games.results;
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * Загружает игры с сервера, обрабатывает уникальные игры и обновляет
 *  список отображаемых игр.
 * Если передан endpoint, загружает игры с указанного endpoint. 
 * Если endpoint не указан, загружает игры с главного API сервера.
 *
 * @param {string} [endpoint=false] - Конечная точка API для запроса.
 *  Если не указана, используется основная конечная точка.
 * @returns {Promise<object[]>} - Промис, который разрешается 
 * массивом объектов игр.
 */
function loadGames(endpoint=false) {
    return getJsonGames(endpoint)
        .then(games => {
            const uniqueGames = games.filter(game => 
                !listGames.some(existingGame => existingGame.id === game.id)
            );
            listGames = [...listGames, ...uniqueGames];

            section.innerHTML = '';
            listGames.forEach(element => {
                createNewGamesCard(element)
            });
            search();

            return listGames;
        })
        .catch(error => console.log(error))
}


function loadMoreHandler(){
    if (page <= countPages) {
        loadGames()
            .then(() => {
                sort();
            })
            .catch(error => console.log(error));
            page++;
    } else {
        const main = document.querySelector('main');
        const endMessage = document.createElement('p');
        endMessage.textContent = 'Вы долистали до конца';
        main.appendChild(endMessage);
        setTimeout(() => {
            main.removeChild(endMessage);
        }, 3000)
    }
}


btnLoadMore.addEventListener('click', loadMoreHandler);
loadGames();
page++;

export { getListGames, createNewGamesCard, loadGames, section };