tweet_query = """
SELECT * FROM TWEET
"""

country_query = """
SELECT * FROM COUNTRY
"""

lockdown_query = """
SELECT * FROM LOCKDOWN
"""

vaccination_query = """
SELECT * FROM VACCINATION
ORDER BY REPORTED_DATE
"""

covid_cases_query = """
SELECT * FROM COVID_CASES
ORDER BY REPORTED_DATE
"""

count_query = """
select
    (select count(*) from tweet) AS tweet_count,
    (select count(*) from vaccination) AS vaccination_count,
    (select count(*) from lockdown) AS lockdown_count,
    (select count(*) from country) AS country_count,
    (select count(*) from covid_cases) AS covid_cases_count
from country
FETCH FIRST 1 ROWS ONLY

"""