-- Default Data
INSERT INTO UserCat
VALUES('admin', 'A System Administrator');
INSERT INTO UserCat
VALUES('staff', 'An Ordering Staff Member');
INSERT INTO UserCat
VALUES('end_user', 'The End User / Client');


INSERT INTO UserStatus
VALUES('alive', 'The User is active in the system');
INSERT INTO UserStatus
VALUES('dead', 'The User has been deleted from the system');

INSERT INTO LogType
VALUES('create_staff');
INSERT INTO LogType
VALUES('create_admin');
INSERT INTO LogType
VALUES('modifyPassword_admin');
INSERT INTO LogType
VALUES('modifyPassword_staff');
INSERT INTO LogType
VALUES('remove_admin');
INSERT INTO LogType
VALUES('remove_staff');


INSERT INTO Cuisine
VALUES('Italian');
INSERT INTO Cuisine
VALUES('Asian');
INSERT INTO Cuisine
VALUES('French');
INSERT INTO Cuisine
VALUES('Indian');
INSERT INTO Cuisine
VALUES('International');
INSERT INTO Cuisine
VALUES('Mexican');
INSERT INTO Cuisine
VALUES('American');
INSERT INTO Cuisine
VALUES('Egyptian');
INSERT INTO Cuisine
VALUES('Lebanese');
INSERT INTO Cuisine
VALUES('British');
INSERT INTO Cuisine
VALUES('Turkish');


INSERT INTO DeliveryArea
VALUES('6th of October');
INSERT INTO DeliveryArea
VALUES('New Cairo');
INSERT INTO DeliveryArea
VALUES('Nasr City');
INSERT INTO DeliveryArea
VALUES('Heliopolis');
INSERT INTO DeliveryArea
VALUES('Downtown');
INSERT INTO DeliveryArea
VALUES('Mohandessin');
INSERT INTO DeliveryArea
VALUES('Giza');
INSERT INTO DeliveryArea
VALUES('Zamalek');
INSERT INTO DeliveryArea
VALUES('Dokki');
INSERT INTO DeliveryArea
VALUES('Maadi');
INSERT INTO DeliveryArea
VALUES('Sheraton');

INSERT INTO MenuType
VALUES('Breakfast');
INSERT INTO MenuType
VALUES('Lunch');
INSERT INTO MenuType
VALUES('Dinner');
INSERT INTO MenuType
VALUES('Dessert');

INSERT INTO OrderStatus
VALUES('Pending');
INSERT INTO OrderStatus
VALUES('Received');
INSERT INTO OrderStatus
VALUES('Preparing');
INSERT INTO OrderStatus
VALUES('Out For Delivery');
INSERT INTO OrderStatus
VALUES('Delivered');
INSERT INTO OrderStatus
VALUES('Cancelled');

INSERT INTO ItemConfiguration
VALUES('Small', 1.0);
INSERT INTO ItemConfiguration
VALUES('Regular', 1.1);
INSERT INTO ItemConfiguration
VALUES('Large', 1.2);
INSERT INTO ItemConfiguration
VALUES('Combo - Small', 1.1);
INSERT INTO ItemConfiguration
VALUES('Combo - Regular', 1.17);
INSERT INTO ItemConfiguration
VALUES('Combo - Large', 1.25);



Insert into user
Values('johnuser', 'end_user', '88172381238', 'user@email', 'john', 'user', '123', '2001-01-15', 'alive');
Insert into user
Values('johnstaff', 'staff', '82381238', 'usser@email', 'john', 'user', '123', '2001-01-15', 'alive');
Insert into user
Values('johnadmin', 'admin', '55381238', 'admin@email', 'john', 'admin', '123', '2001-01-15', 'alive');


INSERT INTO Restaurant
VALUES(null, 'McDonalds', 'American', 7, 'a McStreet number', 0.13, '093000', '230000');
INSERT INTO Restaurant
VALUES(null, 'KFC', 'International', 10, 'kfc address', 0.14,'093000', '213000');
INSERT INTO Restaurant
VALUES(null, 'PizzaHut', 'Italian', 8, 'pizza hut address', 0.16,'100000', '220000');



insert into RestaurantDeliveryArea values ('Heliopolis', 3);
insert into RestaurantDeliveryArea values ('Heliopolis', 2);
insert into RestaurantDeliveryArea values ('Heliopolis', 1);
insert into RestaurantDeliveryArea values ('New Cairo',2);
insert into RestaurantDeliveryArea values ('Zamalek',1);
insert into RestaurantDeliveryArea values ('6th Of October',3);

