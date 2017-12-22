'''
Created on Nov 9, 2017

@author: Bilva
'''
import csv
import sqlite3

conn = sqlite3.connect('FoodPal')
c = conn.cursor()

def formatInsert(tableName,array):
    statement = "INSERT INTO " + tableName +" VALUES ('"  
    endStatement = "')"
    for value in array:
        statement=statement+value+"','"
    statement=statement[:-3]
    statement=statement + endStatement
    return statement
def fillTable(db,tableName,data):
    with open(data, "r") as f:
        reader = csv.reader(f)
        first = True
        for row in reader:
            if (first):
                first=False
            else:   
                statement = formatInsert(tableName,row)
                db.execute(statement)
        f.close() 
    
fillTable(c,"Vendor","vendor.csv") 
fillTable(c,"TimesOpen","resources\\TimesOpen.csv") 
fillTable(c,"isOpenAt","resources\\isOpenAt.csv")  
fillTable(c,"Food","resources\\Food.csv")    
fillTable(c,"isAvailableAt","resources\\isAvailableAt.csv") 

   
conn.commit()
conn.close()


