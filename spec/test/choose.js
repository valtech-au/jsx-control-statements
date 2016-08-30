var chai = require('chai');
var spies = require('chai-spies');
var util = require('../testUtil');

chai.use(spies);
var expect = chai.expect;


describe('requiring in component with empty when', function() {
  var Fixture = require('../fixtures/choose/choose-empty.jsx');

  it('should render nothing when condition true, but when is empty', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchEmptyDiv());
  });

});

describe('requiring in component with choose', function () {
  var Fixture = require('../fixtures/choose/choose.jsx');

  it('should render first when block when condition true', function () {
    var rendered = util.render(Fixture, {when1: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock1'));
  });

  it('should render first when block when both conditions true', function () {
    var rendered = util.render(Fixture, {when1: true, when2: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock1'));
  });

  it('should render second when block when condition true', function () {
    var rendered = util.render(Fixture, {when2: true});
    expect(rendered).to.match(util.matchTextWithinSpanWithinDiv('WhenBlock2'));
  });

  it('should render nothing when condition false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchEmptyDiv());
  });

});

describe('requiring in component with choose/otherwise', function () {
  var Fixture = require('../fixtures/choose/choose-with-otherwise.jsx');

  it('should render choose block when condition true', function () {
    var rendered = util.render(Fixture, { when1: true });
    expect(rendered).to.match(util.matchTextWithinSpan('WhenBlock1'));
  });

  it('should render else block when condition false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchTextWithinSpan('OtherwiseBlock'));
  });
});

describe('requiring in component with nested choose', function () {
  var Fixture = require('../fixtures/choose/nested-choose.jsx');
  var consoleSpy = chai.spy.on(console, 'error');

  it('should render when-when block when both conditions true', function () {
    var rendered = util.render(Fixture, {outerWhen: true, innerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpansWithinDiv('test', 'When-When'));
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should render when-otherwise block when outer condition true, inner false', function () {
    var rendered = util.render(Fixture, {outerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpansWithinDiv('test', 'When-Otherwise'));
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should render otherwise-when block when outer condition false, inner true', function () {
    var rendered = util.render(Fixture, {innerWhen: true});
    expect(rendered).to.match(util.matchTextWithinSpansWithinDiv('test', 'Otherwise-When'));
    expect(consoleSpy).to.not.have.been.called();
  });

  it('should render otherwise-otherwise block when both conditions false', function () {
    var rendered = util.render(Fixture);
    expect(rendered).to.match(util.matchTextWithinSpansWithinDiv('test', 'Otherwise-Otherwise'));
    expect(consoleSpy).to.not.have.been.called();
  });
});