DROP DATABASE IF EXISTS sec3_gr09_database;
CREATE DATABASE IF NOT EXISTS `sec3_gr09_database` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `sec3_gr09_database`;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
	ACCOUNT_ID CHAR(3),
    ACCOUNT_FNAME VARCHAR(30) NOT NULL,
    ACCOUNT_LNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PNUMBER CHAR(10) NOT NULL,
    ACCOUNT_EMAIL VARCHAR(60) NOT NULL,
    ACCOUNT_USERNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PASSWORD VARCHAR(30) NOT NULL,
    ACCOUNT_LAST_LOGIN DATE NOT NULL,
    ACCOUNT_CREATION_DATE DATE NOT NULL,
    CONSTRAINT PK_ACCID PRIMARY KEY (ACCOUNT_ID)
);


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	ACCOUNT_ID CHAR(3),
    ACCOUNT_FNAME VARCHAR(30) NOT NULL,
    ACCOUNT_LNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PNUMBER CHAR(10) NOT NULL,
    ACCOUNT_EMAIL VARCHAR(60) NOT NULL,
    ACCOUNT_USERNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PASSWORD VARCHAR(30) NOT NULL,
    ACCOUNT_LAST_LOGIN DATE NOT NULL,
    ACCOUNT_CREATION_DATE DATE NOT NULL,
    CONSTRAINT FK_ACCID FOREIGN KEY (ACCOUNT_ID)
    REFERENCES `account` (ACCOUNT_ID)
);


DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
	ACCOUNT_ID CHAR(3),
    ACCOUNT_FNAME VARCHAR(30) NOT NULL,
    ACCOUNT_LNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PNUMBER CHAR(10) NOT NULL,
    ACCOUNT_EMAIL VARCHAR(60) NOT NULL,
    ACCOUNT_USERNAME VARCHAR(30) NOT NULL,
    ACCOUNT_PASSWORD VARCHAR(30) NOT NULL,
    ACCOUNT_LAST_LOGIN DATE NOT NULL,
    ACCOUNT_CREATION_DATE DATE NOT NULL,
    ADMIN_AUTHORITY VARCHAR(50) NOT NULL,
    ADMIN_CONTACTS VARCHAR(30) NOT NULL,
    ADMIN_START_DATE DATE NOT NULL,
    CONSTRAINT FK_ACCNTID FOREIGN KEY (ACCOUNT_ID)
    REFERENCES `account` (ACCOUNT_ID)
);


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
	PRODUCT_ID INT AUTO_INCREMENT,
    PRODUCT_NAME VARCHAR(60) NOT NULL,
    PRODUCT_DESCRIPTION VARCHAR(500) NOT NULL,
    PRODUCT_QUANTITY INT NOT NULL,
    PRODUCT_CATEGORY VARCHAR(30) NOT NULL,
    PRODUCT_ROOM VARCHAR(40) NOT NULL,
    PRODUCT_BRAND VARCHAR(30) NOT NULL,
    PRODUCT_PICTURE1 VARCHAR(200) NOT NULL,
    PRODUCT_PICTURE2 VARCHAR(200) NOT NULL,
    PRODUCT_PICTURE3 VARCHAR(200) NOT NULL,
    PRODUCT_PICTURE4 VARCHAR(200) NOT NULL,
    PRODUCT_PRICE DECIMAL(9,2) NOT NULL,
    PRODUCT_COLOR VARCHAR(20) NOT NULL,
    CONSTRAINT PK_PDID PRIMARY KEY (PRODUCT_ID)
);


DROP TABLE IF EXISTS `discount` ;
CREATE TABLE `discount` (
	DISCOUNT_ID INT,
    DISCOUNT_DESCRIPTION VARCHAR(60) NOT NULL,
    DISCOUNT_VALIDITY VARCHAR(30) NOT NULL,
    DISCOUNT_TYPE VARCHAR(50) NOT NULL,
    DISCOUNT_AMOUNT DECIMAL(9,2) NOT NULL,
    CONSTRAINT PK_DCID PRIMARY KEY (DISCOUNT_ID)
);


DROP TABLE IF EXISTS `cart` ;
CREATE TABLE `cart` (
	CART_ID INT,
    CART_STATUS VARCHAR(30) NOT NULL,
    CART_MODICATION_DATE DATE NOT NULL,
    CONSTRAINT PK_CTID PRIMARY KEY (CART_ID)
);


