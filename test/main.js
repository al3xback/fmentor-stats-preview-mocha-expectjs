import expect from 'expect.js';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-stats-preview-mocha-expectjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a status list element with a class of 'card__stats-list'", () => {
		const cardStatListEl = document.querySelector('.card__stats-list');

		expect(cardStatListEl).to.be.ok();
	});

	it("should have a mark element contains word 'insights'", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardMarkEl = cardTitleEl.querySelector('mark');

		expect(cardMarkEl.textContent).to.equal('insights');
	});

	it('should not have an aside element', () => {
		const asideEl = document.querySelector('aside');

		expect(asideEl).to.not.be.ok();
	});
});
