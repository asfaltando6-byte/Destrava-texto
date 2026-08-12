CREATE TABLE `activity_events` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`kind` text NOT NULL,
	`created_at` integer NOT NULL
);
