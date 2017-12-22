'''
Created on Nov 9, 2017

@author: Bilva
'''
import sqlite3
import sqlCommands

conn = sqlite3.connect('FoodPal.db')
c = conn.cursor()

c.execute(myCaloriesSum)
c.execute(myCarbsSum)
c.execute(myProteinSum)
c.execute(myFatSum)
c.execute(mySpentAtRestaurant)
c.execute(avgPriceRestaurants)
c.execute(lowCalFoodOptions)
c.execute(highProteinFoodOptions)
c.execute(mealReplacement)

myCaloriesSum = """
			SELECT People.dukeCardNumber, SUM(Food.calories)
			FROM FoodLog, People, Food
			WHERE FoodLog.dukeCardNumber = People.dukeCardNumber
			AND FoodLog.foodName=Food.name
			"""

myCarbsSum = """
			SELECT People.dukeCardNumber, SUM(Food.carbs)
			FROM FoodLog, People, Food
			WHERE FoodLog.dukeCardNumber = People.dukeCardNumber
			AND FoodLog.foodName=Food.name
			"""

myProteinSum = """
			SELECT People.dukeCardNumber, SUM(Food.protein)
			FROM FoodLog, People, Food
			WHERE FoodLog.dukeCardNumber = People.dukeCardNumber
			AND FoodLog.foodName=Food.name
			"""

myFatSum = """
			SELECT People.dukeCardNumber, SUM(Food.fat)
			FROM FoodLog, People, Food
			WHERE FoodLog.dukeCardNumber = People.dukeCardNumber
			AND FoodLog.foodName=Food.name
			"""

mySpentAtRestaurant = """
					SELECT People.dukeCardNumber, FoodLog.vendorName, SUM(Food.price)
					FROM FoodLog, People, Food
					WHERE FoodLog.dukeCardNumber = People.dukeCardNumber
					AND FoodLog.foodName=Food.name
					AND FoodLog.vendorName=Food.vendorName
					"""

avgPriceRestaurants = """
					SELECT vendorName, AVG(price)
					FROM FOOD
					GROUP BY vendorName
					"""

lowCalFoodOptions = """
					SELECT name, vendorName, calories
					FROM FOOD
					ORDER BY calories ASC
					"""

highProteinFoodOptions = """
						SELECT name, vendorName, protein
						FROM FOOD
						ORDER BY protein DESC
						"""

mealReplacement = """
				SELECT name, vendorName
				FROM FOOD
				WHERE price < 7.0 
				AND calories > 500 AND protein > 10
				"""



