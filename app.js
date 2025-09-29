// Данные приложения
const appData = {
  "breeds": {
    "longhaired": [
      {
        "name": "Мейн-кун",
        "origin": "Происходит из Северной Америки (штат Мэн). Одна из крупнейших пород домашних кошек.",
        "character": "Дружелюбные, спокойные, уравновешенные. Часто называются 'собаками в кошачьем теле'. Очень привязаны к семье, но сохраняют независимость. Отличные компаньоны, умные и легко поддаются дрессировке.",
        "care": "Регулярное вычесывание 1-2 раза в неделю. Купание раз в 3 недели. Стрижка когтей еженедельно. Любят воду. Нуждаются в просторе и активных играх.",
        "suitable": "Идеально для семей с детьми, владельцев собак, людей ведущих активный образ жизни. Хорошо подходят для больших квартир и частных домов.",
        "nurseries": [
          {
            "name": "Илим Прайд",
            "location": "Иркутская область",
            "contact": "+79642607629",
            "website": "https://илимпрайд.рф"
          },
          {
            "name": "Fridmancats",
            "location": "Москва",
            "contact": "info@fridmancats.ru",
            "website": "https://fridmancats.ru"
          },
          {
            "name": "Raksi Line",
            "location": "Санкт-Петербург",
            "contact": "raksi@homeinraksi.ru",
            "website": "https://homeinraksi.ru"
          },
          {
            "name": "Мейн-Куны Москвы",
            "location": "Москва",
            "website": "https://mainecoons.moscow"
          }
        ],
        "instagram": [
          "@ofgoldenhappiness_mainecoon",
          "@sphynx.coon.lux",
          "@fluffytailscattery",
          "@creato_in_felicita"
        ]
      },
      {
        "name": "Сибирская кошка",
        "origin": "Исконно русская порода из Сибири. Сформировалась естественным путем в суровом климате.",
        "character": "Спокойные, независимые, преданные. Отлично ладят с детьми и другими животными. Обладают чувством собственного достоинства, тактичны. Хорошие охотники.",
        "care": "Густая шерсть требует регулярного вычесывания. К зиме 'обрастают' плотной шубой. Не боятся воды. Любят прогулки на свежем воздухе.",
        "suitable": "Для семей с детьми, владельцев частных домов, людей ценящих спокойных питомцев. Подходят людям с аллергией (гипоаллергенны).",
        "nurseries": [
          {
            "name": "VIVA SIBERIA",
            "location": "По России",
            "website": "https://www.vivasib.ru"
          },
          {
            "name": "Царь-Кошка",
            "location": "Ростов-на-Дону, Санкт-Петербург",
            "contact": "+7-928-615-58-70, +7-999-218-94-93",
            "website": "https://tzar-koshka.ru"
          },
          {
            "name": "С берегов Невы",
            "location": "Санкт-Петербург",
            "website": "https://sberegovnevy.ru"
          },
          {
            "name": "Сибирское Чудо",
            "location": "Санкт-Петербург",
            "website": "https://www.sib-chudo.ru"
          }
        ],
        "instagram": [
          "@tigruscat"
        ]
      }
    ],
    "shorthaired": [
      {
        "name": "Британская короткошерстная",
        "origin": "Выведена в Великобритании в 19 веке. Известна своей плюшевой шерстью и спокойным характером.",
        "character": "Независимые, спокойные, дипломатичные. Не любят излишнего внимания. Терпеливы с детьми. Предпочитают личное пространство. 'Кошки, которые гуляют сами по себе'.",
        "care": "Вычесывание 1 раз в неделю. Линяют 2 раза в год. Склонны к набору лишнего веса. Нуждаются в качественном питании.",
        "suitable": "Для занятых людей, пожилых, семей с воспитанными детьми. Идеальны для квартирного содержания. Подходят тем, кто ценит спокойствие.",
        "nurseries": [
          {
            "name": "Diamond Breese",
            "location": "Воронеж",
            "contact": "Лариса Дубровина",
            "website": "https://diamond-breese.ru"
          },
          {
            "name": "Wonder-Plush",
            "location": "Москва",
            "contact": "Анна Кокарева",
            "website": "https://www.superkot.ru"
          },
          {
            "name": "Ellina",
            "location": "Ярославль",
            "contact": "Елена Репина",
            "website": "https://ellinascats.ru"
          },
          {
            "name": "Bri Tany*Ru",
            "location": "Россия",
            "website": "http://bri-tany.ru"
          }
        ],
        "instagram": [
          "@arletta_british",
          "@gala_cat_ru"
        ]
      },
      {
        "name": "Русская голубая",
        "origin": "Древняя русская порода, известная со времен Петра I. Ценилась моряками за охотничьи качества.",
        "character": "Спокойные, чувствительные, умные. Любят рутину, осторожны с незнакомцами. Отличные охотники. Привязываются к семье, но не навязчивы.",
        "care": "Короткая шерсть требует минимального ухода - вычесывание раз в неделю. Стрижка когтей ежемесячно. Любят интеллектуальные игры.",
        "suitable": "Для спокойных семей, пожилых людей, тех кто ценит тактичных питомцев. Хорошо подходят для квартир. Не подходят для частых переездов.",
        "nurseries": [
          {
            "name": "Актуальный питомник не найден",
            "location": "-",
            "contact": "-",
            "website": "-"
          }
        ],
        "instagram": []
      }
    ],
    "hairless": [
      {
        "name": "Сфинкс (Канадский)",
        "origin": "Появились в результате естественной мутации в 1966 году в Канаде. Первого котенка назвали Черносливом.",
        "character": "Очень ласковые, общительные, привязанные к человеку. Любят быть в центре внимания. Умные, легко поддаются дрессировке. Энергичны и игривы.",
        "care": "Особый уход за кожей - регулярное мытье, защита от солнца и холода. Нуждаются в одежде в холодное время. Повышенный аппетит из-за теплообмена.",
        "suitable": "Для активных людей, семей с детьми, тех кто готов уделять много внимания. НЕ подходят людям с аллергией (не гипоаллергенны). Идеальны для тех, кто любит тактильный контакт.",
        "nurseries": [
          {
            "name": "Baby Anabel Sphinx",
            "location": "По России",
            "contact": "Мария (зоопсихолог)",
            "instagram": "@baby_anabel__sphinx"
          },
          {
            "name": "Canada Village",
            "location": "Россия",
            "instagram": "@canadavillage_cattery"
          }
        ],
        "instagram": [
          "@baby_anabel__sphinx",
          "@canadavillage_cattery", 
          "@me_shanti_sfinx"
        ]
      }
    ],
    "exotic": [
      {
        "name": "Бенгальская",
        "origin": "Межродовой гибрид домашней кошки и леопардовой кошки. Выведена в США для получения 'домашнего леопарда'.",
        "character": "Активные, умные, общительные. Любят воду и высоту. Очень разговорчивые, издают различные звуки. Плохо переносят одиночество. Сохранили охотничьи инстинкты.",
        "care": "Нуждаются в активных играх и физических нагрузках. Короткая шерсть с 'глиттером' легка в уходе. Любят водные процедуры.",
        "suitable": "Для активных людей и семей, готовых уделять много времени. Подходят владельцам собак. НЕ подходят для спокойного образа жизни. Хорошо с детьми школьного возраста.",
        "nurseries": [
          {
            "name": "Uralvento",
            "location": "Москва",
            "contact": "Елена",
            "website": "https://bengalur.ru"
          },
          {
            "name": "Manclan",
            "location": "Санкт-Петербург",
            "vk": "vk.com/manclancat"
          },
          {
            "name": "Valentine's Dream", 
            "location": "Санкт-Петербург",
            "contact": "По справочнику Yell.ru"
          }
        ],
        "instagram": [
          "@golotnik_bengal"
        ]
      },
      {
        "name": "Абиссинская",
        "origin": "Древняя порода из Эфиопии (бывшая Абиссиния). Одна из самых старых известных пород кошек.",
        "character": "Очень активные, любознательные, умные. Не любят одиночество, всегда участвуют в делах хозяина. Любят высоту. Легко обучаются. Пугливы к громким звукам.",
        "care": "Короткая тикированная шерсть не требует сложного ухода. Нуждаются в активных играх и внимании. Любят лазать по высоким местам.",
        "suitable": "Для активных людей и семей, готовых постоянно взаимодействовать с питомцем. НЕ подходят очень занятым людям. Отлично с детьми.",
        "nurseries": [
          {
            "name": "Novisenya",
            "location": "Санкт-Петербург",
            "website": "https://www.novisenya.ru"
          },
          {
            "name": "My Golden Aby",
            "location": "Россия",
            "contact": "8(926)778-55-29",
            "email": "mygoldenaby@gmail.com",
            "website": "https://mygoldenaby.ru"
          },
          {
            "name": "Оберег Велеса",
            "location": "Москва", 
            "website": "https://абиссинская-кошка.москвасайт.рф"
          },
          {
            "name": "ADAMAS*RU",
            "location": "Московская область",
            "contact": "+7-985-437-79-64",
            "email": "adamas-aby@yandex.ru",
            "website": "https://www.abyssinians.ru"
          }
        ],
        "instagram": []
      },
      {
        "name": "Тойгер",
        "origin": "Молодая порода, выведенная в США в конце 80-х для создания 'игрушечного тигра'. НЕ имеет родства с настоящими тиграми.",
        "character": "Спокойные, дружелюбные, неагрессивные. Общительные, но не навязчивые. Очень любопытные. Легко адаптируются. Одинаково относятся ко всем членам семьи.",
        "care": "Короткая шерсть не требует сложного ухода. Нужно следить за безопасностью из-за чрезмерного любопытства. Хорошо переносят поездки.",
        "suitable": "Для семей с детьми, пожилых людей, начинающих владельцев. Подходят для квартир. Идеальны как компаньоны. Хорошо с другими животными.",
        "nurseries": [
          {
            "name": "Актуальный питомник не найден",
            "location": "-",
            "contact": "-", 
            "website": "-"
          }
        ],
        "instagram": []
      }
    ]
  },
  "categories": [
    {
      "id": "longhaired",
      "name": "Длинношерстные",
      "description": "Породы с длинной, густой шерстью, требующие особого ухода",
      "icon": "🦁"
    },
    {
      "id": "shorthaired", 
      "name": "Короткошерстные",
      "description": "Породы с короткой шерстью, легкие в уходе",
      "icon": "🐱"
    },
    {
      "id": "hairless",
      "name": "Бесшерстные", 
      "description": "Уникальные породы без шерсти или с минимальным покровом",
      "icon": "🐾"
    },
    {
      "id": "exotic",
      "name": "Экзотические и редкие",
      "description": "Необычные и редкие породы с особыми характеристиками",
      "icon": "🐅"
    }
  ]
};

