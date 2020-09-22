import sleep from '@utils/sleep';
import spawn from '@utils/spawn';

import api from '@shared/services/api';

interface ICompany {
  cnpj: string;
}

async function runScraperForCompany(companyCnpj: string): Promise<void> {
  await spawn('yarn', [
    'workspace',
    '@scraper/siconv',
    'start',
    'run',
    companyCnpj,
    '--cache_key',
    '123456789',
    '--headless',
    // '--verbose',
  ]);
}

export default class Launcher {
  public async launch(): Promise<void> {
    const { data: companies } = await api.get<ICompany[]>('companies', {
      params: {
        page: 1,
        rowsPerPage: 8,
      },
    });

    let remainingCompanies = companies.map(company => company.cnpj);

    for (const company of companies) {
      if (company.cnpj.length !== 14 && company.cnpj.length !== 18) {
        return;
      }

      runScraperForCompany(company.cnpj).then(() => {
        remainingCompanies = remainingCompanies.filter(
          companyCnpj => companyCnpj !== company.cnpj,
        );

        if (remainingCompanies.length === 0) {
          return;
        }

        const remainingCount = `${remainingCompanies.length}/${companies.length}`;
        const formattedRemainingCompanies = remainingCompanies.join(', ');

        console.log(
          `Remaining (${remainingCount}): ${formattedRemainingCompanies}`,
        );
      });

      await sleep(5000);
    }
  }
}
