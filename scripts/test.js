const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('anchor click with href="#" does not throw', () => {
  const htmlPath = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {});
  const anchor = dom.window.document.querySelector('a[href="#"]');
  expect(anchor).not.toBeNull();

  expect(() => {
    const event = new dom.window.Event('click', { bubbles: true });
    anchor.dispatchEvent(event);
  }).not.toThrow();
});
