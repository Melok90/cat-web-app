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
    persian: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/pers.png'
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
        hairless: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hairless.png',
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
  
  // Инициализируем систему бронирования
  initBookingSystem();
  
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
      hairless: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hairless.png',
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

// Функция для принудительного обновления всех изображений из Supabase
window.updateAllImagesFromSupabase = async function() {
  console.log('🔄 Принудительно обновляем все изображения из Supabase...');
  
  try {
    const { data: cats, error } = await supabaseClient
      .from('cats')
      .select('name, breed, description, image_url');
    
    if (error) {
      console.error('Ошибка при загрузке данных:', error);
      return false;
    }
    
    console.log('✅ Данные загружены из Supabase:', cats);
    
    // Обновляем главное изображение
    const heroCat = cats.find(cat => cat.breed === 'hero');
    if (heroCat && heroCat.image_url) {
      console.log('🖼️ Обновляем главное изображение:', heroCat.image_url);
      displayHeroImage(heroCat);
    }
    
    // Обновляем изображения категорий
    console.log('📂 Обновляем изображения категорий...');
    loadCategoryImages(cats);
    
    // Обновляем изображения пород в основном коде
    console.log('🐱 Обновляем изображения пород...');
    updateBreedImagesInMainCode(cats);
    
    // Обновляем карточки кошек из базы данных
    const otherCats = cats.filter(cat => cat.breed !== 'hero' && !isCategoryBreed(cat.breed));
    if (otherCats.length > 0) {
      console.log('📋 Обновляем карточки кошек из базы данных...');
      displayCatsFromDatabase(otherCats);
    }
    
    console.log('✅ Все изображения успешно обновлены из Supabase!');
    showNotification('Изображения обновлены из Supabase!');
    return true;
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении изображений:', error);
    showNotification('Ошибка при обновлении изображений');
    return false;
  }
};

// Функция для принудительного обновления всех изображений на PNG без фона
window.forceUpdateToPNGImages = function() {
  console.log('🔄 Принудительно обновляем все изображения на PNG без фона...');
  
  // Обновляем изображения пород в данных приложения
  if (window.appData && window.appData.breeds) {
    const pngImageUrls = {
      'maine_coon': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/main-kun.png',
      'siberian': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/siberian.png',
      'persian': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/pers.png',
      'british': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/british.png',
      'russian_blue': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/russian_blue.png',
      'abyssinian': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/abissin.png',
      'sphynx': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/sfinks.png',
      'bengal': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/bengal.png',
      'toyger': 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/toiger.png'
    };
    
    window.appData.breeds.forEach(breed => {
      if (pngImageUrls[breed.id]) {
        console.log(`🖼️ Обновляем изображение для ${breed.name}: ${pngImageUrls[breed.id]}`);
        breed.image = pngImageUrls[breed.id];
      }
    });
  }
  
  // Обновляем изображения категорий
  const categoryImages = {
    longhair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/long-haired.png',
    shorthair: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/short-haired.png',
    hairless: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/hairless.png',
    exotic: 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/exotic.png'
  };
  
  window.categoryImages = categoryImages;
  
  // Обновляем карточки категорий
  if (typeof updateCategoryCardsWithImages === 'function') {
    updateCategoryCardsWithImages();
  }
  
  console.log('✅ Все изображения обновлены на PNG без фона!');
  showNotification('Изображения обновлены на PNG без фона!');
};

// Функция для обновления изображений пород в основном коде
function updateBreedImagesInMainCode(cats) {
  console.log('🔄 Обновляем изображения пород в основном коде...');
  
  // Сопоставление пород с их ID в основном коде
  const breedMapping = {
    'maine_coon': 'main-kun.png',
    'siberian': 'siberian.png', 
    'persian': 'pers.png',
    'british': 'british.png',
    'russian_blue': 'russian_blue.png',
    'abyssinian': 'abissin.png',
    'sphynx': 'sfinks.png',
    'bengal': 'bengal.png',
    'toyger': 'toiger.png'
  };
  
  // Обновляем изображения в данных приложения
  if (window.appData && window.appData.breeds) {
    window.appData.breeds.forEach(breed => {
      const cat = cats.find(c => c.breed === breed.id);
      if (cat && cat.image_url) {
        console.log(`🖼️ Обновляем изображение для ${breed.name}: ${cat.image_url}`);
        breed.image = cat.image_url;
      }
    });
  }
  
  console.log('✅ Изображения пород в основном коде обновлены');
}

// ===== ФУНКЦИИ БРОНИРОВАНИЯ КОШЕК =====

