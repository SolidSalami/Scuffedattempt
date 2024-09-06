import { DeepLolSummonerCachedResponse } from "./models/deeplol";

export interface Rank {
  tier: string;
  rank: string;
  leaguePoints: number;
}


const tierToNumber = {
  'IRON': 0,
  'BRONZE': 1,
  'SILVER': 2,
  'GOLD': 3,
  'PLATINUM': 4,
  'EMERALD': 5,
  'DIAMOND': 6,
  'MASTER': 7,
  'GRANDMASTER': 7,
  'CHALLENGER': 7
}

const rankToNumber = {
  'IV': 1,
  'III': 2,
  'II': 3,
  'I': 4
}
const calculateBaseRankByRankTier = (rank: Rank): number => {
  const tier = rank.tier.toUpperCase();
  const rankName = rank.rank.toUpperCase();
  const leaguePoints = rank.leaguePoints;
  const apex = isApex(rank.tier);
  const baseRank = (tierToNumber[tier]) * 4 + (apex ? 1 : rankToNumber[rankName]);
  const lpSum = baseRank * 100 + leaguePoints;

  return lpSum;
}

export const isApex = (str: string): boolean => tierToNumber[str.toUpperCase()] >= 7;
export const isApexNum = (num: number): boolean => num >= 7;
const calculateRankTierLpByLpSum = (baseRank: number): Rank => {
  const tier = Math.floor(baseRank / 100 / 4) > 7 ? 7 : Math.floor(baseRank / 100 / 4);
  const divNumber = isApexNum(tier) ? 4 : Math.floor((baseRank / 100) % 4);
  const leaguePoints = isApexNum(tier) ? baseRank - calculateBaseRankByRankTier({
    tier: 'MASTER',
    rank: 'I',
    leaguePoints: 0
  }) : baseRank % 100;
  const tierName = Object.keys(tierToNumber).find(key => tierToNumber[key] === tier);
  const rankName = Object.keys(rankToNumber).find(key => rankToNumber[key] === divNumber);
  return {
    tier: tierName,
    rank: rankName,
    leaguePoints: leaguePoints
  }
}

const numbertoDiv = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV'
}

export const calculateAverageRank = (summoner: DeepLolSummonerCachedResponse[]): Rank => {
  const ranks = summoner
    .map(it => it.realtime.season_tier_info_dict?.ranked_solo_5x5)
    .filter(it => !!it)
    .filter(it => it.ranking && it.tier)
    .map(it => calculateBaseRankByRankTier({
      tier: it.tier,
      rank: numbertoDiv[it.division] || 'I',
      leaguePoints: it.league_points
    }))

  const sum = ranks.reduce((acc, it) => acc + it, 0) / ranks.length;
  const result = calculateRankTierLpByLpSum(Math.floor(sum));
  if (isApex(result.tier)) {
    const allRanks = summoner.map(it => it.realtime.season_tier_info_dict?.ranked_solo_5x5)
      .filter(it => !!it)
      .filter(it => isApex(it.tier))
      .sort((a, b) => {
        return a.league_points - b.league_points;
      });
    const closest = allRanks.reduce((prev, curr) => {
      return (Math.abs(curr.league_points - sum) < Math.abs(prev.league_points - sum) ? curr : prev);
    });
    result.tier = closest.tier
  }
  return result
}

