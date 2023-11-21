query = """
SELECT tweet.Reported_Date, country.Country_id, AVG(Sadness_Intensity) AS Sadness_Avg, AVG(Joy_Intensity) AS Joy_Avg, AVG(Fear_Intensity) AS Fear_Avg, AVG(Anger_Intensity) AS Anger_Avg
FROM LIMAP.country country, LIMAP.tweet tweet
WHERE country.country_id = tweet.country_id
GROUP BY country.country_id, tweet.Reported_Date
ORDER BY country.country_id, tweet.Reported_Date
"""