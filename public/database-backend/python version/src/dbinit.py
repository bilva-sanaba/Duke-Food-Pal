'''
Created on Nov 9, 2017

@author: Bilva Sanaba
This initializes the database
Note: If a db already exists, you may need to delete it
'''
import sqlite3
import sqlCommands 

conn = sqlite3.connect('FoodPal.db')
c = conn.cursor()
# Create table
c.execute(sqlCommands.createPeople)
c.execute(sqlCommands.createVendor)
c.execute(sqlCommands.createTimesOpen)
c.execute(sqlCommands.createIsOpenAt)
c.execute(sqlCommands.createFood)
c.execute(sqlCommands.createIsAvailableAt)
c.execute(sqlCommands.createTransactions)
c.execute(sqlCommands.createFoodLog)
c.execute(sqlCommands.createLoginInfo)

conn.commit()
conn.close()