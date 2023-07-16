import { AxiosInstance } from "axios";
import MockAdapter from 'axios-mock-adapter';

export default function mockAxios(axiosInstance: AxiosInstance){
  const mock = new MockAdapter(axiosInstance, {
    delayResponse: 1000,
    onNoMatch: "throwException" 
  });

  mock.onGet("/list_games").reply(200, [{ id: '21312', name: "Spider", cost: 200, category: 'Action' }]);

  return mock
}