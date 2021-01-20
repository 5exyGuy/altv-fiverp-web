-- CreateTable
CREATE TABLE `accounts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `compound_id` VARCHAR(191) NOT NULL,
    `provider_type` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191),
    `access_token` VARCHAR(191),
    `access_token_expires` DATETIME(3),
    `user_id` INT NOT NULL,
UNIQUE INDEX `accounts.compound_id_unique`(`compound_id`),
INDEX `providerAccountId`(`provider_account_id`),
INDEX `providerId`(`provider_id`),
INDEX `fk_User_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apartments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `price` INT NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apartment_inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Apartment_id` INT NOT NULL,
INDEX `fk_Inventory_id`(`fk_Inventory_id`),
INDEX `fk_Apartment_id`(`fk_Apartment_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `price` INT NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Business_id` INT NOT NULL,
INDEX `fk_Inventory_id`(`fk_Inventory_id`),
INDEX `fk_Business_id`(`fk_Business_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characters` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `cash` INT NOT NULL,
    `bank` INT NOT NULL,
    `dead` BOOLEAN NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `health` INT NOT NULL,
    `armor` INT NOT NULL,
    `arrest_time` INT NOT NULL,
    `dimension` INT NOT NULL,
    `last_position` VARCHAR(191) NOT NULL,
    `fkUserId` INT NOT NULL,
INDEX `fk_User_id`(`fkUserId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_apartments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Apartment_id` INT NOT NULL,
UNIQUE INDEX `character_apartments.fk_Apartment_id_unique`(`fk_Apartment_id`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_businesses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Business_id` INT NOT NULL,
UNIQUE INDEX `character_businesses.fk_Business_id_unique`(`fk_Business_id`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_houses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_House_id` INT NOT NULL,
UNIQUE INDEX `character_houses.fk_House_id_unique`(`fk_House_id`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `character_inventories.fk_Character_id_unique`(`fk_Character_id`),
INDEX `fk_Inventory_id`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_skills` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `level` INT NOT NULL,
    `xp` INT NOT NULL,
    `fk_Skill_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
INDEX `fk_Skill_id`(`fk_Skill_id`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_vehicles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `destroyed` BOOLEAN NOT NULL,
    `last_position` VARCHAR(191) NOT NULL,
    `last_rotation` VARCHAR(191) NOT NULL,
    `fuel` INT NOT NULL,
    `dimension` INT NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `number_plate` VARCHAR(191) NOT NULL,
    `fk_Vehicle_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
INDEX `fk_Vehicle_id`(`fk_Vehicle_id`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Character_id1` INT NOT NULL,
INDEX `fk_Character_id`(`fk_Character_id`),
INDEX `fk_Character_id1`(`fk_Character_id1`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `factions.fk_Character_id_unique`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faction_members` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_Character_id` INT NOT NULL,
    `fk_Faction_id` INT NOT NULL,
UNIQUE INDEX `faction_members.fk_Character_id_unique`(`fk_Character_id`),
INDEX `fk_Faction_id`(`fk_Faction_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `price` INT NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_House_id` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
INDEX `fk_House_id`(`fk_House_id`),
INDEX `fk_Inventory_id`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `slot` INT NOT NULL,
    `amount` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Item_id` INT NOT NULL,
INDEX `fk_Inventory_id`(`fk_Inventory_id`),
INDEX `fk_Item_id`(`fk_Item_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `weight` DECIMAL(65,30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login_histories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip` VARCHAR(191) NOT NULL,
    `social_id` VARCHAR(191) NOT NULL,
    `hwid_ex_hash` VARCHAR(191) NOT NULL,
    `hwid_hash` VARCHAR(191) NOT NULL,
    `fk_User_id` INT NOT NULL,
INDEX `fk_User_id`(`fk_User_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `sent_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_Character_id` INT NOT NULL,
    `fk_Character_id1` INT NOT NULL,
INDEX `fk_Character_id`(`fk_Character_id`),
INDEX `fk_Character_id1`(`fk_Character_id1`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registration_requests` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
UNIQUE INDEX `registration_requests.token_unique`(`token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_password_requests` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
UNIQUE INDEX `reset_password_requests.token_unique`(`token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `expires` DATETIME(3) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `user_id` INT NOT NULL,
UNIQUE INDEX `sessions.session_token_unique`(`session_token`),
UNIQUE INDEX `sessions.access_token_unique`(`access_token`),
INDEX `fk_User_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `max_level` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(191),
    `name` VARCHAR(191),
    `email` VARCHAR(191),
    `password` VARCHAR(191),
    `email_verified` DATETIME(3),
    `verified` BOOLEAN,
    `image` VARCHAR(191),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('USER', 'MOD', 'ADMIN') NOT NULL DEFAULT 'USER',
    `id` INT NOT NULL AUTO_INCREMENT,
UNIQUE INDEX `users.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_inventories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_CharacterVehicle_id` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
UNIQUE INDEX `vehicle_inventories.fk_CharacterVehicle_id_unique`(`fk_CharacterVehicle_id`),
INDEX `fk_Inventory_id`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `price` INT NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `seats` INT NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `max_braking` DECIMAL(65,30) NOT NULL,
    `max_braking_mods` DECIMAL(65,30) NOT NULL,
    `max_speed` DECIMAL(65,30) NOT NULL,
    `max_traction` DECIMAL(65,30) NOT NULL,
    `acceleration` DECIMAL(65,30) NOT NULL,
    `agility` DECIMAL(65,30) NOT NULL,
    `max_knots` DECIMAL(65,30) NOT NULL,
    `move_resistance` DECIMAL(65,30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_properties` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_CharacterVehicle_id` INT NOT NULL,
UNIQUE INDEX `vehicle_properties.fk_CharacterVehicle_id_unique`(`fk_CharacterVehicle_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification_requests` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
UNIQUE INDEX `verification_requests.token_unique`(`token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apartment_inventories` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apartment_inventories` ADD FOREIGN KEY (`fk_Apartment_id`) REFERENCES `apartments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_inventories` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_inventories` ADD FOREIGN KEY (`fk_Business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characters` ADD FOREIGN KEY (`fkUserId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_apartments` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_apartments` ADD FOREIGN KEY (`fk_Apartment_id`) REFERENCES `apartments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_businesses` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_businesses` ADD FOREIGN KEY (`fk_Business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_houses` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_houses` ADD FOREIGN KEY (`fk_House_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_inventories` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_inventories` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_skills` ADD FOREIGN KEY (`fk_Skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_skills` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_vehicles` ADD FOREIGN KEY (`fk_Vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_vehicles` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD FOREIGN KEY (`fk_Character_id1`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factions` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faction_members` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faction_members` ADD FOREIGN KEY (`fk_Faction_id`) REFERENCES `factions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_inventories` ADD FOREIGN KEY (`fk_House_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `house_inventories` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_items` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_items` ADD FOREIGN KEY (`fk_Item_id`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `login_histories` ADD FOREIGN KEY (`fk_User_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD FOREIGN KEY (`fk_Character_id1`) REFERENCES `characters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle_inventories` ADD FOREIGN KEY (`fk_CharacterVehicle_id`) REFERENCES `character_vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle_inventories` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `inventories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle_properties` ADD FOREIGN KEY (`fk_CharacterVehicle_id`) REFERENCES `character_vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
