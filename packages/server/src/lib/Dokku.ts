import axios from 'axios';

interface IResponse {
  result_data: { ok: boolean; output: string };
}

export class Dokku {
  apiKey = process.env.DOKKU_API_KEY;
  apiSecret = process.env.DOKKU_API_SECRET;
  env = process.env.NODE_ENV;
  axios = axios.create({
    baseURL: 'http://134.122.123.191/',
    headers: { 'Content-Type': 'application/vnd.api+json' },
  });

  async addDomain(domain: string): Promise<boolean> {
    const addGlobalDomainResponse = await this.axios.post<IResponse>(
      '/commands',
      { cmd: `domains:add-global ${domain}` },
    );

    if (addGlobalDomainResponse.data.result_data.ok) {
      const addDomainResponse = await this.axios.post<IResponse>('/commands', {
        cmd: `domains:add edgsh ${domain}`,
      });

      if (addDomainResponse.data.result_data.ok) {
        const letsencryptResponse = await this.axios.post<IResponse>(
          '/commands',
          { cmd: 'letsencrypt edgsh' },
        );

        return letsencryptResponse.data.result_data.ok;
      }

      return false;
    }

    return false;
  }
}
