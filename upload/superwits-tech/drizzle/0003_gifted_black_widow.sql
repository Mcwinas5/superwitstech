ALTER TABLE `auditRequests` ADD `unsubscribed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `auditRequests` ADD `unsubscribedAt` timestamp;--> statement-breakpoint
ALTER TABLE `auditRequests` ADD `unsubscribeToken` varchar(64);--> statement-breakpoint
ALTER TABLE `auditRequests` ADD CONSTRAINT `auditRequests_unsubscribeToken_unique` UNIQUE(`unsubscribeToken`);