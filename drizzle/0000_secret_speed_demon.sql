CREATE TABLE `device_registry` (
	`id` varchar(36) NOT NULL,
	`uuid_device` varchar(255) NOT NULL,
	`latitude` varchar(50),
	`longitude` varchar(50),
	`register_count` int NOT NULL DEFAULT 0,
	`is_captcha_required` boolean NOT NULL DEFAULT false,
	`is_permanently_blocked` boolean NOT NULL DEFAULT false,
	`last_attempt_at` timestamp NOT NULL DEFAULT (now()),
	`blocked_until` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `device_registry_id` PRIMARY KEY(`id`),
	CONSTRAINT `device_registry_uuid_device_unique` UNIQUE(`uuid_device`)
);
--> statement-breakpoint
CREATE TABLE `login_attempts` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`username_or_email` varchar(255) NOT NULL,
	`ip_address` varchar(50),
	`uuid_device` varchar(255),
	`latitude` varchar(50),
	`longitude` varchar(50),
	`is_successful` boolean NOT NULL DEFAULT false,
	`failure_reason` varchar(500),
	`attempted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `login_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `otp_attempts` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`attempt_count` int NOT NULL DEFAULT 0,
	`is_blocked` boolean NOT NULL DEFAULT false,
	`last_attempt_at` timestamp NOT NULL DEFAULT (now()),
	`blocked_until` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `otp_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_moderation_log` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`action_type` enum('suspended','banned','unbanned','unsuspended') NOT NULL,
	`reason` text NOT NULL,
	`notes` text,
	`moderated_by` varchar(36),
	`moderated_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_moderation_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kyc_documents` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`document_type` enum('id_card','certificate','diploma','other') NOT NULL,
	`file_url` varchar(500) NOT NULL,
	`verification_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`rejection_reason` text,
	`uploaded_at` timestamp NOT NULL DEFAULT (now()),
	`verified_at` timestamp,
	CONSTRAINT `kyc_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`full_legal_name` varchar(255) NOT NULL,
	`date_of_birth` date NOT NULL,
	`gender` enum('male','female') NOT NULL,
	`id_card_number` varchar(50),
	`kyc_status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`kyc_verified_at` timestamp,
	`current_status` enum('pelajar','mahasiswa','pekerja') NOT NULL,
	`school_name` varchar(255),
	`university_name` varchar(255),
	`job_title` varchar(255),
	`company_name` varchar(255),
	`image_profile` varchar(500),
	`bio` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `student_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `student_profiles_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `teacher_profiles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`full_legal_name` varchar(255) NOT NULL,
	`date_of_birth` date NOT NULL,
	`id_card_number` varchar(50),
	`kyc_status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`kyc_verified_at` timestamp,
	`current_status` enum('pelajar','mahasiswa','pekerja') NOT NULL,
	`school_name` varchar(255),
	`university_name` varchar(255),
	`job_title` varchar(255),
	`company_name` varchar(255),
	`headline` varchar(255) NOT NULL,
	`bio` text NOT NULL,
	`price_per_hour` decimal(10,2) NOT NULL,
	`mode_supported` enum('online','offline','both') NOT NULL,
	`rating_avg` decimal(3,2) NOT NULL DEFAULT '0.00',
	`rating_count` int NOT NULL DEFAULT 0,
	`total_sessions` int NOT NULL DEFAULT 0,
	`image_profile` varchar(500),
	`is_accepting_students` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `teacher_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `teacher_profiles_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `user_locations` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`label` varchar(100) NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`address` varchar(500) NOT NULL,
	`is_primary` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` varchar(36) NOT NULL,
	`name` enum('student','teacher','admin') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role_id` varchar(36) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`assigned_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified_at` timestamp,
	`phone` varchar(20) NOT NULL,
	`phone_verified_at` timestamp,
	`password_hash` varchar(255) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `availability_slots` (
	`id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`day_of_week` int NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `availability_slots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `booking_participants` (
	`id` varchar(36) NOT NULL,
	`booking_id` varchar(36) NOT NULL,
	`student_id` varchar(36) NOT NULL,
	`payment_status` enum('joined','paid','cancelled','refunded') NOT NULL DEFAULT 'joined',
	`joined_at` timestamp NOT NULL DEFAULT (now()),
	`cancelled_at` timestamp,
	CONSTRAINT `booking_participants_id` PRIMARY KEY(`id`),
	CONSTRAINT `booking_student_unique` UNIQUE(`booking_id`,`student_id`)
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`created_by_student_id` varchar(36) NOT NULL,
	`session_type` enum('private','group') NOT NULL,
	`mode` enum('online','offline') NOT NULL,
	`schedule_datetime` timestamp NOT NULL,
	`duration_minutes` int NOT NULL,
	`location_lat` decimal(10,8),
	`location_lng` decimal(11,8),
	`location_address` varchar(500),
	`status` enum('pending_payment','paid','confirmed','ongoing','completed','cancelled','refunded') NOT NULL DEFAULT 'pending_payment',
	`capacity` int,
	`current_participants` int NOT NULL DEFAULT 0,
	`price_snapshot` decimal(10,2) NOT NULL,
	`cancellation_reason` text,
	`cancelled_by` enum('student','teacher','admin'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` varchar(36) NOT NULL,
	`booking_id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`student_id` varchar(36) NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`is_verified_transaction` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `reviews_booking_id_unique` UNIQUE(`booking_id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(36) NOT NULL,
	`booking_id` varchar(36) NOT NULL,
	`student_id` varchar(36) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`platform_fee` decimal(10,2) NOT NULL,
	`teacher_amount` decimal(10,2) NOT NULL,
	`payment_method` enum('ewallet','bank_transfer','credit_card','qris') NOT NULL,
	`payment_gateway` varchar(50) NOT NULL,
	`payment_status` enum('pending','success','failed','refunded','partial_refund') NOT NULL DEFAULT 'pending',
	`transaction_ref` varchar(255),
	`gateway_response` json,
	`paid_at` timestamp,
	`refunded_at` timestamp,
	`refund_amount` decimal(10,2),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `payments_transaction_ref_unique` UNIQUE(`transaction_ref`)
);
--> statement-breakpoint
ALTER TABLE `login_attempts` ADD CONSTRAINT `login_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `otp_attempts` ADD CONSTRAINT `otp_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_moderation_log` ADD CONSTRAINT `user_moderation_log_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_moderation_log` ADD CONSTRAINT `user_moderation_log_moderated_by_users_id_fk` FOREIGN KEY (`moderated_by`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `kyc_documents` ADD CONSTRAINT `kyc_documents_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student_profiles` ADD CONSTRAINT `student_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teacher_profiles` ADD CONSTRAINT `teacher_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_locations` ADD CONSTRAINT `user_locations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `availability_slots` ADD CONSTRAINT `availability_slots_teacher_id_teacher_profiles_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `booking_participants` ADD CONSTRAINT `booking_participants_booking_id_bookings_id_fk` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `booking_participants` ADD CONSTRAINT `booking_participants_student_id_student_profiles_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_teacher_id_teacher_profiles_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_created_by_student_id_student_profiles_id_fk` FOREIGN KEY (`created_by_student_id`) REFERENCES `student_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_booking_id_bookings_id_fk` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_teacher_id_teacher_profiles_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_student_id_student_profiles_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_booking_id_bookings_id_fk` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_student_id_student_profiles_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student_profiles`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `uuid_device_idx` ON `device_registry` (`uuid_device`);--> statement-breakpoint
CREATE INDEX `last_attempt_at_idx` ON `device_registry` (`last_attempt_at`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `login_attempts` (`user_id`);--> statement-breakpoint
CREATE INDEX `username_or_email_idx` ON `login_attempts` (`username_or_email`);--> statement-breakpoint
CREATE INDEX `uuid_device_idx` ON `login_attempts` (`uuid_device`);--> statement-breakpoint
CREATE INDEX `attempted_at_idx` ON `login_attempts` (`attempted_at`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `otp_attempts` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `otp_attempts` (`email`);--> statement-breakpoint
CREATE INDEX `phone_idx` ON `otp_attempts` (`phone`);--> statement-breakpoint
CREATE INDEX `last_attempt_at_idx` ON `otp_attempts` (`last_attempt_at`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_moderation_log` (`user_id`);--> statement-breakpoint
CREATE INDEX `moderated_by_idx` ON `user_moderation_log` (`moderated_by`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `kyc_documents` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_status_idx` ON `kyc_documents` (`verification_status`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `student_profiles` (`user_id`);--> statement-breakpoint
CREATE INDEX `kyc_status_idx` ON `student_profiles` (`kyc_status`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `teacher_profiles` (`user_id`);--> statement-breakpoint
CREATE INDEX `kyc_status_idx` ON `teacher_profiles` (`kyc_status`);--> statement-breakpoint
CREATE INDEX `rating_avg_idx` ON `teacher_profiles` (`rating_avg`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_locations` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_roles` (`user_id`);--> statement-breakpoint
CREATE INDEX `role_id_idx` ON `user_roles` (`role_id`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `users` (`username`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `phone_idx` ON `users` (`phone`);--> statement-breakpoint
CREATE INDEX `teacher_id_idx` ON `availability_slots` (`teacher_id`);--> statement-breakpoint
CREATE INDEX `teacher_day_active_idx` ON `availability_slots` (`teacher_id`,`day_of_week`,`is_active`);--> statement-breakpoint
CREATE INDEX `booking_id_idx` ON `booking_participants` (`booking_id`);--> statement-breakpoint
CREATE INDEX `student_id_idx` ON `booking_participants` (`student_id`);--> statement-breakpoint
CREATE INDEX `teacher_id_idx` ON `bookings` (`teacher_id`);--> statement-breakpoint
CREATE INDEX `student_id_idx` ON `bookings` (`created_by_student_id`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `bookings` (`status`);--> statement-breakpoint
CREATE INDEX `schedule_datetime_idx` ON `bookings` (`schedule_datetime`);--> statement-breakpoint
CREATE INDEX `teacher_schedule_idx` ON `bookings` (`teacher_id`,`schedule_datetime`);--> statement-breakpoint
CREATE INDEX `teacher_id_idx` ON `reviews` (`teacher_id`);--> statement-breakpoint
CREATE INDEX `booking_id_idx` ON `reviews` (`booking_id`);--> statement-breakpoint
CREATE INDEX `booking_id_idx` ON `payments` (`booking_id`);--> statement-breakpoint
CREATE INDEX `student_id_idx` ON `payments` (`student_id`);--> statement-breakpoint
CREATE INDEX `payment_status_idx` ON `payments` (`payment_status`);--> statement-breakpoint
CREATE INDEX `transaction_ref_idx` ON `payments` (`transaction_ref`);