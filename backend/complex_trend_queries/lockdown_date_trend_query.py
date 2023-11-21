query = """
WITH LockdownCategory AS (
  SELECT
    Country_ID,
    CASE
      WHEN Start_Date <= to_date('15-Mar-20', 'DD-MON-YY') THEN 'Early'
      ELSE 'Late'
    END AS Lockdown_Status
  FROM Lockdown
),

EmotionalAverage AS (
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
  TRUNC(EmotionalAverage.Reported_Date, 'IW') AS week_start,
  LockdownCategory.Lockdown_Status,
  AVG(EmotionalAverage.Avg_Sadness) AS Sadness_Trend,
  AVG(EmotionalAverage.Avg_Joy) AS Joy_Trend,
  AVG(EmotionalAverage.Avg_Fear) AS Fear_Trend,
  AVG(EmotionalAverage.Avg_Anger) AS Anger_Trend
FROM EmotionalAverage
JOIN LockdownCategory ON EmotionalAverage.Country_ID = LockdownCategory.Country_ID
GROUP BY TRUNC(EmotionalAverage.Reported_Date, 'IW'), LockdownCategory.Lockdown_Status
ORDER BY week_start, LockdownCategory.Lockdown_Status


"""