// Переменная для хранения текущей выбранной кошки
let currentSelectedCat = null;

// Функция для показа модального окна бронирования
function showBookingModal(cat) {
  currentSelectedCat = cat;
  
  const modal = document.getElementById('booking-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCatInfo = document.getElementById('modal-cat-info');
  const emailInput = document.getElementById('booking-email');
  const emailError = document.getElementById('email-error');
  
  if (!modal || !modalTitle || !modalCatInfo || !emailInput || !emailError) {
    console.error('Элементы модального окна не найдены');
    return;
  }
  
  // Заполняем информацию о кошке
  modalTitle.textContent = `Забронировать ${cat.name}`;
  modalCatInfo.textContent = `Вы хотите забронировать кошку породы ${cat.name}. Введите ваш email для связи.`;
  
  // Очищаем форму
  emailInput.value = '';
  emailError.style.display = 'none';
  emailError.textContent = '';
  
  // Показываем модальное окно
  modal.style.display = 'flex';
  
  // Фокусируемся на поле email
  setTimeout(() => {
    emailInput.focus();
  }, 100);
}

// Функция для скрытия модального окна
function hideBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  currentSelectedCat = null;
}

// Функция валидации email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Функция для проверки, забронирована ли уже кошка этим email
function isCatBookedByEmail(catId, email) {
  const bookings = getBookingsFromStorage();
  return bookings.some(booking => 
    booking.cat_id === catId && booking.email === email
  );
}

// Функция для получения бронирований из localStorage
function getBookingsFromStorage() {
  try {
    const bookings = localStorage.getItem('cat_bookings');
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Ошибка при чтении бронирований из localStorage:', error);
    return [];
  }
}

// Функция для сохранения бронирования в localStorage
function saveBookingToStorage(booking) {
  try {
    const bookings = getBookingsFromStorage();
    bookings.push(booking);
    localStorage.setItem('cat_bookings', JSON.stringify(bookings));
  } catch (error) {
    console.error('Ошибка при сохранении бронирования в localStorage:', error);
  }
}

// Функция для сохранения бронирования в Supabase
async function saveBookingToSupabase(catId, catName, email) {
  try {
    console.log('Сохраняем бронирование в Supabase:', { catId, catName, email });
    
    const { data, error } = await supabaseClient
      .from('bookings')
      .insert([
        {
          cat_id: catId,
          cat_name: catName,
          email: email
        }
      ]);
    
    if (error) {
      console.error('Ошибка при сохранении в Supabase:', error);
      throw error;
    }
    
    console.log('Бронирование успешно сохранено в Supabase:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при сохранении бронирования:', error);
    throw error;
  }
}

// Функция для обработки отправки формы бронирования
async function handleBookingSubmit(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('booking-email');
  const emailError = document.getElementById('email-error');
  const submitButton = document.getElementById('modal-submit');
  
  if (!emailInput || !emailError || !submitButton || !currentSelectedCat) {
    console.error('Не найдены необходимые элементы для бронирования');
    return;
  }
  
  const email = emailInput.value.trim();
  
  // Валидация email
  if (!email) {
    emailError.textContent = 'Пожалуйста, введите email';
    emailError.style.display = 'block';
    return;
  }
  
  if (!validateEmail(email)) {
    emailError.textContent = 'Пожалуйста, введите корректный email';
    emailError.style.display = 'block';
    return;
  }
  
  // Проверяем, не забронирована ли уже эта кошка этим email
  if (isCatBookedByEmail(currentSelectedCat.id, email)) {
    emailError.textContent = 'Вы уже забронировали эту кошку с этим email';
    emailError.style.display = 'block';
    return;
  }
  
  // Скрываем ошибку
  emailError.style.display = 'none';
  
  // Блокируем кнопку отправки
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняем...';
  
  try {
    // Сохраняем в Supabase
    await saveBookingToSupabase(currentSelectedCat.id, currentSelectedCat.name, email);
    
    // Сохраняем email в localStorage для будущих проверок
    localStorage.setItem('last_booking_email', email);
    
    // Сохраняем в localStorage для отслеживания состояния
    const booking = {
      cat_id: currentSelectedCat.id,
      cat_name: currentSelectedCat.name,
      email: email,
      created_at: new Date().toISOString()
    };
    saveBookingToStorage(booking);
    
    // Показываем уведомление об успехе
    alert(`Спасибо! Вы забронировали кошку ${currentSelectedCat.name}`);
    
    // Скрываем модальное окно
    hideBookingModal();
    
    // Обновляем состояние кнопок
    updateBookingButtons();
    
  } catch (error) {
    console.error('Ошибка при бронировании:', error);
    emailError.textContent = 'Произошла ошибка при сохранении. Попробуйте еще раз.';
    emailError.style.display = 'block';
  } finally {
    // Разблокируем кнопку
    submitButton.disabled = false;
    submitButton.textContent = 'Забронировать';
  }
}

