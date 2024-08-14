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
