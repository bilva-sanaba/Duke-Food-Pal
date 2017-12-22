'''
Created on Dec 3, 2017

@author: Ryan
'''

import sqlite3
import sqlCommands

conn = sqlite3.connect('FoodPal.db')
c = conn.cursor()

'''
Intput: Username and password, return true or false if it exists
'''
loginStatus = 
			"EXISTS (SELECT * FROM People WHERE username = " + user + ") "
			
'''
Input: Username, return if it exists already (if no, then store password)
'''
createStatus = 
			"IF NOT EXISTS (SELECT * FROM People WHERE username = " + user + ") " +
			"BEGIN " + 
			"" + 
			"END"
