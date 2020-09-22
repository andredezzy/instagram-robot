import AppError from '@scraper/shared/errors/AppError';
import Browser from '@scraper/shared/modules/browser/infra/puppeteer/models/Browser';
import Page from '@scraper/shared/modules/browser/infra/puppeteer/models/Page';
import PuppeteerBrowserProvider from '@scraper/shared/modules/browser/providers/BrowserProvider/implementations/PuppeteerBrowserProvider';

import ExtractAgreementsListService from '@modules/agreements_list/services/ExtractAgreementsListService';
import OpenAgreementByIdService from '@modules/agreements_list/services/OpenAgreementByIdService';
import { By } from '@modules/search/dtos/ISearchDTO';
import SearchAgreementsService from '@modules/search/services/SearchAgreementsService';

import ExtractBankDataService from './ExtractBankDataService';

let puppeteerBrowserProvider: PuppeteerBrowserProvider;
let searchAgreements: SearchAgreementsService;
let extractAgreementsList: ExtractAgreementsListService;
let openAgreementById: OpenAgreementByIdService;
let extractBankData: ExtractBankDataService;

let browser: Browser;
let page: Page;

describe('ExtractBankData', () => {
  beforeAll(async () => {
    puppeteerBrowserProvider = new PuppeteerBrowserProvider();

    browser = await puppeteerBrowserProvider.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    searchAgreements = new SearchAgreementsService(page);
    extractAgreementsList = new ExtractAgreementsListService(page);
    openAgreementById = new OpenAgreementByIdService(page);
    extractBankData = new ExtractBankDataService(page);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should be able to extract bank data', async () => {
    await searchAgreements.execute({
      by: By.CNPJ,
      value: '12.198.693/0001-58',
    });

    const agreements = await extractAgreementsList.execute();

    const [{ agreement_id }] = agreements;

    await openAgreementById.execute({ agreement_id });

    const bankData = await extractBankData.execute();

    expect(bankData).toHaveProperty('bank');
    expect(bankData).toHaveProperty('agency');
    expect(bankData).toHaveProperty('account');
    expect(bankData).toHaveProperty('status');
    expect(bankData).toHaveProperty('description');
    expect(bankData).toHaveProperty('updated_at', expect.any(Date));
  });

  it('should not be able to extract bank data outside opened agreement page', async () => {
    await searchAgreements.execute({
      by: By.CNPJ,
      value: '12.198.693/0001-58',
    });

    await expect(extractBankData.execute()).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to extract bank data when opened agreement does not have this section', async () => {
    await searchAgreements.execute({
      by: By.CNPJ,
      value: '12.198.693/0001-58',
    });

    const agreements = await extractAgreementsList.execute();

    const [{ agreement_id }] = agreements;

    await openAgreementById.execute({ agreement_id });

    jest.spyOn(page, 'findElementsByText').mockImplementationOnce(async () => {
      return [];
    });

    const bankData = await extractBankData.execute();

    expect(bankData).toBeFalsy();
  });
});
