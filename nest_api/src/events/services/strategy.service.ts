import { Injectable } from '@nestjs/common';

@Injectable()
export class StrategyService {
  applyStrategy(
    strategy: string,
    currentDestination: string,
    possibleDestinations: Array<Record<string, boolean>>,
  ): boolean {
    switch (strategy) {
      case 'ALL': {
        for (const destObj of possibleDestinations) {
          if (destObj.hasOwnProperty(currentDestination)) {
            if (!destObj[currentDestination]) {
              return false;
            }
          }
        }
        return true;
      }
      case 'ANY': {
        for (const destObj of possibleDestinations) {
          if (destObj.hasOwnProperty(currentDestination)) {
            if (destObj[currentDestination]) {
              return true;
            }
          }
        }
        return false;
      }
      case '() => { return true; }': {
        return true;
      }
      default:
        return false;
    }
  }
}
