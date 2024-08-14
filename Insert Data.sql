CREATE TABLE `recipes` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `picture` varchar(255),
  `text_recipe` text,
  `user_id` integer
);

CREATE TABLE `ingredients` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `picture` varchar(255)
);

CREATE TABLE `recipe_ingredients` (
  `id` integer PRIMARY KEY,
  `recipe_id` integer,
  `ingredient_id` integer
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `phone_number` varchar(255),
  `address` varchar(255),
  `role` varchar(255)
);

CREATE TABLE `favorite` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `recipe_id` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `body` text COMMENT 'Content of the comment',
  `user_id` integer,
  `recipe_id` integer
);

ALTER TABLE `recipes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `recipe_ingredients` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

ALTER TABLE `recipe_ingredients` ADD FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `favorite` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);


INSERT INTO ingredients (id, title, picture) VALUES
(1, 'Tomato', 'tomato.jpg'),
(2, 'Cucumber', 'cucumber.jpg'),
(3, 'Lettuce', 'lettuce.jpg'),
(4, 'Onion', 'onion.jpg'),
(5, 'Carrot', 'carrot.jpg'),
(6, 'Bell Pepper', 'bell_pepper.jpg'),
(7, 'Spinach', 'spinach.jpg'),
(8, 'Garlic', 'garlic.jpg'),
(9, 'Ginger', 'ginger.jpg'),
(10, 'Broccoli', 'broccoli.jpg');


INSERT INTO users (id, first_name, last_name, email, phone_number, address, role) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 1234567890, '123 Main St, Anytown, USA', 'Admin'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 2345678901, '456 Elm St, Othertown, USA', 'User'),
(3, 'Jim', 'Brown', 'jim.brown@example.com', 3456789012, '789 Oak St, Sometown, USA', 'Chef'),
(4, 'Alice', 'Johnson', 'alice.johnson@example.com', 4567890123, '101 Pine St, Anothertown, USA', 'User'),
(5, 'Bob', 'Davis', 'bob.davis@example.com', 5678901234, '202 Cedar St, Yettown, USA', 'Admin'),
(6, 'Carol', 'Miller', 'carol.miller@example.com', 6789012345, '303 Birch St, Lasttown, USA', 'Chef'),
(7, 'Eve', 'Wilson', 'eve.wilson@example.com', 7890123456, '404 Maple St, Smalltown, USA', 'User'),
(8, 'Frank', 'Moore', 'frank.moore@example.com', 8901234567, '505 Aspen St, Bigtown, USA', 'Admin'),
(9, 'Grace', 'Taylor', 'grace.taylor@example.com', 9012345678, '606 Willow St, Middletown, USA', 'Chef'),
(10, 'Hank', 'Anderson', 'hank.anderson@example.com', 1012345678, '707 Walnut St, Largetown, USA', 'User');


INSERT INTO recipes (id, title, picture, text_recipe, user_id) VALUES
(1, 'Tomato Soup', 'tomato_soup.jpg', 'A delicious tomato soup made with fresh tomatoes, garlic, and basil.', 3),
(2, 'Garden Salad', 'garden_salad.jpg', 'A fresh salad with cucumbers, tomatoes, and lettuce.', 6),
(3, 'Spaghetti Carbonara', 'carbonara.jpg', 'Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.', 9),
(4, 'Grilled Cheese Sandwich', 'grilled_cheese.jpg', 'A simple and tasty grilled cheese sandwich made with cheddar cheese and butter.', 3),
(5, 'Roasted Vegetable Medley', 'roasted_vegetables.jpg', 'A mix of roasted bell peppers, carrots, and onions seasoned with herbs.', 6),
(6, 'Garlic Shrimp Pasta', 'garlic_shrimp_pasta.jpg', 'Pasta with shrimp sautéed in a garlic butter sauce.', 9);

INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id) VALUES
(1, 1, 1),  -- Tomato Soup with Tomato
(2, 1, 8),  -- Tomato Soup with Garlic
(3, 2, 2),  -- Garden Salad with Cucumber
(4, 2, 3),  -- Garden Salad with Lettuce
(5, 2, 5),  -- Garden Salad with Carrot
(6, 3, 1),  -- Spaghetti Carbonara with Tomato
(7, 3, 8),  -- Spaghetti Carbonara with Garlic
(8, 4, 1),  -- Grilled Cheese Sandwich with Tomato
(9, 4, 8),  -- Grilled Cheese Sandwich with Garlic
(10, 5, 2), -- Roasted Vegetable Medley with Cucumber
(11, 5, 4), -- Roasted Vegetable Medley with Onion
(12, 5, 5), -- Roasted Vegetable Medley with Carrot
(13, 6, 8), -- Garlic Shrimp Pasta with Garlic
(14, 6, 7); -- Garlic Shrimp Pasta with Spinach



INSERT INTO comments (id, title, body, user_id, recipe_id) VALUES
(1, 'Delicious!', 'I really enjoyed this tomato soup. The flavors were fantastic!', 3, 1), -- Comment by Chef for Tomato Soup
(2, 'Refreshing Salad', 'The garden salad was very fresh and crisp. Loved it!', 6, 2), -- Comment by Chef for Garden Salad
(3, 'Classic Dish', 'The spaghetti carbonara was perfectly creamy and flavorful.', 9, 3), -- Comment by Chef for Spaghetti Carbonara
(4, 'Great Sandwich', 'The grilled cheese sandwich was simple but very satisfying.', 3, 4), -- Comment by Chef for Grilled Cheese Sandwich
(5, 'Tasty Veggies', 'The roasted vegetable medley was a great side dish.', 6, 5), -- Comment by Chef for Roasted Vegetable Medley
(6, 'Perfect Pasta', 'The garlic shrimp pasta had the right amount of garlic. Excellent dish!', 9, 6); -- Comment by Chef for Garlic Shrimp Pasta

INSERT INTO favorite (id, user_id, recipe_id) VALUES
(1, 1, 1),  -- User 1 (John Doe) favorites Tomato Soup
(2, 1, 4),  -- User 1 (John Doe) favorites Grilled Cheese Sandwich
(3, 2, 2),  -- User 2 (Jane Smith) favorites Garden Salad
(4, 2, 3),  -- User 2 (Jane Smith) favorites Spaghetti Carbonara
(5, 4, 4),  -- User 4 (Alice Johnson) favorites Grilled Cheese Sandwich
(6, 5, 5),  -- User 5 (Bob Davis) favorites Roasted Vegetable Medley
(7, 7, 6),  -- User 7 (Eve Wilson) favorites Garlic Shrimp Pasta
(8, 8, 1),  -- User 8 (Frank Moore) favorites Tomato Soup
(9, 10, 2); -- User 10 (Hank Anderson) favorites Garden Salad