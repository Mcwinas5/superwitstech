CREATE TABLE `chatbotConversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRequestId` int NOT NULL,
	`currentQuestionIndex` int NOT NULL DEFAULT 0,
	`isComplete` int NOT NULL DEFAULT 0,
	`responses` text NOT NULL DEFAULT ('[]'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chatbotConversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatbotMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`sender` enum('bot','user') NOT NULL,
	`message` text NOT NULL,
	`questionIndex` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatbotMessages_id` PRIMARY KEY(`id`)
);
