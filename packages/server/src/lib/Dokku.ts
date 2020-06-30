import axios from 'axios';

interface IResponse {
  result_data: { ok: boolean; output: string };
}

export class Dokku {
  axios = axios.create({
    baseURL: 'https://dokku.edg.sh',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Api-Key': process.env.DOKKU_API_KEY,
      'Api-Secret': process.env.DOKKU_API_SECRET,
    },
  });

  async addDomain(domainWithProtocol: string): Promise<boolean> {
    const domain = domainWithProtocol
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .split('/')[0];

    try {
      const addGlobalDomainResponse = await this.axios.post<IResponse>(
        'commands',
        `sync=true&cmd=domains:add-global ${domain}`,
      );

      if (addGlobalDomainResponse.data.result_data.ok) {
        const addDomainResponse = await this.axios.post<IResponse>(
          '/commands',
          `sync=true&cmd=domains:add edgsh ${domain}`,
        );

        if (addDomainResponse.data.result_data.ok) {
          const letsencryptResponse = await this.axios.post<IResponse>(
            '/commands',
            `sync=true&cmd=letsencrypt edgsh`,
          );

          return letsencryptResponse.data.result_data.ok;
        }

        return false;
      }

      return false;
    } catch (e) {
      return false;
    }
  }
}
