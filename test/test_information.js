QUnit.module('information', {

});

QUnit.test('test_formatDate', function (assert) {
    assert.expect(9);

    var date = getCurrentDate();
    assert.equal('string', typeof(date));

    var elements = date.split('/');
    assert.equal(3, elements.length);

    var day, month, year,
        dayStr, monthStr, yearStr;

    dayStr = elements[0];
    monthStr = elements[1];
    yearStr = elements[2];

    day = parseInt(dayStr);
    month = parseInt(monthStr);
    year = parseInt(yearStr);

    // Checks if a zero is displayed when needed
    assert.ok(day > 9 || dayStr.indexOf('0') != -1, 'Zero expected in day if lesser than 10');
    assert.ok(month > 9 || monthStr.indexOf('0') != -1, 'Zero expected in month if lesser than 10');

    assert.ok(day > 0, 'Day should not be lesser than 1 (value=' + day + ')');
    assert.ok(day < 32, 'Day should not be greater than 31 (value=' + day + ')');
    assert.ok(month > 0, 'Month should not be lesser than 1 (value=' + month + ')');
    assert.ok(month < 13, 'Month should not be greater than 12 (value=' + month + ')');
    assert.ok(year > 2015, 'Unless you can travel back in time, the year is should be greater than 2015 (value=' + year + ')');
});

QUnit.test('test_calculateAge', function (assert) {
    assert.expect(5);
    var currentDate, birthDate1, birthDate2, birthDate3, birthDate4, birthDate5;

    currentDate = '16/11/2016';
    birthDate1 = '1/10/1993';
    birthDate2 = '1/11/1993';
    birthDate3 = '16/11/1993';
    birthDate4 = '17/11/1993';
    birthDate5 = '7/12/1993';

    assert.equal(calculateAge(birthDate1, currentDate), 23, 'Month before current date');
    assert.equal(calculateAge(birthDate2, currentDate), 23, 'Same month, but before current day');
    assert.equal(calculateAge(birthDate3, currentDate), 23, 'Same date as current date');
    assert.equal(calculateAge(birthDate4, currentDate), 22, 'Same month, but after current day');
    assert.equal(calculateAge(birthDate4, currentDate), 22, 'Month after current date');
})
