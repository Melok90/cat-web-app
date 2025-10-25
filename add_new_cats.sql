-- SQL скрипт для добавления 5 новых пород кошек в базу данных Supabase
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Добавляем новые породы кошек в таблицу cats
INSERT INTO cats (name, breed, description, image_url) VALUES
('Рэгдолл', 'ragdoll', 'Мягкая и расслабленная порода с голубыми глазами. Очень спокойные, ласковые, расслабленные, хорошо ладят с детьми.', 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/ragdoll.png'),
('Шотландская вислоухая', 'scottish_fold', 'Очаровательная порода с загнутыми ушками и круглыми глазами. Дружелюбные, игривые, умные, хорошо адаптируются к новым условиям.', 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/scottish_fold.png'),
('Норвежская лесная', 'norwegian_forest', 'Крупная и выносливая порода с густой шерстью и пушистым хвостом. Независимые, умные, выносливые, хорошо ладят с другими животными.', 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/norwegian_forest.png'),
('Девон-рекс', 'devon_rex', 'Кудрявая порода с большими ушами и игривым характером. Очень активные, игривые, любознательные, нуждаются в внимании.', 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/devon_rex.png'),
('Манчкин', 'munchkin', 'Порода с короткими лапками и длинным телом - кошачья такса. Игривые, любознательные, дружелюбные, хорошо ладят с детьми.', 'https://zrntpatdzumhybclhrhp.supabase.co/storage/v1/object/public/cats/munchkin.png');

-- Проверяем, что данные добавлены
SELECT * FROM cats WHERE breed IN ('ragdoll', 'scottish_fold', 'norwegian_forest', 'devon_rex', 'munchkin');
