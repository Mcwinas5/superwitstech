CREATE TABLE `conversionMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`submissionCount` int NOT NULL DEFAULT 0,
	`avgPageLoadTime` int,
	`avgTimeToSubmission` int,
	`conversionRate` double NOT NULL DEFAULT 0,
	`avgLcp` int,
	`serviceWorkerActivePercentage` double DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversionMetrics_id` PRIMARY KEY(`id`),
	CONSTRAINT `conversionMetrics_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
CREATE TABLE `formSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`formType` varchar(50) NOT NULL DEFAULT 'audit',
	`pageLoadTime` int,
	`serviceWorkerActive` int NOT NULL DEFAULT 0,
	`timeToSubmission` int,
	`userAgent` text,
	`pathname` varchar(500),
	`country` varchar(100),
	`connectionType` varchar(50),
	`fcp` int,
	`lcp` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `formSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `performanceCorrelation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`loadTimeRange` varchar(50) NOT NULL,
	`submissionCount` int NOT NULL DEFAULT 0,
	`conversionRate` double NOT NULL DEFAULT 0,
	`avgTimeToSubmission` int,
	`bounceRate` double DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `performanceCorrelation_id` PRIMARY KEY(`id`)
);
