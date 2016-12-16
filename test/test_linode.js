var userTest;
QUnit.module('linode');

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
    var linode = generateLi(userTest);
    document.getElementsByTagName('body')[0].appendChild(linode);
})();

QUnit.test('test creating user node', function (assert) {
    assert.expect(1);

    var liNode = document.getElementById('list_users_testName');

    assert.ok(liNode, 'Check if node id is user\'s name');
});

QUnit.test('test user name', function (assert) {
    assert.expect(3);

    var liNode = document.getElementById('list_users_testName');
    var titleNode = liNode.getElementsByTagName('h4')[0];

    assert.ok(titleNode, 'Check if user name node exists');
    assert.equal(titleNode.textContent, userTest.name, 'Check if user name node contains user name');
    assert.ok(titleNode.classList.contains('list_users_name'), 'Check if user name node has correct class');
});
