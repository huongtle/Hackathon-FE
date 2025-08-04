import { GraphQLClient } from './client.service';
import { BaseResponseModel } from '../models/BaseResponseModel';

const GET_SEVERITIES = `
  query {
    severities{
        level,
        name,
        nameEn,
        description,
        descriptionEn
    }
  }
`;

export class SeverityService {
    static async getSymptoms() {
        try {
        const data = await GraphQLClient.request(GET_SEVERITIES);

        return new BaseResponseModel(true, data.severities || []);
        } catch (error) {
        return new BaseResponseModel(false, []);
        }
    }
}