// Состояние приложения
let currentState = {
  view: 'categories', // categories, breeds, breedDetails, searchResults
  currentCategory: null,
  currentBreed: null,
  searchQuery: '',
  selectedFilter: ''
};

// DOM элементы
const elements = {
  searchInput: document.getElementById('searchInput'),
  suitabilityFilter: document.getElementById('suitabilityFilter'),
  categoriesView: document.getElementById('categoriesView'),
  breedsView: document.getElementById('breedsView'),
  breedDetailsView: document.getElementById('breedDetailsView'),
  searchResultsView: document.getElementById('searchResultsView'),
  noResultsView: document.getElementById('noResultsView'),
  categoriesGrid: document.getElementById('categoriesGrid'),
  breedsGrid: document.getElementById('breedsGrid'),
  breedDetails: document.getElementById('breedDetails'),
  searchResults: document.getElementById('searchResults'),
  categoryTitle: document.getElementById('categoryTitle'),
  searchTitle: document.getElementById('searchTitle'),
  backToCategories: document.getElementById('backToCategories'),
  backToBreeds: document.getElementById('backToBreeds'),
  backToCategoriesFromDetails: document.getElementById('backToCategoriesFromDetails'),
  clearSearch: document.getElementById('clearSearch')
};

// Инициализация приложения
function init() {
  renderCategories();
  setupEventListeners();
  showView('categories');
}

