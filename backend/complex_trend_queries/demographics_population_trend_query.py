query = """
WITH DemographicsPopulationCategory AS (
  SELECT
    Country_ID,
    CASE
      WHEN Population <= 100000000 THEN 'Low'
      ELSE 'High'
    END AS Population
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
  DemographicsPopulationCategory.Population,
  AVG(EmotionalAverage.Avg_Sadness) AS Sadness_Trend,
  AVG(EmotionalAverage.Avg_Joy) AS Joy_Trend,
  AVG(EmotionalAverage.Avg_Fear) AS Fear_Trend,
  AVG(EmotionalAverage.Avg_Anger) AS Anger_Trend
FROM EmotionalAverage
JOIN DemographicsPopulationCategory ON EmotionalAverage.Country_ID = DemographicsPopulationCategory.Country_ID
GROUP BY TRUNC(EmotionalAverage.Reported_Date, 'IW'), DemographicsPopulationCategory.Population
ORDER BY week_start, DemographicsPopulationCategory.Population
"""