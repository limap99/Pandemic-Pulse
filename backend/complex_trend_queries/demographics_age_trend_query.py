query = """
WITH DemographicsAgeCategory AS (
  SELECT
    Country_ID,
    CASE
      WHEN Mean_Age <= 40 THEN 'Low'
      ELSE 'High'
    END AS Mean_Age
  FROM LimaP.Country
),

EmotionalAverage AS (
  SELECT
    Reported_Date,
    Country_ID,
    AVG(Sadness_Intensity) AS Avg_Sadness,
    AVG(Joy_Intensity) AS Avg_Joy,
    AVG(Fear_Intensity) AS Avg_Fear,
    AVG(Anger_Intensity) AS Avg_Anger
  FROM Limap.Tweet
  GROUP BY Reported_Date, Country_ID
)

SELECT
  TRUNC(EmotionalAverage.Reported_Date, 'IW') AS week_start,
  DemographicsAgeCategory.Mean_Age,
  AVG(EmotionalAverage.Avg_Sadness) AS Sadness_Trend,
  AVG(EmotionalAverage.Avg_Joy) AS Joy_Trend,
  AVG(EmotionalAverage.Avg_Fear) AS Fear_Trend,
  AVG(EmotionalAverage.Avg_Anger) AS Anger_Trend
FROM EmotionalAverage
JOIN DemographicsAgeCategory ON EmotionalAverage.Country_ID = DemographicsAgeCategory.Country_ID
GROUP BY TRUNC(EmotionalAverage.Reported_Date, 'IW'), DemographicsAgeCategory.Mean_age
ORDER BY week_start, DemographicsAgeCategory.Mean_age
"""