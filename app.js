// Supabase integration for cat photos and data
// Подключение к Supabase через CDN
const { createClient } = supabase;

// Инициализация Supabase клиента
const supabaseUrl = 'https://zrntpatdzumhybclhrhp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpybnRwYXRkenVtaHliY2xocmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTcyNjQsImV4cCI6MjA3NDg5MzI2NH0.rjsuoG_f1nuLAD8ahZF7pwvkYfMnTxxXybS4GYwoTqw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Функция для загрузки кошек из базы данных
async function loadCatsFromDatabase() {
  try {
    console.log('Загружаем кошек из Supabase...');
    
    const { data: cats, error } = await supabaseClient
      .from('cats')
      .select('name, breed, description, image_url');
    
    if (error) {
      console.error('Ошибка при загрузке кошек:', error);
      showConnectionError(error);
      return;
    }
    
    console.log('Данные из Supabase:', cats);
    
    if (cats && cats.length > 0) {
      console.log(`Загружено ${cats.length} кошек из базы данных`);
      
      // Находим главное изображение (hero)
      const heroCat = cats.find(cat => cat.breed === 'hero');
      if (heroCat) {
        displayHeroImage(heroCat);
      }
      
      // Загружаем изображения для категорий
      loadCategoryImages(cats);
      
      // Отображаем остальные кошки как карточки
      const otherCats = cats.filter(cat => cat.breed !== 'hero' && !isCategoryBreed(cat.breed));
      if (otherCats.length > 0) {
        displayCatsFromDatabase(otherCats);
      } else {
        showNoCatsMessage();
      }
    } else {
      console.log('Кошки не найдены в базе данных');
      showNoCatsMessage();
    }
  } catch (error) {
    console.error('Ошибка при подключении к Supabase:', error);
    showConnectionError(error);
  }
}

// Функция для отображения главного изображения
function displayHeroImage(heroCat) {
  const heroImageElement = document.getElementById('hero-image');
  
  if (!heroImageElement) {
    console.error('Элемент с id="hero-image" не найден');
    return;
  }
  
  console.log('Отображаем главное изображение:', heroCat);
  
  if (heroCat && heroCat.image_url) {
    heroImageElement.src = heroCat.image_url;
    heroImageElement.alt = heroCat.name || 'Разнообразные породы кошек';
    
    // Обработка ошибки загрузки изображения
    heroImageElement.onerror = function() {
      console.warn('Не удалось загрузить главное изображение:', heroCat.image_url);
      // Пробуем загрузить изображение по умолчанию
      this.src = 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hero.png';
    };
    
    // Обработка успешной загрузки
    heroImageElement.onload = function() {
      console.log('Главное изображение успешно загружено:', heroCat.name);
      this.style.display = 'block';
    };
    
    console.log('Устанавливаем главное изображение:', heroCat.image_url);
  } else {
    console.warn('У главной кошки нет изображения, используем изображение по умолчанию');
    // Устанавливаем изображение по умолчанию
    heroImageElement.src = 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hero.png';
    heroImageElement.alt = 'Разнообразные породы кошек';
    heroImageElement.style.display = 'block';
  }
}

// Функция для проверки, является ли порода категорией
function isCategoryBreed(breed) {
  const categoryBreeds = ['longhair', 'shorthair', 'hairless', 'exotic'];
  return categoryBreeds.includes(breed);
}

