-- Receta 1: Puchero Norteño
INSERT INTO `receta-system-db`.receta
(nombre, preparacionDeTiempo, createdAt, updatedAt, userId, descripcion, imagen, ingredientes, preparacion)
VALUES
('Puchero Norteño', 75, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), userId, 'Caldo abundante con carne, maíz, vegetales y legumbres.', 'puchero_norteno.jpg', 'Carne de res, maíz, batata, zapallo, repollo, porotos, chorizo, hojas de laurel, sal, pimienta.', '1. Cocinar la carne con chorizo. 2. Agregar maíz, batata, zapallo y porotos. 3. Condimentar con laurel, sal y pimienta.');
-- Receta 2: Tamalitos de Quinoa
INSERT INTO `receta-system-db`.receta
(nombre, preparacionDeTiempo, createdAt, updatedAt, userId, descripcion, imagen, ingredientes, preparacion)
VALUES
('Tamalitos de Quinoa', 60, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), userId, 'Pequeños tamales de quinoa rellenos de vegetales.', 'tamalitos_quinoa.jpg', 'Quinoa, zanahoria, espinacas, cebolla, ajo, caldo de verduras, hojas de maíz, sal, pimienta.', '1. Cocinar la quinoa y saltear las verduras. 2. Preparar masa con quinoa y caldo de verduras. 3. Rellenar las hojas de maíz y cocinar al vapor.');
-- Receta 3: Sopa de Locro
INSERT INTO `receta-system-db`.receta
(nombre, preparacionDeTiempo, createdAt, updatedAt, userId, descripcion, imagen, ingredientes, preparacion)
VALUES
('Sopa de Locro', 45, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), userId, 'Sopa espesa con maíz, zapallo, carne y condimentos.', 'sopa_locro.jpg', 'Maíz, zapallo, carne de cerdo, chorizo, cebolla, papa, pimiento, ajo, comino, laurel, sal, pimienta.', '1. Cocinar maíz y carne. 2. Freír cebolla, ajo, pimiento y chorizo. 3. Agregar zapallo, papa y condimentos. 4. Combinar todo en una olla hasta obtener una sopa espesa.');
-- Receta 4: Humita en Olla
INSERT INTO `receta-system-db`.receta
(nombre, preparacionDeTiempo, createdAt, updatedAt, userId, descripcion, imagen, ingredientes, preparacion)
VALUES
('Humita en Olla', 50, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), userId, 'Humita tierna envuelta en hojas de chala.', 'humita_en_olla.jpg', 'Choclo, cebolla, ají, aceite, sal, pimienta, hojas de chala.', '1. Mezclar choclo con cebolla, ají, aceite, sal y pimienta. 2. Envolver la mezcla en hojas de chala. 3. Cocinar en una olla hasta que las humitas estén listas.');
-- Receta 5: Pastel de Papas Jujeño
INSERT INTO `receta-system-db`.receta
(nombre, preparacionDeTiempo, createdAt, updatedAt, userId, descripcion, imagen, ingredientes, preparacion)
VALUES
('Pastel de Papas Jujeño', 55, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), userId, 'Capas de papas y carne con sabores auténticos de Jujuy.', 'pastel_papas_jujeno.jpg', 'Papas, carne molida, cebolla, pimiento, tomate, huevo, aceitunas, comino, paprika, sal, pimienta.', '1. Cocinar papas y hacer un puré. 2. Sofreír carne con cebolla, pimiento, tomate y condimentos. 3. Armar capas de puré y carne en una fuente y hornear.');