// Настройка слушателей событий
function setupEventListeners() {
  // Поиск
  elements.searchInput.addEventListener('input', handleSearch);
  
  // Фильтр
  elements.suitabilityFilter.addEventListener('change', handleFilter);
  
  // Навигация
  elements.backToCategories.addEventListener('click', () => showCategories());
  elements.backToBreeds.addEventListener('click', () => showBreeds(currentState.currentCategory));
  elements.backToCategoriesFromDetails.addEventListener('click', () => showCategories());
  elements.clearSearch.addEventListener('click', clearSearch);
}

// Отображение представлений
function showView(viewName) {
  // Скрыть все представления
  Object.values(elements).forEach(el => {
    if (el && el.classList && el.classList.contains('hidden')) {
      // Элемент уже скрыт
    } else if (el && el.id && el.id.includes('View')) {
      el.classList.add('hidden');
    }
  });
  
  // Показать нужное представление
  const viewElement = elements[viewName + 'View'];
  if (viewElement) {
    viewElement.classList.remove('hidden');
  }
  
  currentState.view = viewName;
}

// Отрисовка категорий
function renderCategories() {
  elements.categoriesGrid.innerHTML = '';
  
  appData.categories.forEach(category => {
    const categoryCard = createCategoryCard(category);
    elements.categoriesGrid.appendChild(categoryCard);
  });
}

