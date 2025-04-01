function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
// console.log(counter()); // Output: 1
// console.log(counter()); // Output: 2
// console.log(counter()); // Output: 3

module.exports = { createCounter };

UPDATE tbl_influencer_masters AS t
JOIN temp_influencer_data AS temp ON t.mobile_no = temp.mobile_no
SET t.application_meta = CASE
    -- If application_meta is NULL and first_login_date exists in temp, initialize it with first_login_date
    WHEN t.application_meta IS NULL AND temp.first_login_date IS NOT NULL THEN
        JSON_OBJECT('first_login_date', temp.first_login_date)
    -- If application_meta is a blank object and first_login_date exists in temp, add first_login_date
    WHEN t.application_meta = '{}' AND temp.first_login_date IS NOT NULL THEN
        JSON_SET(t.application_meta, '$.first_login_date', temp.first_login_date)
    -- If application_meta exists, contains first_login_date with a NULL value, and first_login_date exists in temp, update the NULL value
    WHEN JSON_EXTRACT(t.application_meta, '$.first_login_date') IS NULL AND temp.first_login_date IS NOT NULL THEN
        JSON_SET(t.application_meta, '$.first_login_date', temp.first_login_date)
    -- If application_meta exists, does not contain first_login_date, and first_login_date exists in temp, add the key with the new value
    WHEN JSON_EXTRACT(t.application_meta, '$.first_login_date') IS NULL AND temp.first_login_date IS NOT NULL THEN
        JSON_SET(t.application_meta, '$.first_login_date', temp.first_login_date)
    -- Otherwise, keep application_meta unchanged
    ELSE t.application_meta
END
WHERE temp.first_login_date IS NOT NULL;
