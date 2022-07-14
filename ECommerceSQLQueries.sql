CREATE DATABASE ECommerce

USE ECommerce

select * from Orders
select * from OrderItems
select * from UserAddresses
--delete from Users where UserID=1001
-- Product Related Tables

CREATE TABLE Suppliers(
	SupplierID int IDENTITY(10,1) PRIMARY KEY,
	SupplierName varchar(50),
	SLocation nvarchar(max)
)


CREATE TABLE Products(
	ProductID int IDENTITY(100,1) Primary key,
	ProductName nvarchar(MAX),
	ImageUrl nvarchar(MAX),
	PDescription nvarchar(max),
	Category nvarchar(max),
	Price float,
	active varchar(10),
	CreatedOn datetime,
	ModifiedOn datetime,
)

CREATE TABLE Storage(
	StorageID int IDENTITY(10,1) PRIMARY KEY,
	StorageName varchar(50),
	SupplierID int FOREIGN KEY REFERENCES Suppliers(SupplierID),
	ProductID int foreign key references Products(ProductID),
	Quantity int  
)


CREATE TABLE Offers(
	OfferID int IDENTITY(100,1) PRIMARY KEY,
	OfferName varchar(50),
	OfferDescription nvarchar(max) ,
	ProductID int FOREIGN KEY REFERENCES Products(ProductID),
	DiscountPercentage int,
	DiscountAmount float,
	IsActive bit,
	CreatedOn datetime,
	ModifiedOn datetime,
	IsDeleted bit,
	DeletedOn datetime
) 


-- User Related Tables
CREATE TABLE Users(
	UserID int IDENTITY(1000,1) PRIMARY KEY,
	FirstName nvarchar(50),
	LastName nvarchar(50),
	MailID varchar(50),
	Mobile nvarchar(10),
	Password nvarchar(max),
	CreatedOn datetime,
	IsActive bit,
	IsDeleted bit,
	DeletedOn datetime,
	ModifiedOn datetime,
	IsLoggedIn bit,
	LastLoggedIn datetime,
	WantAlerts bit
)


Create table UserAddresses(
	Id int primary key IDENTITY(1,1),
	UserID int FOREIGN KEY REFERENCES Users(UserID),
	AddressLine1 nvarchar(50),
	AddressLine2 nvarchar(50),
	City nvarchar(50),
	PostalCode nvarchar(50),
	Country nvarchar(50),
	Mobile nvarchar(50),
	MailID nvarchar(50),
	ContactPerson varchar(50)
)

-- Orders & Cart Related Tables

Create table Cart(
	Id int IDENTITY(1,1) primary key,
	UserID int FOREIGN KEY REFERENCES Users(UserID),
	ProductID int FOREIGN KEY REFERENCES Products(ProductID),
	ProductName nvarchar(MAX),
	Price float,
	Quantity int,
	SubTotal float,
	IsSelectedForOrder bit,
	OfferID int FOREIGN KEY REFERENCES Offers(OfferID)
)

CREATE TABLE Orders(
	OrderID bigint IDENTITY(45987322, 11) PRIMARY KEY,
	UserID int FOREIGN KEY REFERENCES Users(UserID),
	DistinctItems int,
	TotalAmount float,
	PaymentType varchar(100),
	PaymentID nvarchar(max),
	OfferID int FOREIGN KEY REFERENCES Offers(OfferID),
	OrderedOn datetime,
	IsCancelled bit,
	DeliveryAddress int FOREIGN KEY REFERENCES UserAddresses(Id),
	DeliveryDate date,
	OrderStatus varchar(20) 
)

CREATE TABLE OrderItems(
	Id int primary key IDENTITY(1,1),
	OrderID bigint FOREIGN KEY REFERENCES Orders(OrderID),
	ProductID int FOREIGN KEY REFERENCES Products(ProductID),
	ProductName nvarchar(MAX),
	Price float,
	Quantity int,
	SubTotal float,
	OfferID int FOREIGN KEY REFERENCES Offers(OfferID),
	IsReturned bit,
	ReturnedOn datetime
)

CREATE TABLE PaymentDetails(
	PaymentID bigint IDENTITY(10000,1) PRIMARY KEY,
	Amount float,
	[Provider] varchar(50),
	PaymentStatus bit,
	IsPending bit,
	CreatedOn datetime,
	Reason nvarchar(50) 
)


-- Miscellaneous Tables

CREATE TABLE Ratings(
	Id int identity(1,1) primary key,
	ProductID int FOREIGN KEY REFERENCES Products(ProductID),
	Rating int,
	UserID int FOREIGN KEY REFERENCES Users(UserID),
	Review nvarchar(max) 
)


--Create table Advertisements(
--	AdsID int identity(1,1) primary key,
--	AdName nvarchar(max),
--	AdDescription nvarchar(max),
--	AdImageUrl nvarchar(max),
--	ProductID int foreign key references Products(ProductID)
--)

--Create table WishList(
--	Id int identity(1,1) primary key,
--	ProductID int foreign key references Products(ProductID),
--	UserID int FOREIGN KEY REFERENCES Users(UserID)  
--)

--create table Notifications(
--	Id int IDENTITY(1,1) primary key,
--	UserID int FOREIGN KEY REFERENCES Users(UserID),
--	Title varchar(200),
--	Body varchar(1000)
--)

--create table Questions(
--	QID int identity(1,1) primary key,
--	UserID int FOREIGN KEY REFERENCES Users(UserID),
--	ProductID int foreign key references Products(ProductID),
--	Question nvarchar(max),
--	Answer nvarchar(max)
--)