DROP TABLE IF EXISTS `cartitem` ;
CREATE TABLE `cartitem` (
	PRODUCT_ID INT,
    CART_ID INT,
    LAST_MODIFIED DATE NOT NULL,
    QUANTITY INT NOT NULL,
    CONSTRAINT FK_PRDCTID FOREIGN KEY (PRODUCT_ID)
    REFERENCES `product` (PRODUCT_ID),
    CONSTRAINT FK_CRTID FOREIGN KEY (CART_ID)
    REFERENCES `cart` (CART_ID)
);


DROP TABLE IF EXISTS `order` ;
CREATE TABLE `order` (
	ORDER_ID INT,
    ORDER_LIST VARCHAR(500) NOT NULL,
    ORDER_TOTAL DECIMAL(9,2) NOT NULL,
    ORDER_DATE DATE NOT NULL,
    ORDER_STATUS VARCHAR(30) NOT NULL,
    ORDER_TRACKNUMBER CHAR(13) NOT NULL,
    SHIPMENT_FEE DECIMAL(9,2) NOT NULL,
    DISCOUNT_ID INT,
    CONSTRAINT PK_ORDID PRIMARY KEY (ORDER_ID),
    CONSTRAINT FK_DISID FOREIGN KEY (DISCOUNT_ID)
    REFERENCES `discount` (DISCOUNT_ID)
);


DROP TABLE IF EXISTS `payment` ;
CREATE TABLE `payment` (
	PAYMENT_NUMBER INT,
    PAYMENT_OPTION VARCHAR(30) NOT NULL,
    PAYMENT_DATE DATE NOT NULL,
    PAYMENT_AMOUNT DECIMAL(9,2) NOT NULL,
    PAYMENT_STATUS VARCHAR(30) NOT NULL,
    ORDER_ID INT,
    CONSTRAINT PK_PMID PRIMARY KEY (PAYMENT_NUMBER),
    CONSTRAINT FK_ORDID FOREIGN KEY (ORDER_ID)
    REFERENCES `order` (ORDER_ID)
);


DROP TABLE IF EXISTS `invoice` ;
CREATE TABLE `invoice` (
	INVOICE_NUMBER INT,
    INVOICE_DATE DATE NOT NULL,
    INVOICE_AMOUNT DECIMAL(9,2) NOT NULL,
    INVOICE_STATUS VARCHAR(30) NOT NULL,
    ORDER_ID INT,
    CONSTRAINT PK_IVID PRIMARY KEY (INVOICE_NUMBER),
    CONSTRAINT FK_ORDRID FOREIGN KEY (ORDER_ID)
    REFERENCES `order` (ORDER_ID)
);


DROP TABLE IF EXISTS `receipt` ;
CREATE TABLE `receipt` (
	RECEIPT_NUMBER INT,
    RECEIPT_DATE DATE NOT NULL,
    RECEIPT_TOTAL DECIMAL(9,2) NOT NULL,
    RECEIPT_DESCRIPTION VARCHAR(500) NOT NULL,
    ORDER_ID INT,
    CONSTRAINT PK_RCID PRIMARY KEY (RECEIPT_NUMBER),
    CONSTRAINT FK_OID FOREIGN KEY (ORDER_ID)
    REFERENCES `order` (ORDER_ID)
);


DROP TABLE IF EXISTS `review` ;
CREATE TABLE `review` (
	ACCOUNT_ID CHAR(3),
    REVIEW_MESSAGE VARCHAR(600) NOT NULL,
    REVIEW_DATE DATE NOT NULL,
    REVIEW_RATING DECIMAL(2,1) NOT NULL,
    REVIEW_ATTACHMENT VARCHAR(300) NOT NULL,
    CONSTRAINT FK_AC_ID FOREIGN KEY (ACCOUNT_ID)
    REFERENCES `account` (ACCOUNT_ID)
);


DROP TABLE IF EXISTS `add_product_to_cart` ;
CREATE TABLE `add_product_to_cart` (
	ACCOUNT_ID CHAR(3),
    CART_ID INT,
    CONSTRAINT FKACC_ID FOREIGN KEY (ACCOUNT_ID)
    REFERENCES `account` (ACCOUNT_ID),
    CONSTRAINT FKCRT_ID FOREIGN KEY (CART_ID)
    REFERENCES `cart` (CART_ID)
);


