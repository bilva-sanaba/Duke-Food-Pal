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
                print(statement)
                db.execute(statement)
        f.close() 
    
fillTable(c,"Vendor","Vendor.csv") 
fillTable(c,"TimesOpen","TimesOpen.csv") 
fillTable(c,"isOpenAt","isOpenAt.csv")  
fillTable(c,"Food","Food.csv")    
fillTable(c,"isAvailableAt","isAvailableAt.csv") 

   
conn.commit()
conn.close()


