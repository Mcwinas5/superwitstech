CREATE TABLE `cacheAnalytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cacheName` varchar(50) NOT NULL,
	`hitCount` int NOT NULL DEFAULT 0,
	`missCount` int NOT NULL DEFAULT 0,
	`totalSize` bigint NOT NULL DEFAULT 0,
	`itemCount` int NOT NULL DEFAULT 0,
	`userAgent` text,
	`hitRate` double DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cacheAnalytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `performanceMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metricType` varchar(50) NOT NULL,
	`value` double NOT NULL,
	`userAgent` text,
	`pathname` varchar(500),
	`visitType` enum('first','repeat') NOT NULL,
	`serviceWorkerActive` int NOT NULL DEFAULT 0,
	`country` varchar(100),
	`connectionType` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `performanceMetrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `serviceWorkerEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`status` enum('success','pending','failed') NOT NULL DEFAULT 'success',
	`errorMessage` text,
	`userAgent` text,
	`swVersion` varchar(50),
	`cachedItemCount` int DEFAULT 0,
	`cacheSize` bigint DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `serviceWorkerEvents_id` PRIMARY KEY(`id`)
);
