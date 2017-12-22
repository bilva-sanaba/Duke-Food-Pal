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
    with open(data, "r",encoding="utf8") as f:
        reader = csv.reader(f)
        data = [row for row in csv.reader(f.read().splitlines())]
        first = True
        for row in data:
            if (first):
                first=False
            else:   
                statement = formatInsert(tableName,row)
                print(statement)
                db.execute(statement)
        f.close() 
    
fillTable(c,"Vendor","vendor.csv") 
fillTable(c,"TimesOpen","TimesOpen.csv") 
fillTable(c,"isOpenAt","isOpenAt.csv")  
fillTable(c,"Food","Food.csv")    
fillTable(c,"isAvailableAt","isAvailableAt.csv") 
fillTable(c,"FoodLog","foodlog.csv") 

   
conn.commit()
conn.close()