// Функция для загрузки изображений категорий
function loadCategoryImages(cats) {
  console.log('Загружаем изображения категорий из данных:', cats);
  
  const categoryImages = {};
  
  // Сопоставление категорий с породами из основного кода
  const categoryBreedMapping = {
    longhair: ['maine_coon', 'siberian', 'persian'],
    shorthair: ['british', 'russian_blue', 'abyssinian'],
    hairless: ['sphynx'],
    exotic: ['bengal', 'toyger']
  };
  
  // Специальные изображения для конкретных пород
  const breedSpecificImages = {
    persian: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/pers_.png'
  };
  
  // Собираем изображения для каждой категории
  Object.keys(categoryBreedMapping).forEach(category => {
    const breeds = categoryBreedMapping[category];
    
    // Ищем первую породу из категории в данных Supabase
    for (const breed of breeds) {
      // Сначала проверяем специальные изображения
      if (breedSpecificImages[breed]) {
        categoryImages[category] = breedSpecificImages[breed];
        console.log(`Используем специальное изображение для категории ${category} (порода ${breed}): ${breedSpecificImages[breed]}`);
        break;
      }
      
      // Затем ищем в данных Supabase
      const cat = cats.find(c => c.breed === breed);
      if (cat && cat.image_url) {
        categoryImages[category] = cat.image_url;
        console.log(`Найдено изображение для категории ${category} (порода ${breed}): ${cat.image_url}`);
        break; // Берем первое найденное изображение
      }
    }
    
    // Если для категории не найдено изображение, используем fallback
    if (!categoryImages[category]) {
      // Специальные fallback изображения для каждой категории
      const fallbackImages = {
        longhair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/long-haired.png',
        shorthair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/short-haired.png',
        hairless: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hairless.jpg',
        exotic: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/exotic.png'
      };
      
      categoryImages[category] = fallbackImages[category] || 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hero.png';
      console.log(`Используем fallback изображение для категории ${category}: ${categoryImages[category]}`);
    }
  });
  
  console.log('Итоговые изображения категорий:', categoryImages);
  
  // Обновляем глобальную переменную для использования в основном коде
  window.categoryImages = categoryImages;
  
  // Обновляем карточки категорий, если они уже отображены
  updateCategoryCards();
  
  // Также вызываем функцию обновления из основного кода
  if (typeof updateCategoryCardsWithImages === 'function') {
    console.log('Вызываем updateCategoryCardsWithImages из основного кода');
    updateCategoryCardsWithImages();
  } else {
    console.log('Функция updateCategoryCardsWithImages не найдена');
  }
}

