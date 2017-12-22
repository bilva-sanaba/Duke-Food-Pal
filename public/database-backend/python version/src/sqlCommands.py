'''
Created on Nov 9, 2017

@author: Bilva Sanaba
This is a resource file for sql commands
'''

createPeople = """
                CREATE TABLE People
                (username VARCHAR NOT NULL PRIMARY KEY,
                password VARCHAR(30) NOT NULL,  
                netId VARCHAR(10) NOT NULL UNIQUE,
                firstname VARCHAR(30) NOT NULL, 
                lastname VARCHAR(30) NOT NULL,
                mealPlan CHAR(1) NOT NULL, 
                CHECK(mealPlan = 'A' OR mealPlan = 'B' OR mealPlan = 'C' OR mealPlan = 'D' 
                    OR mealPlan = 'E' OR mealPlan = 'F' OR mealPlan = 'H' OR mealPlan = 'I' OR 
                    mealPlan = 'J') 
                )
                """

  
createVendor = """
                CREATE TABLE Vendor  
                (name VARCHAR(30) NOT NULL PRIMARY KEY 
                )
              """

createTimesOpen = """
                    CREATE TABLE TimesOpen
                    (day VARCHAR(9) NOT NULL,  
                    openTime TIME NOT NULL,    
                    closeTime TIME NOT NULL,   
                    PRIMARY KEY (day, openTime, closeTime) 
                    )
                """

createIsOpenAt = """
                    CREATE TABLE IsOpenAt 
                    (vendorName VARCHAR(30) NOT NULL, 
                    day VARCHAR(9) NOT NULL, 
                    openTime TIME NOT NULL, 
                    closeTime TIME NOT NULL, 
                    PRIMARY KEY(vendorName, day, openTime, closeTime), 
                    FOREIGN KEY(vendorName) REFERENCES Vendor(name), 
                    FOREIGN KEY(openTime,closeTime,day) REFERENCES TimesOpen(openTime,closeTime,day) 
                    )
                    """


createFood = """   
                CREATE TABLE Food 
                (name VARCHAR(45) NOT NULL, 
                vendorName VARCHAR(30) NOT NULL, 
                price FLOAT NOT NULL, 
                calories INTEGER, 
                carbs INTEGER, 
                protein INTEGER, 
                fat FLOAT, 
                PRIMARY KEY(name, vendorName), 
                FOREIGN KEY(vendorName) REFERENCES Vendor(name) 
                )
            """




createIsAvailableAt = """
                          CREATE TABLE IsAvailableAt 
                          (foodName VARCHAR(45) NOT NULL, 
                          vendorName VARCHAR(30) NOT NULL,
                          day VARCHAR(9) NOT NULL,
                          openTime TIME NOT NULL, 
                          closeTime TIME NOT NULL, 
                          PRIMARY KEY (foodName, vendorName, day, openTime, closeTime), 
                          FOREIGN KEY(foodName,vendorName) REFERENCES Food(name,vendorName), 
                          FOREIGN KEY(openTime,closeTime,day) REFERENCES TimesOpen(openTime,closeTime,day) 
                          )
                        """


createTransactions = """
                        CREATE TABLE Transactions 
                        (username INTEGER NOT NULL, 
                        vendorName VARCHAR(30) NOT NULL, 
                        timestamp TIMESTAMP NOT NULL, 
                        price FLOAT NOT NULL, 
                        PRIMARY KEY (username, timestamp), 
                        FOREIGN KEY(username) REFERENCES People(username), 
                        FOREIGN KEY(vendorName) REFERENCES Vendor(name)   
                        )
                    """



createFoodLog =     """
                        CREATE TABLE FoodLog   
                        (username VARCHAR NOT NULL, 
                        timestamp TIMESTAMP NOT NULL, 
                        quantity FLOAT NOT NULL, 
                        foodName VARCHAR(45) NOT NULL, 
                        vendorName VARCHAR(30) NOT NULL, 
                        PRIMARY KEY(username, timestamp, foodName, vendorName), 
                        FOREIGN KEY(username) REFERENCES People(username), 
                        FOREIGN KEY(foodName,vendorName) REFERENCES Food(name,vendorName) 
                        )
                    """