// Функция для обновления состояния кнопок бронирования
function updateBookingButtons() {
  const email = getCurrentUserEmail();
  
  if (!email) {
    console.log('Нет email для обновления кнопок');
    return;
  }
  
  console.log('Обновляем кнопки для email:', email);
  
  // Обновляем все кнопки бронирования на странице
  const allBookingButtons = document.querySelectorAll('.booking-btn');
  allBookingButtons.forEach(button => {
    const catId = button.getAttribute('data-cat-id');
    
    if (catId && isCatBookedByEmail(catId, email)) {
      button.textContent = 'Забронировано';
      button.disabled = true;
      button.classList.add('booked');
      console.log(`Кнопка для кошки ${catId} заблокирована`);
    } else {
      button.textContent = 'Выбрать';
      button.disabled = false;
      button.classList.remove('booked');
    }
  });
}

// Функция для получения текущего email пользователя (из localStorage или формы)
function getCurrentUserEmail() {
  // Сначала пытаемся получить из localStorage
  const lastEmail = localStorage.getItem('last_booking_email');
  if (lastEmail) {
    return lastEmail;
  }
  
  // Если нет в localStorage, берем из формы
  const emailInput = document.getElementById('booking-email');
  return emailInput ? emailInput.value.trim() : '';
}

// Функция для добавления кнопки бронирования к карточке кошки
function addBookingButtonToCard(card, cat) {
  // Проверяем, есть ли уже кнопка бронирования
  let bookingBtn = card.querySelector('.booking-btn');
  
  if (!bookingBtn) {
    bookingBtn = document.createElement('button');
    bookingBtn.className = 'booking-btn btn btn--primary';
    bookingBtn.textContent = 'Выбрать';
    bookingBtn.setAttribute('data-cat-id', cat.id);
    bookingBtn.style.cssText = `
      margin-top: 8px;
      width: 100%;
    `;
    
    // Добавляем обработчик клика
    bookingBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Предотвращаем открытие детального просмотра
      showBookingModal(cat);
    });
    
    // Добавляем кнопку к карточке
    card.appendChild(bookingBtn);
  }
  
  // Обновляем состояние кнопки
  const email = getCurrentUserEmail();
  if (email && isCatBookedByEmail(cat.id, email)) {
    bookingBtn.textContent = 'Забронировано';
    bookingBtn.disabled = true;
    bookingBtn.classList.add('booked');
  } else {
    bookingBtn.textContent = 'Выбрать';
    bookingBtn.disabled = false;
    bookingBtn.classList.remove('booked');
  }
}

// Инициализация функций бронирования
function initBookingSystem() {
  console.log('Инициализируем систему бронирования...');
  
  // Обработчики для модального окна
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');
  const bookingForm = document.getElementById('booking-form');
  
  if (modalClose) {
    modalClose.addEventListener('click', hideBookingModal);
  }
  
  if (modalCancel) {
    modalCancel.addEventListener('click', hideBookingModal);
  }
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
  
  // Закрытие модального окна при клике вне его
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideBookingModal();
      }
    });
  }
  
  // Закрытие модального окна по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      hideBookingModal();
    }
  });
  
  console.log('Система бронирования инициализирована');
  
  // Обновляем состояние кнопок при инициализации
  setTimeout(() => {
    updateBookingButtons();
  }, 1000);
  
  // Добавляем глобальную функцию для сброса бронирований (для отладки)
  window.resetBookings = function() {
    localStorage.removeItem('cat_bookings');
    localStorage.removeItem('last_booking_email');
    console.log('Бронирования сброшены');
    updateBookingButtons();
  };
}

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
  setLonghairImage,
  updateAllImagesFromSupabase,
  updateBreedImagesInMainCode,
  forceUpdateToPNGImages,
  // Новые функции бронирования
  showBookingModal,
  hideBookingModal,
  validateEmail,
  saveBookingToSupabase,
  handleBookingSubmit,
  updateBookingButtons,
  addBookingButtonToCard,
  initBookingSystem,
  isCatBookedByEmail,
  getCurrentUserEmail
};