// Функция для обновления карточек категорий
function updateCategoryCards() {
  if (!window.categoryImages) return;
  
  const catsCatsElement = document.getElementById('cats-cats');
  if (!catsCatsElement) return;
  
  const categoryCards = catsCatsElement.querySelectorAll('.card');
  categoryCards.forEach(card => {
    const imageContainer = card.querySelector('.ph');
    if (imageContainer) {
      // Получаем ID категории из обработчика клика
      const onClickAttr = card.getAttribute('onclick') || '';
      let categoryId = '';
      
      if (onClickAttr.includes('longhair')) categoryId = 'longhair';
      else if (onClickAttr.includes('shorthair')) categoryId = 'shorthair';
      else if (onClickAttr.includes('hairless')) categoryId = 'hairless';
      else if (onClickAttr.includes('exotic')) categoryId = 'exotic';
      
      if (categoryId && window.categoryImages[categoryId]) {
        // Очищаем контейнер
        imageContainer.innerHTML = '';
        
        // Создаем изображение
        const img = document.createElement('img');
        img.src = window.categoryImages[categoryId];
        img.alt = card.querySelector('h3').textContent;
        img.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        `;
        
        // Обработка ошибки загрузки изображения
        img.onerror = function() {
          imageContainer.textContent = "Фото";
          imageContainer.setAttribute('aria-hidden', 'true');
        };
        
        imageContainer.appendChild(img);
        imageContainer.removeAttribute('aria-hidden');
      }
    }
  });
}

// Функция для отображения кошек из базы данных
function displayCatsFromDatabase(cats) {
  const catListElement = document.getElementById('cat-list');
  const catSection = catListElement ? catListElement.closest('section') : null;
  
  if (!catListElement) {
    console.error('Элемент с id="cat-list" не найден');
    return;
  }
  
  // Показываем секцию, так как есть данные
  if (catSection) {
    catSection.style.display = 'flex';
  }
  
  // Очищаем контейнер
  catListElement.innerHTML = '';
  
  // Создаем карточки для каждой кошки
  cats.forEach(cat => {
    const catCard = createCatCard(cat);
    catListElement.appendChild(catCard);
  });
}

// Функция для скрытия секции, когда кошки не найдены
function showNoCatsMessage() {
  const catListElement = document.getElementById('cat-list');
  const catSection = catListElement ? catListElement.closest('section') : null;
  
  if (!catListElement) {
    console.error('Элемент с id="cat-list" не найден');
    return;
  }
  
  console.log('Скрываем секцию "Кошки из базы данных" - данных нет');
  
  // Скрываем всю секцию
  if (catSection) {
    catSection.style.display = 'none';
  }
}

// Функция для создания карточки кошки
function createCatCard(cat) {
  const card = document.createElement('article');
  card.className = 'card';
  
  // Изображение кошки
  const imageContainer = document.createElement('div');
  imageContainer.className = 'ph';
  
  const img = document.createElement('img');
  img.src = cat.image_url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="%23999">Фото</text></svg>';
  img.alt = cat.name;
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  `;
  
  // Обработка ошибки загрузки изображения
  img.onerror = function() {
    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="%23999">Фото</text></svg>';
  };
  
  imageContainer.appendChild(img);
  
  // Название кошки
  const nameElement = document.createElement('h3');
  nameElement.textContent = cat.name;
  
  // Описание кошки
  const descriptionElement = document.createElement('div');
  descriptionElement.className = 'muted';
  descriptionElement.textContent = cat.description || 'Описание не указано';
  
  // Кнопка "Выбрать"
  const selectButton = document.createElement('button');
  selectButton.textContent = 'Выбрать';
  selectButton.className = 'btn btn--primary';
  selectButton.style.cssText = `
    margin-top: 8px;
  `;
  
  // Обработчик клика на кнопку "Выбрать"
  selectButton.addEventListener('click', () => {
    selectCat(cat);
  });
  
  // Собираем карточку
  card.appendChild(imageContainer);
  card.appendChild(nameElement);
  card.appendChild(descriptionElement);
  card.appendChild(selectButton);
  
  return card;
}

// Функция для обработки выбора кошки
function selectCat(cat) {
  console.log('Выбрана кошка:', cat);
  
  // Здесь можно добавить логику для обработки выбора кошки
  // Например, показать модальное окно, добавить в корзину и т.д.
  
  // Показываем уведомление
  showNotification(`Вы выбрали: ${cat.name}`);
}

// Функция для показа уведомлений
function showNotification(message) {
  // Создаем элемент уведомления
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Анимация появления
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Автоматическое скрытие через 3 секунды
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Функция для тестирования подключения к Supabase
async function testSupabaseConnection() {
  try {
    console.log('Тестируем подключение к Supabase...');
    
    // Проверяем, что Supabase клиент инициализирован
    if (!supabaseClient) {
      throw new Error('Supabase клиент не инициализирован');
    }
    
    // Пробуем выполнить простой запрос
    const { data, error } = await supabaseClient
      .from('cats')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Ошибка подключения к Supabase:', error);
      showConnectionError(error);
      return false;
    }
    
    console.log('✅ Подключение к Supabase успешно');
    return true;
  } catch (error) {
    console.error('Ошибка при тестировании подключения:', error);
    showConnectionError(error);
    return false;
  }
}

// Функция для скрытия секции при ошибке подключения
function showConnectionError(error) {
  const catListElement = document.getElementById('cat-list');
  const catSection = catListElement ? catListElement.closest('section') : null;
  
  if (!catListElement) {
    console.error('Элемент с id="cat-list" не найден');
    return;
  }
  
  console.log('Скрываем секцию "Кошки из базы данных" - ошибка подключения:', error);
  
  // Скрываем всю секцию при ошибке
  if (catSection) {
    catSection.style.display = 'none';
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, инициализируем Supabase...');
  
  // Сначала тестируем подключение
  testSupabaseConnection().then(isConnected => {
    if (isConnected) {
      // Если подключение успешно, загружаем кошек
      loadCatsFromDatabase();
    } else {
      // Если подключение не удалось, устанавливаем главное изображение принудительно
      console.log('Подключение к Supabase не удалось, устанавливаем главное изображение принудительно');
      setTimeout(() => {
        window.setHeroImage();
      }, 1000);
    }
  });
  
  // Дополнительная проверка через 3 секунды
  setTimeout(() => {
    const heroImageElement = document.getElementById('hero-image');
    if (heroImageElement && !heroImageElement.src) {
      console.log('Главное изображение не загружено, устанавливаем принудительно');
      window.setHeroImage();
    }
    
    // Проверяем изображения категорий
    if (!window.categoryImages) {
      console.log('Изображения категорий не загружены, устанавливаем принудительно');
      window.setCategoryImages();
    }
  }, 3000);
});

// Функция для принудительной установки главного изображения
window.setHeroImage = function() {
  console.log('Принудительно устанавливаем главное изображение...');
  const heroImageElement = document.getElementById('hero-image');
  
  if (heroImageElement) {
    heroImageElement.src = 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hero.png';
    heroImageElement.alt = 'Разнообразные породы кошек';
    heroImageElement.style.display = 'block';
    
    heroImageElement.onload = function() {
      console.log('Главное изображение успешно загружено принудительно');
    };
    
    heroImageElement.onerror = function() {
      console.error('Ошибка загрузки главного изображения');
    };
  } else {
    console.error('Элемент hero-image не найден');
  }
};

// Функция для принудительной установки изображений категорий
window.setCategoryImages = function() {
  console.log('Принудительно устанавливаем изображения категорий...');
  
  // Сначала пытаемся загрузить данные из Supabase
  loadCatsFromDatabase().then(() => {
    console.log('Данные загружены, изображения категорий должны быть установлены');
  }).catch(() => {
    console.log('Ошибка загрузки данных, используем fallback изображения');
    
    const fallbackImages = {
      longhair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/long-haired.png',
      shorthair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/short-haired.png',
      hairless: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hairless.jpg',
      exotic: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/exotic.png'
    };
    
    // Устанавливаем глобальную переменную
    window.categoryImages = fallbackImages;
    
    // Обновляем карточки
    if (typeof updateCategoryCardsWithImages === 'function') {
      updateCategoryCardsWithImages();
    }
    
    console.log('Fallback изображения категорий установлены:', fallbackImages);
  });
};

// Функция для тестирования загрузки изображений категорий
window.testCategoryImages = function() {
  console.log('Тестируем загрузку изображений категорий...');
  console.log('window.categoryImages:', window.categoryImages);
  
  if (window.categoryImages) {
    Object.keys(window.categoryImages).forEach(category => {
      console.log(`${category}: ${window.categoryImages[category]}`);
    });
  }
  
  // Принудительно обновляем карточки
  if (typeof updateCategoryCardsWithImages === 'function') {
    updateCategoryCardsWithImages();
  }
};

// Функция для принудительной установки изображения длинношерстных пород
window.setLonghairImage = function() {
  console.log('Принудительно устанавливаем изображение для длинношерстных пород...');
  
  // Устанавливаем изображение для длинношерстных пород
  if (!window.categoryImages) {
    window.categoryImages = {};
  }
  
  window.categoryImages.longhair = 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/long-haired.png';
  
  // Обновляем карточки
  if (typeof updateCategoryCardsWithImages === 'function') {
    updateCategoryCardsWithImages();
  }
  
  console.log('Изображение для длинношерстных пород установлено:', window.categoryImages.longhair);
};

// Функция для тестирования данных из Supabase
window.testSupabaseData = async function() {
  console.log('Тестируем данные из Supabase...');
  
  try {
    const { data: cats, error } = await supabaseClient
      .from('cats')
      .select('name, breed, description, image_url');
    
    if (error) {
      console.error('Ошибка при загрузке данных:', error);
      return;
    }
    
    console.log('Данные из Supabase:', cats);
    
    // Показываем все породы
    cats.forEach(cat => {
      console.log(`Порода: ${cat.breed}, Имя: ${cat.name}, Изображение: ${cat.image_url}`);
    });
    
    // Показываем сопоставление категорий
    const categoryBreedMapping = {
      longhair: ['maine_coon', 'siberian', 'persian'],
      shorthair: ['british', 'russian_blue', 'abyssinian'],
      hairless: ['sphynx'],
      exotic: ['bengal', 'toyger']
    };
    
    Object.keys(categoryBreedMapping).forEach(category => {
      const breeds = categoryBreedMapping[category];
      console.log(`\nКатегория ${category}:`);
      breeds.forEach(breed => {
        const cat = cats.find(c => c.breed === breed);
        if (cat) {
          console.log(`  ✓ ${breed}: ${cat.name} - ${cat.image_url}`);
        } else {
          console.log(`  ✗ ${breed}: не найдено в базе данных`);
        }
      });
    });
    
  } catch (error) {
    console.error('Ошибка при тестировании:', error);
  }
};

// Экспортируем функции для использования в других частях приложения
window.SupabaseCats = {
  loadCatsFromDatabase,
  displayHeroImage,
  loadCategoryImages,
  updateCategoryCards,
  selectCat,
  showNotification,
  testSupabaseConnection,
  showNoCatsMessage,
  testCategoryImages,
  testSupabaseData,
  setHeroImage,
  setCategoryImages,
  setLonghairImage
};