DROP TABLE IF EXISTS `create_order` ;
CREATE TABLE `create_order` (
	CART_ID INT,
    ORDER_ID INT,
    CONSTRAINT FKCART_ID FOREIGN KEY (CART_ID)
    REFERENCES `cart` (CART_ID),
    CONSTRAINT FK_ORDERID FOREIGN KEY (ORDER_ID)
    REFERENCES `order` (ORDER_ID)
);



INSERT INTO `account`
VALUES
("001", "Panipak", "Sittiprasert", "0824481548", "panipak.sit@gmail.com", "earn096", "earn141146", '2024-03-13', '2021-04-15'),
("002", "Yaowapa", "Sabkasedkid", "0891037923", "yaowapa.sab@gmail.com", "pream087", "pream08124", '2024-04-26', '2021-02-22'),
("003", "Pongpon", "Tangpigulthong", "0864001465", "pongpon.tan@gmail.com", "p104", "p080947", '2024-04-29', '2020-01-30'),
("004", "Achiraya", "Mankham", "0955682716", "achiraya.mak@gmail.com", "ploy183", "ploy050547", '2024-03-25', '2022-07-21'),
("005", "Kawin", "Surakupt", "0802149276", "kawin.sur@gmail.com", "win101", "win040347", '2024-04-13', '2020-08-19'),
("006", "Chanisara", "Jonsomjid", "0940706717", "chanisara.jon@gmail.com", "nuey033", "nuey061246", '2024-03-29', '2024-03-25'),
("007", "Phanphum", "Pratumsuwan", "0805950201", "phanphum.pra@gmail.com", "ploy081", "ploy210447", '2024-04-14', '2023-12-09'),
("008", "Thareerat", "Phothitham", "0995412060", "thareerat.pho@gmail.com", "vill071", "vill290946", '2022-05-21', '2021-10-07'),
("009", "Pran", "Tantipiwatanaskul", "0896679496", "pran.tan@gmail.com", "pran105", "pran040347", '2023-02-18', '2023-01-23'),
("010", "Paranee", "Wannasorn", "0871415027", "paranee.wan@gmail.com", "ping121", "ping150547", '2024-06-30', '2022-12-25'),
("011", "Mia", "Wallace", "0812342345", "mia.wal@gmail.com", "mia111", "mia111111", '2022-01-31', '2021-12-25'),
("012", "Marianne", "Sheridan", "0824471678", "marianne.she@gmail.com", "marianne222", "marianne222222", '2024-04-11', '2023-07-18'),
("013", "Allison", "Hamilton", "0852122245", "allison.ham@gmail.com", "allison333", "allison333333", '2024-02-27', '2020-11-09'),
("014", "Ruby", "Matthews", "0207891234", "ruby.mat@gmail.com", "ruby444", "ruby444444", '2024-09-30', '2021-11-21'),
("015", "Maeve", "Wiley", "0811112222", "maeve.wil@gmail.com", "maeve555", "maeve555555", '2024-10-02', '2020-11-14'),
("016", "Oliver", "Conner", "0821215346", "oliver.con@gmail.com", "olive203", "olive110246", '2024-02-28', '2023-11-22'),
("017", "Lalida", "Sabkasedkid", "0817333546", "lalida.sab@gmail.com", "ploy091", "ploy091244", '2023-01-22', '2022-12-20'),
("018", "Labu", "Bubu", "0942465053", "labu.bub@gmail.com", "labubu022", "labubu050642", '2024-04-18', '2023-09-02'),
("019", "James", "Jacob", "0671335382", "james.jac@gmail.com", "james099", "james241245", '2024-03-30', '2024-02-22'),
("020", "Smith", "Murphy", "0636346075", "smith.mur@gmail.com", "smith088", "smith130343", '2024-02-10', '2023-02-23');