// Создание карточки категории
function createCategoryCard(category) {
  const card = document.createElement('div');
  card.className = 'category-card';
  card.onclick = () => showBreeds(category.id);
  
  card.innerHTML = `
    <span class="category-card__icon">${category.icon}</span>
    <h3 class="category-card__name">${category.name}</h3>
    <p class="category-card__description">${category.description}</p>
  `;
  
  return card;
}

// Показать категории
function showCategories() {
  currentState.currentCategory = null;
  currentState.currentBreed = null;
  clearSearchAndFilters();
  showView('categories');
}

// Показать породы в категории
function showBreeds(categoryId) {
  currentState.currentCategory = categoryId;
  currentState.currentBreed = null;
  
  const category = appData.categories.find(cat => cat.id === categoryId);
  const breeds = appData.breeds[categoryId] || [];
  
  elements.categoryTitle.textContent = category.name;
  renderBreedsList(breeds, elements.breedsGrid);
  showView('breeds');
}

// Показать детали породы
function showBreedDetails(breed, categoryId) {
  currentState.currentBreed = breed;
  currentState.currentCategory = categoryId;
  
  renderBreedDetails(breed);
  showView('breedDetails');
}

// Отрисовка списка пород
function renderBreedsList(breeds, container) {
  container.innerHTML = '';
  
  if (breeds.length === 0) {
    showView('noResults');
    return;
  }
  
  breeds.forEach(breed => {
    const breedCard = createBreedCard(breed);
    container.appendChild(breedCard);
  });
}

// Создание карточки породы
function createBreedCard(breed) {
  const card = document.createElement('div');
  card.className = 'breed-card';
  
  // Найти категорию для этой породы
  let categoryId = null;
  for (const [catId, catBreeds] of Object.entries(appData.breeds)) {
    if (catBreeds.some(b => b.name === breed.name)) {
      categoryId = catId;
      break;
    }
  }
  
  card.onclick = () => showBreedDetails(breed, categoryId);
  
  card.innerHTML = `
    <div class="breed-card__header">
      <h3 class="breed-card__name">${breed.name}</h3>
    </div>
    <div class="breed-card__body">
      <p class="breed-card__origin">${breed.origin}</p>
      <p class="breed-card__character">${truncateText(breed.character, 120)}</p>
      <div class="breed-card__suitable">
        <strong>Подходит:</strong> ${truncateText(breed.suitable, 80)}
      </div>
    </div>
  `;
  
  return card;
}

// Отрисовка деталей породы
function renderBreedDetails(breed) {
  elements.breedDetails.innerHTML = `
    <div class="breed-header">
      <h1 class="breed-name">${breed.name}</h1>
      <p class="breed-origin">${breed.origin}</p>
    </div>
    
    <div class="breed-info-grid">
      <div class="info-card">
        <h3 class="info-card__title">
          <span>🐱</span> Характер
        </h3>
        <div class="info-card__content">
          <p>${breed.character}</p>
        </div>
      </div>
      
      <div class="info-card">
        <h3 class="info-card__title">
          <span>✂️</span> Особенности ухода
        </h3>
        <div class="info-card__content">
          <p>${breed.care}</p>
        </div>
      </div>
      
      <div class="info-card">
        <h3 class="info-card__title">
          <span>👥</span> Кому подходит
        </h3>
        <div class="info-card__content">
          <p>${breed.suitable}</p>
        </div>
      </div>
      
      <div class="info-card">
        <h3 class="info-card__title">
          <span>🏠</span> Питомники
        </h3>
        <div class="info-card__content">
          ${renderNurseries(breed.nurseries)}
        </div>
      </div>
      
      ${breed.instagram && breed.instagram.length > 0 ? `
      <div class="info-card">
        <h3 class="info-card__title">
          <span>📱</span> Instagram питомников
        </h3>
        <div class="info-card__content">
          ${renderInstagram(breed.instagram)}
        </div>
      </div>
      ` : ''}
    </div>
  `;
}

