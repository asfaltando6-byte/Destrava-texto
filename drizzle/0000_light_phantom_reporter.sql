CREATE TABLE `purchases` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`product_name` text NOT NULL,
	`paid_at` integer NOT NULL,
	`received_at` integer NOT NULL
);