INSERT INTO `admin`
VALUES 
("001", "Panipak", "Sittiprasert", "0824481548", "panipak.sit@gmail.com", "earn096", "earn141146", '2024-03-13', '2021-04-15', "Website Maintenance", "panipak@furnihub.com", '2021-05-01'),
("002", "Yaowapa", "Sabkasedkid", "0891037923", "yaowapa.sab@gmail.com", "pream087", "pream08124", '2024-04-26', '2021-02-22', "Content Management", "yaowapa@furnihub.com", '2021-03-01'),
("003", "Pongpon", "Tangpigulthong", "0864001465", "pongpon.tan@gmail.com", "p104", "p080947", '2024-04-29', '2020-01-30', "Security Management", "pongpon@furnihub.com", '2020-02-01'),
("004", "Achiraya", "Mankham", "0955682716", "achiraya.mak@gmail.com", "ploy183", "ploy050547", '2024-03-25', '2022-07-21', "Customer Support", "achiraya@furnihub.com", '2022-08-01'),
("005", "Kawin", "Surakupt", "0802149276", "kawin.sur@gmail.com", "win101", "win040347", '2024-04-13', '2020-08-19', "User Management", "kawin@furnihub.com", '2020-09-01'),
("011", "Mia", "Wallace", "0812342345", "mia.wal@gmail.com", "mia111", "mia111111", '2022-01-31', '2021-12-25', "Website Maintenance", "mia@furnihub.com", '2020-01-01'),
("012", "Marianne", "Sheridan", "0824471678", "marianne.she@gmail.com", "marianne222", "marianne222222", '2024-04-11', '2023-07-18', "Content Management", "marianne@furnihub.com", '2020-01-01'),
("013", "Allison", "Hamilton", "0852122245", "allison.ham@gmail.com", "allison333", "allison333333", '2024-02-27', '2020-11-09', "Security Management", "allison@furnihub.com", '2020-02-01'),
("014", "Ruby", "Matthews", "0207891234", "ruby.mat@gmail.com", "ruby444", "ruby444444", '2024-09-30', '2021-11-21', "Customer Support", "ruby@furnihub.com", '2020-02-01'),
("015", "Maeve", "Wiley", "0811112222", "maeve.wil@gmail.com", "maeve555", "maeve555555", '2024-10-02', '2020-11-14', "User Management", "maeve@furnihub.com", '2020-03-01');


INSERT INTO `user`
VALUES 
("006", "Chanisara", "Jonsomjid", "0940706717", "chanisara.jon@gmail.com", "nuey033", "nuey061246", '2024-03-29', '2024-03-25'),
("007", "Phanphum", "Pratumsuwan", "0805950201", "phanphum.pra@gmail.com", "ploy081", "ploy210447", '2024-04-14', '2023-12-09'),
("008", "Thareerat", "Phothitham", "0995412060", "thareerat.pho@gmail.com", "vill071", "vill290946", '2022-05-21', '2021-10-07'),
("009", "Pran", "Tantipiwatanaskul", "0896679496", "pran.tan@gmail.com", "pran105", "pran040347", '2023-02-18', '2023-01-23'),
("010", "Paranee", "Wannasorn", "0871415027", "paranee.wan@gmail.com", "ping121", "ping150547", '2024-03-30', '2022-12-25'),
("016", "Oliver", "Conner", "0821215346", "oliver.con@gmail.com", "olive203", "olive110246", '2024-02-28', '2023-11-22'),
("017", "Lalida", "Sabkasedkid", "0817333546", "lalida.sab@gmail.com", "ploy091", "ploy091244", '2023-01-22', '2022-12-20'),
("018", "Labu", "Bubu", "0942465053", "labu.bub@gmail.com", "labubu022", "labubu050642", '2024-04-18', '2023-09-02'),
("019", "James", "Jacob", "0671335382", "james.jac@gmail.com", "james099", "james241245", '2024-03-30', '2024-02-22'),
("020", "Smith", "Murphy", "0636346075", "smith.mur@gmail.com", "smith088", "smith130343", '2024-02-10', '2023-02-23');

