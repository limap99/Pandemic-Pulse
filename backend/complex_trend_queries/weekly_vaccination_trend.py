query = """
WITH EmotionalAverage AS (
  SELECT
    TRUNC(Reported_Date, 'IW') AS Reported_Week,
    Country_ID,
    AVG(Sadness_Intensity) AS Avg_Sadness,
    AVG(Joy_Intensity) AS Avg_Joy,
    AVG(Fear_Intensity) AS Avg_Fear,
    AVG(Anger_Intensity) AS Avg_Anger
  FROM LIMAP.Tweet
  GROUP BY TRUNC(Reported_Date, 'IW'), Country_ID
  ORDER BY Country_ID, Reported_Week
),

WeeklyVaccination AS (
    SELECT
      TRUNC(Vaccination.Reported_Date, 'IW') AS Reported_Week,
      Vaccination.country_id AS country_id,
      SUM(Vaccination.Total_Doses_Administered ) AS Total_Doses_Administered
    FROM LIMAP.Vaccination where country_id = 'USA'
    GROUP BY TRUNC(Vaccination.Reported_Date, 'IW'), Vaccination.Country_ID
    ORDER BY Reported_Week
),

VaccinationAndEmotion AS (
    SELECT
      EmotionalAverage.Reported_Week,
      EmotionalAverage.country_id,
      WeeklyVaccination.Total_doses_administered,
      EmotionalAverage.Avg_Sadness AS Sadness_Trend,
      EmotionalAverage.Avg_Joy AS Joy_Trend,
      EmotionalAverage.Avg_Fear AS Fear_Trend,
      EmotionalAverage.Avg_Anger AS Anger_Trend
    FROM EmotionalAverage
    JOIN WeeklyVaccination ON (EmotionalAverage.Country_ID = WeeklyVaccination.Country_ID AND EmotionalAverage.Reported_Week = WeeklyVaccination.Reported_Week)
)

SELECT * FROM VaccinationAndEmotion
"""
