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
    assert.expect(0);

    // var
})
