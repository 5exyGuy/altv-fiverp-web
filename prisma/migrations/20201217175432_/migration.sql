-- CreateTable
CREATE TABLE `Apartment` (
    `price` INT NOT NULL,
    `lockState` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartmentInventory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Apartment_id` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
UNIQUE INDEX `ApartmentInventory.fk_Apartment_id_unique`(`fk_Apartment_id`),
UNIQUE INDEX `ApartmentInventory.fk_Inventory_id_unique`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business` (
    `price` INT NOT NULL,
    `lockState` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusinessInventory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Business_id` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
UNIQUE INDEX `BusinessInventory.fk_Business_id_unique`(`fk_Business_id`),
UNIQUE INDEX `BusinessInventory.fk_Inventory_id_unique`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Character` (
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `cash` INT NOT NULL,
    `bank` INT NOT NULL,
    `dead` BOOLEAN NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `health` INT NOT NULL,
    `armor` INT NOT NULL,
    `arrestTime` INT NOT NULL,
    `dimension` INT NOT NULL,
    `lastPosition` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_User_id` INT NOT NULL,
INDEX `fk_User_id`(`fk_User_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterApartment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Apartment_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `CharacterApartment.fk_Apartment_id_unique`(`fk_Apartment_id`),
UNIQUE INDEX `CharacterApartment.fk_Character_id_unique`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterBusiness` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Business_id` INT NOT NULL,
UNIQUE INDEX `CharacterBusiness.fk_Character_id_unique`(`fk_Character_id`),
UNIQUE INDEX `CharacterBusiness.fk_Business_id_unique`(`fk_Business_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterHouse` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_House_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `CharacterHouse.fk_House_id_unique`(`fk_House_id`),
UNIQUE INDEX `CharacterHouse.fk_Character_id_unique`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterInventory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `CharacterInventory.fk_Inventory_id_unique`(`fk_Inventory_id`),
UNIQUE INDEX `CharacterInventory.fk_Character_id_unique`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterSkill` (
    `level` INT NOT NULL,
    `xp` INT NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Skill_id` INT NOT NULL,
UNIQUE INDEX `CharacterSkill.fk_Character_id_unique`(`fk_Character_id`),
UNIQUE INDEX `CharacterSkill.fk_Skill_id_unique`(`fk_Skill_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterVehicle` (
    `destroyed` BOOLEAN NOT NULL,
    `lastPosition` VARCHAR(191) NOT NULL,
    `lastRotation` VARCHAR(191) NOT NULL,
    `fuel` INT NOT NULL,
    `dimension` INT NOT NULL,
    `lockState` VARCHAR(191) NOT NULL,
    `numberPlate` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Vehicle_id` INT NOT NULL,
UNIQUE INDEX `CharacterVehicle.fk_Character_id_unique`(`fk_Character_id`),
UNIQUE INDEX `CharacterVehicle.fk_Vehicle_id_unique`(`fk_Vehicle_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Character_id1` INT NOT NULL,
UNIQUE INDEX `Contact.fk_Character_id1_unique`(`fk_Character_id1`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faction` (
    `name` VARCHAR(191) NOT NULL,
    `registrationDate` DATETIME(3) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `Faction.fk_Character_id_unique`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FactionMember` (
    `joinDate` DATETIME(3) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Faction_id` INT NOT NULL,
    `fk_Character_id` INT NOT NULL,
UNIQUE INDEX `FactionMember.fk_Character_id_unique`(`fk_Character_id`),
INDEX `fk_Faction_id`(`fk_Faction_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `House` (
    `price` INT NOT NULL,
    `lockState` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseInventory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_House_id` INT NOT NULL,
    `fk_Inventory_id` INT NOT NULL,
UNIQUE INDEX `HouseInventory.fk_House_id_unique`(`fk_House_id`),
UNIQUE INDEX `HouseInventory.fk_Inventory_id_unique`(`fk_Inventory_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryItem` (
    `slot` INT NOT NULL,
    `amount` INT NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_Item_id` INT NOT NULL,
UNIQUE INDEX `InventoryItem.fk_Inventory_id_unique`(`fk_Inventory_id`),
UNIQUE INDEX `InventoryItem.fk_Item_id_unique`(`fk_Item_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `name` VARCHAR(191) NOT NULL,
    `weight` DECIMAL(65,30) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginHistory` (
    `date` DATETIME(3) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `socialId` VARCHAR(191) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_User_id` INT NOT NULL,
INDEX `fk_User_id`(`fk_User_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `content` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Character_id` INT NOT NULL,
    `fk_Character_id1` INT NOT NULL,
UNIQUE INDEX `Message.fk_Character_id1_unique`(`fk_Character_id1`),
INDEX `fk_Character_id`(`fk_Character_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `name` VARCHAR(191) NOT NULL,
    `maxLevel` INT NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `compound_id` VARCHAR(191) NOT NULL,
    `user_id` INT NOT NULL,
    `provider_type` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191),
    `access_token` VARCHAR(191),
    `access_token_expires` DATETIME(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Account.compound_id_unique`(`compound_id`),
INDEX `providerAccountId`(`provider_account_id`),
INDEX `providerId`(`provider_id`),
INDEX `userId`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Session.session_token_unique`(`session_token`),
UNIQUE INDEX `Session.access_token_unique`(`access_token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191),
    `name` VARCHAR(191),
    `email` VARCHAR(191),
    `password` VARCHAR(191),
    `email_verified` DATETIME(3),
    `emailVerifyToken` VARCHAR(191),
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191),
    `role` ENUM('USER', 'MOD', 'ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id` INT NOT NULL AUTO_INCREMENT,
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationRequest` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `VerificationRequest.token_unique`(`token`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VechileInventory` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_Inventory_id` INT NOT NULL,
    `fk_CharacterVehicle_id` INT NOT NULL,
UNIQUE INDEX `VechileInventory.fk_Inventory_id_unique`(`fk_Inventory_id`),
UNIQUE INDEX `VechileInventory.fk_CharacterVehicle_id_unique`(`fk_CharacterVehicle_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `name` VARCHAR(191) NOT NULL,
    `price` INT NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `seats` INT NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `maxBraking` DECIMAL(65,30) NOT NULL,
    `maxBrakingMods` DECIMAL(65,30) NOT NULL,
    `maxSpeed` DECIMAL(65,30) NOT NULL,
    `maxTraction` DECIMAL(65,30) NOT NULL,
    `acceleration` DECIMAL(65,30) NOT NULL,
    `agility` DECIMAL(65,30) NOT NULL,
    `maxKnots` DECIMAL(65,30) NOT NULL,
    `moveResistance` DECIMAL(65,30) NOT NULL,
    `id` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleProperties` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fk_CharacterVehicle_id` INT NOT NULL,
UNIQUE INDEX `VehicleProperties.fk_CharacterVehicle_id_unique`(`fk_CharacterVehicle_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApartmentInventory` ADD FOREIGN KEY (`fk_Apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartmentInventory` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessInventory` ADD FOREIGN KEY (`fk_Business_id`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusinessInventory` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Character` ADD FOREIGN KEY (`fk_User_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterApartment` ADD FOREIGN KEY (`fk_Apartment_id`) REFERENCES `Apartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterApartment` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterBusiness` ADD FOREIGN KEY (`fk_Business_id`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterBusiness` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterHouse` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterHouse` ADD FOREIGN KEY (`fk_House_id`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInventory` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInventory` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterSkill` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterSkill` ADD FOREIGN KEY (`fk_Skill_id`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterVehicle` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterVehicle` ADD FOREIGN KEY (`fk_Vehicle_id`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD FOREIGN KEY (`fk_Character_id1`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faction` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FactionMember` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FactionMember` ADD FOREIGN KEY (`fk_Faction_id`) REFERENCES `Faction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseInventory` ADD FOREIGN KEY (`fk_House_id`) REFERENCES `House`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseInventory` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItem` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItem` ADD FOREIGN KEY (`fk_Item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoginHistory` ADD FOREIGN KEY (`fk_User_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`fk_Character_id`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`fk_Character_id1`) REFERENCES `Character`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VechileInventory` ADD FOREIGN KEY (`fk_CharacterVehicle_id`) REFERENCES `CharacterVehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VechileInventory` ADD FOREIGN KEY (`fk_Inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleProperties` ADD FOREIGN KEY (`fk_CharacterVehicle_id`) REFERENCES `CharacterVehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