insert into UserAddress values (null, 'johnuser', 'Heliopolis','address desc 1',null);
insert into UserAddress values (null, 'johnuser', 'Zamalek','address desc 2',null);
insert into UserAddress values (null, 'johnuser', 'New Cairo','address desc 3',null);
insert into UserAddress values (null, 'johnstaff', '6th of October','address desc 1',null);
insert into UserAddress values (null, 'johnstaff', 'Zamalek','address desc 2',null);
insert into UserAddress values (null, 'johnadmin', 'Heliopolis','address desc 1',null);
insert into UserAddress values (null, 'johnadmin', 'Zamalek','address desc 2',null);

-- McDonalds
insert into RestaurantMenu values ('Lunch', 1 , '083000', '223000');
insert into RestaurantMenu values ('Dinner', 1 , '193000', '203000');
insert into RestaurantMenu values ('Breakfast', 1 , '103000', '233000');
insert into RestaurantMenuItem values ('Breakfast', 1 , 'Omelettes', 15);
insert into RestaurantMenuItem values ('Lunch', 1 , 'BigMac', 30);
insert into RestaurantMenuItem values ('Lunch', 1 , 'BigTasty', 40);
insert into RestaurantMenuItem values ('Dinner', 1 , 'Pancakes', 20);
insert into RestaurantMenuItemConfig values ('Breakfast', 1 , 'Omelettes', 'Small');
insert into RestaurantMenuItemConfig values ('Breakfast', 1 , 'Omelettes', 'Regular');
insert into RestaurantMenuItemConfig values ('Breakfast', 1 , 'Omelettes', 'Large');
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigMac', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigTasty', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigMac', 'Combo - Small');
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigTasty', 'Combo - Large');
insert into RestaurantMenuItemConfig values ('Dinner', 1 , 'Pancakes', 'Regular');
insert into RestaurantMenuItemConfig values ('Dinner', 1 , 'Pancakes', 'Small');


-- KFC
insert into RestaurantMenu values ('Lunch', 2 , '113000', '223000');
insert into RestaurantMenu values ('Dinner', 2 , '133000', '223000');
insert into RestaurantMenu values ('Dessert', 2 , '183000', '203000');
insert into RestaurantMenuItem values ('Dinner', 2 , 'ChickenSalad', 25);
insert into RestaurantMenuItem values ('Lunch', 2 , 'Nuggets', 15);
insert into RestaurantMenuItem values ('Lunch', 2 , 'ChickenPanne', 30);
insert into RestaurantMenuItem values ('Lunch', 2 , 'CrispyChicken', 35);
insert into RestaurantMenuItem values ('Dessert', 2 , 'CheeseCake', 20);
insert into RestaurantMenuItemConfig values ('Dinner', 2 , 'ChickenSalad', 'Small');
insert into RestaurantMenuItemConfig values ('Dinner', 2 , 'ChickenSalad', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 2 , 'Nuggets', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 2 , 'ChickenPanne', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 2 , 'ChickenPanne', 'Combo - Small');
insert into RestaurantMenuItemConfig values ('Lunch', 2 , 'CrispyChicken', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 2 , 'CrispyChicken', 'Combo - Large');
insert into RestaurantMenuItemConfig values ('Dessert', 2 , 'CheeseCake', 'Regular');
insert into RestaurantMenuItemConfig values ('Dessert', 2 , 'CheeseCake', 'Small');


-- Pizza Hut
insert into RestaurantMenu values ('Lunch', 3 , '113000', '213000');
insert into RestaurantMenu values ('Dinner', 3 , '133000', '233000');
insert into RestaurantMenu values ('Dessert', 3 , '183000', '203000');
insert into RestaurantMenuItem values ('Dinner', 3 , 'ChickenWings', 25);
insert into RestaurantMenuItem values ('Lunch', 3 , 'PepperoniPizza', 45);
insert into RestaurantMenuItem values ('Lunch', 3 , 'SeafoodPizza', 60);
insert into RestaurantMenuItem values ('Lunch', 3 , 'MargueritaPizza', 35);
insert into RestaurantMenuItem values ('Dessert', 3 , 'CinabbonBites', 25);
insert into RestaurantMenuItemConfig values ('Dinner', 3 , 'ChickenWings', 'Small');
insert into RestaurantMenuItemConfig values ('Dinner', 3 , 'ChickenWings', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 3 , 'PepperoniPizza', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 3 , 'PepperoniPizza', 'Large');
insert into RestaurantMenuItemConfig values ('Lunch', 3 , 'MargueritaPizza', 'Large');
insert into RestaurantMenuItemConfig values ('Lunch', 3 , 'MargueritaPizza', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 3 , 'SeafoodPizza', 'Large');
insert into RestaurantMenuItemConfig values ('Dessert', 3 , 'CinabbonBites', 'Regular');
insert into RestaurantMenuItemConfig values ('Dessert', 3 , 'CinabbonBites', 'Small');



insert into Discount values(10,'2020-02-02',0.1); 
insert into Discount values(5,'2020-02-02',0.2); 
