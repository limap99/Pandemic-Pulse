query = """
WITH EmotionalAverage AS (
  SELECT
    Reported_Date,
    Country_ID,
    AVG(Sadness_Intensity) AS Avg_Sadness,
    AVG(Joy_Intensity) AS Avg_Joy,
    AVG(Fear_Intensity) AS Avg_Fear,
    AVG(Anger_Intensity) AS Avg_Anger
  FROM Tweet
  GROUP BY Reported_Date, Country_ID
)

SELECT
  EmotionalAverage.Reported_Date,
  Lockdown.Lockdown_Type,
  AVG(EmotionalAverage.Avg_Sadness) AS Sadness_Trend,
  AVG(EmotionalAverage.Avg_Joy) AS Joy_Trend,
  AVG(EmotionalAverage.Avg_Fear) AS Fear_Trend,
  AVG(EmotionalAverage.Avg_Anger) AS Anger_Trend
FROM EmotionalAverage
JOIN Lockdown ON EmotionalAverage.Country_ID = Lockdown.Country_ID
WHERE EmotionalAverage.Reported_Date >= Lockdown.Start_Date
GROUP BY EmotionalAverage.Reported_Date, Lockdown.Lockdown_Type
ORDER BY EmotionalAverage.Reported_Date, Lockdown.Lockdown_Type
"""
