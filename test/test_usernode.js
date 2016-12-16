var userTest;
QUnit.module('usernode');

(function () {
    userTest = {
      className: 'testClass',
      name: 'testName',
      imgUrl: 'testImgUrl',
      links: [],
      birthDate: '31/11/1993',
      quote: 'testQuote'
    };

    var fixtureNode = document.getElementById('qunit-fixture');
    var userNode = generateUserInfoDiv(userTest);
    document.getElementsByTagName('body')[0].appendChild(userNode);
})();

QUnit.test('test creating user info node', function (assert) {
    assert.expect(1);

    var userNode = document.getElementById(userTest.name);

    assert.ok(userNode, 'Check if node id is user\'s name');
});

QUnit.test('test user name', function (assert) {
    assert.expect(3);

    var userNode = document.getElementById(userTest.name);
    var titleNode = userNode.getElementsByTagName('h3')[0];

    assert.ok(titleNode, 'Check if user name node exists');
    assert.equal(titleNode.textContent, userTest.name, 'Check if user name node contains user name');
    assert.ok(titleNode.classList.contains('user_info_name'), 'Check if user name node has correct class');
});

QUnit.test('test user age', function (assert) {
    assert.expect(3);

    var userNode = document.getElementById(userTest.name);
    var ageNode = userNode.getElementsByTagName('p')[0];

    assert.ok(ageNode, 'Check if user age node exists');
    assert.equal(ageNode.textContent, '23 ans', 'Check if user age node contains age');
    assert.ok(ageNode.classList.contains('user_info_age'), 'Check if user age node has correct class');
});

QUnit.test('test user quote', function (assert) {
    assert.expect(3);

    var userNode = document.getElementById(userTest.name);
    var quoteNode = userNode.getElementsByTagName('p')[1];

    assert.ok(quoteNode, 'Check if user quote node exists');
    assert.equal(quoteNode.textContent, '“testQuote”', 'Check if user quote node contains quote');
    assert.ok(quoteNode.classList.contains('user_info_quote'), 'Check if user quote node has correct class');
});
