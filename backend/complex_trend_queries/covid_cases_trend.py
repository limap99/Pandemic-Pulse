query = """
WITH EmotionalAverage AS (
  SELECT
    Reported_Date,
    Country_ID,
    AVG(Sadness_Intensity) AS Avg_Sadness,
    AVG(Joy_Intensity) AS Avg_Joy,
    AVG(Fear_Intensity) AS Avg_Fear,
    AVG(Anger_Intensity) AS Avg_Anger
  FROM LIMAP.Tweet
  GROUP BY Reported_Date, Country_ID
  ORDER BY Country_ID, Reported_Date
)
,
EmotionalAverageDelta AS(
    SELECT t2.Reported_Date, t2.Country_ID, 
        t2.Avg_Sadness - t1.Avg_Sadness AS Sadness_Delta,
        t2.Avg_Joy - t1.Avg_Joy AS Joy_Delta,
        t2.Avg_Fear - t1.Avg_Fear AS Fear_Delta,
        t2.Avg_Anger - t1.Avg_Anger AS Anger_Delta
    FROM LIMAP.EmotionalAverage t1
    JOIN LIMAP.EmotionalAverage t2 ON (t1.Country_ID = t2.Country_ID AND t1.Reported_Date + 1 = t2.Reported_Date)
)
,
CovidCasesDelta AS(
    SELECT t2.Reported_Date, t2.Country_ID, t2.Confirmed_Cases - t1.Confirmed_Cases AS Cases_Delta
    FROM LIMAP.Covid_Cases t1
    JOIN LIMAP.Covid_Cases t2 ON (t1.Country_ID = t2.Country_ID AND t1.Reported_Date + 1 = t2.Reported_Date)
)

SELECT TRUNC(ead.Reported_Date, 'IW') AS week_start
, ead.Country_ID, SUM(ead.Sadness_Delta), SUM(ead.Joy_Delta), SUM(ead.Fear_Delta), SUM(ead.Anger_Delta), SUM(ccd.Cases_Delta)
FROM EmotionalAverageDelta ead
JOIN CovidCasesDelta ccd ON (ead.Reported_Date = ccd.Reported_Date AND ead.Country_ID = ccd.Country_ID)
GROUP BY TRUNC(ead.Reported_Date, 'IW'), ead.Country_ID
ORDER BY ead.Country_ID, TRUNC(ead.Reported_Date, 'IW')


"""
