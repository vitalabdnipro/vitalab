CREATE TABLE `vitalab-cms_account` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`expiresAt` integer,
	`password` text,
	FOREIGN KEY (`userId`) REFERENCES `vitalab-cms_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vitalab-cms_product` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vitalab-cms_product_code_unique` ON `vitalab-cms_product` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `code_idx` ON `vitalab-cms_product` (`code`);--> statement-breakpoint
CREATE TABLE `vitalab-cms_related_test` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`testId` text NOT NULL,
	`relatedTestId` text NOT NULL,
	FOREIGN KEY (`testId`) REFERENCES `vitalab-cms_product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vitalab-cms_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `vitalab-cms_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vitalab-cms_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer NOT NULL,
	`image` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vitalab-cms_user_email_unique` ON `vitalab-cms_user` (`email`);--> statement-breakpoint
CREATE TABLE `vitalab-cms_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL
);
