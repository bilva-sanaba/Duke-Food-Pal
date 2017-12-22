'''
@Author Alex

These are some dynamic queries that we can use to generate suggestions
based on users' parameters.

These are python functions that return strings that can be called using the
SQLite API (which takes commands in string form).
'''

# Returns a query (string) to find all vendors open between @startTime and @endTime
def openVendors(startTime, endTime):
    query = ("SELECT * FROM IsOpenAt" + " "
        + "WHERE (openTime <= " + startTime + " "
        + "AND closeTime >= " + endTime + ");")
    return query


# Returns a query (string) to find all foods that cost between @lowerBound and @upperBound
# Most of the time, @lowerBound will probably be $0.00 because you only care
# about find affordable food
def foodsByPrice(lowerBound, upperBound):
    query = ("SELECT * FROM Food" + " "
        + "WHERE (price >= " + str(lowerBound) + " "
        + "AND price <= " + str(upperBound) + ");")
    return query


# Returns a query (string) to find all foods that have the specified macronutrient profile
def foodsByMacronutrient(fatLowerBound, fatUpperBound, carbsLowerBound,
                        carbsUpperBound, proteinLowerBound, proteinUpperBound):
    query = ("SELECT * FROM Food" + " "
        + "WHERE (fat >= " + str(fatLowerBound) + " "
        + "AND fat <= " + str(fatUpperBound) + " "
        + "AND carbs >= " + str(carbsLowerBound) + " "
        + "AND carbs <= " + str(carbsUpperBound) + " "
        + "AND protein >= " + str(proteinLowerBound) + " "
        + "AND protein <= " + str(proteinUpperBound) + ");")
    return query
             

# Returns a query (string) to find all foods sold between @startTime and @endTime
def foodsByTime(startTime, endTime):
    query = ("SELECT * FROM IsAvailableAt" + " "
        + "WHERE (openTime <= " + startTime + " "
        + "AND closeTime >= " + endTime + ");")
    return query

    
# Use for testing
print(openVendors("12:01", "9:00"))
print(foodsByPrice(0.00, 9.99))
print(foodsByMacronutrient(0, 100, 100, 300, 0, 0))
print(foodsByTime("7:00", "8:00"))
