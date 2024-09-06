import { Controller, Get, Param, Query, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LivegameResponse, LivegameService } from './livegame.service';
import { catchError, map, of } from 'rxjs';
import { Response } from 'express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { isApex, Rank } from './average-rank-calculator';


export enum ResponseType {
  JSON = 'json',
  NIGHTBOT = 'nightbot',
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly livegameService: LivegameService,

  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('by-summoner/:region/:summonerName')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 5 * 1000)
  getLivegameBySummoner(
    @Param('region') region: string,
    @Param('summonerName') summonerName: string,
    @Query('type') type: ResponseType = ResponseType.JSON,
    @Query('with_self') filterOwn: boolean = false,
    @Res() res: Response
  ) {
    this.livegameService.getLivegameInfoBySummoner(region, summonerName).pipe(
      catchError(err => { return of({ error: err }) }),
      map(it => {
        return livegameToResponse(it, type)
      })).subscribe(it => {
        res.send(it)
      })

    if (type === ResponseType.JSON) {
    } else if (type === ResponseType.NIGHTBOT) {
      // TODO: Steal code from somewhere 
    }

  }

  @CacheTTL(60 * 5 * 1000)
  @Get('by-streamer/:streamer')
  getLivegameByStreamer(
    @Param('streamer') streamerName: string,
    @Query('type') type: ResponseType,
    @Query('with_self') filterOwn: boolean = false,
  ) {


  }

  @CacheTTL(60 * 5 * 1000)
  @Get('by-pro/:streamer')
  getLivegameByPro(
    @Param('streamer') streamerName: string,
    @Query('type') type: ResponseType,
    @Query('with_self') filterOwn: boolean = false,
  ) {
  }
}

type ErrorContainer = { error: any }


const livegameToResponse = (data: LivegameResponse | ErrorContainer, responseType: ResponseType) => {
  console.log(data)
  if (responseType === ResponseType.JSON) {
    return data;
  }
  if (responseType === ResponseType.NIGHTBOT) {
    if ('error' in data) {
      return `No game found`
    }
    return data.knownPlayers.map(it => `${it.championName} = ${it.combinedName}`).join('; ') + ' | Average Rank ' +
      rankToString(data.averageRank);

  }

}

const rankToString = (rank: Rank) => {
  const apex = isApex(rank.tier);

  return `${rank.tier} ${apex ? '' : rank.rank} ${rank.leaguePoints}LP`;
}