// Отрисовка питомников
function renderNurseries(nurseries) {
  if (!nurseries || nurseries.length === 0) {
    return '<p>Информация о питомниках не найдена</p>';
  }
  
  return `
    <ul class="nurseries-list">
      ${nurseries.map(nursery => `
        <li class="nursery-item">
          <div class="nursery-name">${nursery.name}</div>
          <div class="nursery-location">📍 ${nursery.location}</div>
          <div class="nursery-contact">
            ${nursery.contact ? `📞 ${nursery.contact}` : ''}
            ${nursery.website && nursery.website !== '-' ? `<a href="${nursery.website}" target="_blank">🌐 Сайт</a>` : ''}
            ${nursery.email ? `<a href="mailto:${nursery.email}">📧 Email</a>` : ''}
            ${nursery.vk ? `<a href="https://${nursery.vk}" target="_blank">📘 VK</a>` : ''}
            ${nursery.instagram ? `<a href="https://instagram.com/${nursery.instagram}" target="_blank">📱 Instagram</a>` : ''}
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}

// Отрисовка Instagram аккаунтов
function renderInstagram(instagramAccounts) {
  if (!instagramAccounts || instagramAccounts.length === 0) {
    return '<p>Instagram аккаунты не найдены</p>';
  }
  
  return `
    <div class="instagram-list">
      ${instagramAccounts.map(account => `
        <a href="https://instagram.com/${account.replace('@', '')}" target="_blank" class="instagram-link">
          ${account}
        </a>
      `).join('')}
    </div>
  `;
}

// Поиск
function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  currentState.searchQuery = query;
  
  if (query === '') {
    if (currentState.selectedFilter === '') {
      showCategories();
    } else {
      performFilter();
    }
    return;
  }
  
  performSearch();
}

function performSearch() {
  const query = currentState.searchQuery.toLowerCase();
  const results = [];
  
  // Поиск по всем породам
  Object.values(appData.breeds).forEach(categoryBreeds => {
    categoryBreeds.forEach(breed => {
      if (breed.name.toLowerCase().includes(query)) {
        results.push(breed);
      }
    });
  });
  
  // Применение фильтра к результатам поиска
  let filteredResults = results;
  if (currentState.selectedFilter) {
    filteredResults = filterBreedsBySuitability(results, currentState.selectedFilter);
  }
  
  elements.searchTitle.textContent = `Результаты поиска: "${currentState.searchQuery}"`;
  renderBreedsList(filteredResults, elements.searchResults);
  showView('searchResults');
}

// Фильтрация
function handleFilter(event) {
  const filter = event.target.value;
  currentState.selectedFilter = filter;
  
  if (currentState.searchQuery) {
    performSearch();
  } else if (filter === '') {
    showCategories();
  } else {
    performFilter();
  }
}

function performFilter() {
  const allBreeds = [];
  
  // Собрать все породы
  Object.values(appData.breeds).forEach(categoryBreeds => {
    allBreeds.push(...categoryBreeds);
  });
  
  const filteredBreeds = filterBreedsBySuitability(allBreeds, currentState.selectedFilter);
  
  elements.searchTitle.textContent = `Породы, подходящие: ${elements.suitabilityFilter.options[elements.suitabilityFilter.selectedIndex].text.toLowerCase()}`;
  renderBreedsList(filteredBreeds, elements.searchResults);
  showView('searchResults');
}

function filterBreedsBySuitability(breeds, filter) {
  return breeds.filter(breed => 
    breed.suitable.toLowerCase().includes(filter.toLowerCase())
  );
}

// Очистить поиск и фильтры
function clearSearch() {
  currentState.searchQuery = '';
  currentState.selectedFilter = '';
  elements.searchInput.value = '';
  elements.suitabilityFilter.value = '';
  showCategories();
}

function clearSearchAndFilters() {
  elements.searchInput.value = '';
  elements.suitabilityFilter.value = '';
  currentState.searchQuery = '';
  currentState.selectedFilter = '';
}

// Утилиты
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);