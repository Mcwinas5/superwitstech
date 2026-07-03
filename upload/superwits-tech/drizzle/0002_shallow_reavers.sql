CREATE TABLE `communicationLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRequestId` int NOT NULL,
	`followupSequenceId` int,
	`type` enum('email','whatsapp') NOT NULL,
	`recipient` varchar(320) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`status` enum('sent','failed','bounced') NOT NULL,
	`errorDetails` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `communicationLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `followupSequences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRequestId` int NOT NULL,
	`step` int NOT NULL,
	`status` enum('pending','sent','failed') NOT NULL DEFAULT 'pending',
	`channel` enum('email','whatsapp') NOT NULL,
	`scheduledAt` timestamp NOT NULL,
	`sentAt` timestamp,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `followupSequences_id` PRIMARY KEY(`id`)
);
