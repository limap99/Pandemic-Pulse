query = """
SELECT 
    (SELECT COUNT(*) FROM TWEET) AS tweet_count,
    (SELECT COUNT(*) FROM TWEET where country_id = 'BRA') AS per_country_tweet_count,
    (SELECT COUNT(*) FROM Country) AS country_count,
    (SELECT COUNT(*) FROM VACCINATION) AS total_vaccination_count,
    (SELECT COUNT(*) FROM VACCINATION where country_id = 'BRA') AS per_country_vaccination_count,
    (SELECT COUNT(*) FROM COVID_CASES) AS covid_cases_count,
    (SELECT COUNT(*) FROM COVID_CASES where country_id = 'BRA') AS per_country_covid_cases_count
FROM COUNTRY


"""