INSERT INTO `product`
VALUES 
(101, "LINEA", "The structure is made of solid wood. Solid box bed base with 2 bedside drawers Increase the storage space on the side to support the weight and distribute the weight very well.", 25, "Bed", "Bedroom", "Index Livingmall", "https://drive.google.com/thumbnail?id=1AXiLqkaq6FNE-uPBG_ChLq3ppsgSVyyT",  "https://drive.google.com/thumbnail?id=1qOpYCCqHP9FtS5YoNPT7HyJMA5O9YQHs", "https://drive.google.com/thumbnail?id=1Tu58n7AreEFWdnLap_v0QhD7oiMplqpC", "https://drive.google.com/thumbnail?id=1RO2VDYLC-rROVRlH9Dez_TmH-rmT4oK-", 20900, "White"),
(102, "LYBRARY", "Bookcase with drawers, library, modern style, white, size 80 cm. A bookcase for those who love reading, beautiful to choose from, combined with a functional design, shelves that can be adjusted according to needs, along with 2 drawers for every arrangement.", 39, "Shelf", "Living Room", "Koncept", "https://drive.google.com/thumbnail?id=1OfKoYCP7lzTaNsHb3kRo7WC5d-_Q5LnD",  "https://drive.google.com/thumbnail?id=10gz62byOZQpPuYvWhryAN3XAdDzieqEk", "", "", 6320, "White"),
(103, "MONETA", "Koncept Furniture Moneta bed, vintage style, white, size 3.5 feet, with a beautiful and unique design. With the bunk bed function, you can reach the drawer when you want to use it. Helps save usable space.", 42, "Bed", "Bedroom", "Koncept", "https://drive.google.com/thumbnail?id=1SnTUJjEYSk2JslJ7uJPD0ovrOKlCvAzO",  "https://drive.google.com/thumbnail?id=116_2XWgKTj86ziXsFcvd53bytAS5oBz1", "https://drive.google.com/thumbnail?id=19OQFx5OWo5CEtx9JMWTsodxYICu4j9Cv", "https://drive.google.com/thumbnail?id=1rdES_flX1j2xI-uA8Zty0aipFqoQJTXL", 11360, "White"),
(104, "BLOX", "Size 100 cm. (W100 x D59 x H210 cm.) Consisting of a 100 cm cabinet, open body with LED lights, ready for full use. Complete functions Reflects the lifestyle perfectly", 53, "Wardrobe", "Bedroom", "Koncept", "https://drive.google.com/thumbnail?id=1w_5gZjT0x_9dv9uZcjBBEFUTh1NYl3g_",  "https://drive.google.com/thumbnail?id=1LR6Q6v7fDZj55Rrh11ukM1nMi_-TZgln", "", "", 10400, "White"),
(105, "MANETO", "Vintage style dressing table, size 120 cm, designed for sitting use. The top surface is elegant on 3 sides, combined with a beautiful, classic shape handle. Ready to answer the needs of people weighing and storing with 2-position drawers, Soft Close system, closes softly, completely quiet, reduces impact, and has an open shelf for you to choose and use as you wish.", 12, "Desk", "Bedroom", "Koncept", "https://drive.google.com/thumbnail?id=1KHy5TGxkEkAWFOX4YIkaRPA-n98xuQSG",  "https://drive.google.com/thumbnail?id=1MPa057yfNgHecALPkHg9vobGLW_w1HbB", "https://drive.google.com/thumbnail?id=1SNVe0HjMYFb_eBiiCCVdJ76VJzFDTXMc", "https://drive.google.com/thumbnail?id=1uUO-V1oYVhRmge3zVvnn4rNVQLlEKiHC", 3600, "White"),
(106, "HOME", "Wooden center table, round top, Disneyhome 90x90, natural color, allowing you to admire your beloved Mickey Mouse characters in the living room. The sleek design and airy shape help create a feeling of calm in the room when When I saw Made from durable painted rubber wood material.", 12, "Desk", "Living Room", "Koncept", "https://drive.google.com/thumbnail?id=1dPYD5qpG4gr_hohH84Xjs94BGyFRoF6S",  "", "", "", 9450, "Light Wood"),
(107, "ANASTASIA", "Wooden center table, round top, Disneyhome 90x90, natural color, allowing you to admire your beloved Mickey Mouse characters in the living room. The sleek design and airy shape help create a feeling of calm in the room when When I saw Made from durable painted rubber wood material.", 9, "Shelf", "Living Room", "Index Livingmall", "https://drive.google.com/thumbnail?id=1TxbNerGeuF8bVbkpOmYQkSwRrd5TlWV5",  "https://drive.google.com/thumbnail?id=1rGC2wxQTCULn33VB1n_a4M9mMiZskRAn", "https://drive.google.com/thumbnail?id=1VJe1f7NjqeMo2z0HIgCDd2olcqhrlxsD", "https://drive.google.com/thumbnail?id=1WEh7wzSFf4KxQtfVNxaptjEtZ0ENKPhU", 54900, "White"),
(108, "BORGEBY", "BORGEBY storage table has an elegant, simple and stylish design with a harmonious and balanced expression. The rounded airy shape, smooth surface and natural material make the table suitable for many different living situations and interior styles.", 53, "Desk", "Living room", "IKEA", "https://drive.google.com/thumbnail?id=1o-63BTaxmSOVdNvbGTeHSNEe0_tMrmhL",  "https://drive.google.com/thumbnail?id=1Yjuz2r6dWB2-sfDKI9mNAR7FyawMmee3", "https://drive.google.com/thumbnail?id=1aeVkjCThd3yCta7Rlndw4bdddj8jcoZx", "https://drive.google.com/thumbnail?id=1Yjuz2r6dWB2-sfDKI9mNAR7FyawMmee3", 2590, "Birch veneer"),
(109, "BORGEBY", "BORGEBY storage table has an elegant, simple and stylish design with a harmonious and balanced expression. The rounded airy shape, smooth surface and natural material make the table suitable for many different living situations and interior styles.", 16, "Desk", "Living room", "IKEA", "https://drive.google.com/thumbnail?id=1iPsqIUjfTFIdPt5Q2Aj5-7zDXCkkEGZw",  "https://drive.google.com/thumbnail?id=1uZIFvxzps8B_TXxBmmaUPQLzDla9LYdH", "https://drive.google.com/thumbnail?id=13y-HzrRZLq_yVvtZcXBxsUb3PIjk3LN4", "https://drive.google.com/thumbnail?id=1pcjv02mSx5EJGfwS9ar3cVsLAlazY3tg", 2590, "Black"),
(110, "VIMLE", "This soft sofa will have a long life since the seat cushions are filled with high resilience foam that gives good support for your body and quickly regains its original shape when you get up.", 4, "Sofa", "Living room", "IKEA", "https://drive.google.com/thumbnail?id=1WbN6OxvP-T6EPWfumFdDk_jDm7c5GmLB",  "https://drive.google.com/thumbnail?id=1U21nT1-dxz0PQq5AWENJQiOOJTR8O88j", "https://drive.google.com/thumbnail?id=1sXCjQPTEHD1MAvxme9qNmbeZZTbrOX5e", "https://drive.google.com/thumbnail?id=1ZRU7naGFlsTLHi1dmD7uTJwLniG6foLh", 25950, "Beige"),
(111, "MALM", "This versatile bed frame will look great with your choice of textiles and bedroom furniture. You can sit up comfortably in bed thanks to the high headboard – just prop some pillows behind your back and you will have a comfortable place to read or watch TV.", 9, "Bed", "Bedroom", "IKEA", "https://drive.google.com/thumbnail?id=1frTH7xi9ycuGnUEwZKguF7keBUsJ_hze",  "https://drive.google.com/thumbnail?id=1TNmLRWrtAx0rhIATiA9nSqtw-yFVZvM3", "https://drive.google.com/thumbnail?id=1bNKInAYGVk_WD5zrSk2QCQ3CTUNX-aER", "https://drive.google.com/thumbnail?id=1P-LC_2PztrU_1DRKGUNm3HpVIP5_Jev4", 9990, "White"),
(112, "HEMNES", "The large drawers have space for extra duvets, pillows, linens or other things you need to store, but want to have close at hand.", 12, "Bed", "Bedroom", "IKEA", "https://drive.google.com/thumbnail?id=1CzkmRvJ7RXGfbVCUC571X1KXM_K2yX0L",  "https://drive.google.com/thumbnail?id=1YW6ZstauyZo9ksNZl5B6bQXIpGu3zxwc", "https://drive.google.com/thumbnail?id=1JDBmM8jDcstE38qkD87xv56ZKYjKPKWI",  "https://drive.google.com/thumbnail?id=10NK2SyT9y28ZwZMJw76bK7Smh8Y7DkvH", 20970, "White");
