import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { BeetrackRoute } from './typings/BeetrackRoute.type';
import { UpdateBeetrackRouteBody } from './typings/BeetrackRouteBody.type';
import * as nodeUrl from 'url';
import * as nodePath from 'path';

@Injectable()
export class BeetrackService {
  constructor(private readonly config: ConfigService) { }

  private readonly apiBeetrackUrl = this.config.get('externalServices.apiBeetrack')
  private readonly apiKeyBeetrack = this.config.get('externalServices.apiKeyBeetrack')

  async updateRoute(params: UpdateBeetrackRouteBody) {
    const beetrackUrl = new nodeUrl.URL(this.apiBeetrackUrl)
    beetrackUrl.pathname = nodePath.join(
      'api', 
      'external', 
      'v1',
      'routes', 
      params.route_id.toString())

    const urlString = beetrackUrl.toString()

    const routeResponse = await axios.put<BeetrackRoute>(urlString, JSON.stringify(params), {
      headers: { 'X-AUTH-TOKEN': this.apiKeyBeetrack, 'Content-Type': 'application/json' }
    });
    return routeResponse.data;
  }
};
