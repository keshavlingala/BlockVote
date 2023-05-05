import {Injectable} from '@angular/core';
import {BaseContractService} from 'ng-web3';
import {CampaignContractBuilder} from '../../../web3';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {SendOptions} from 'web3-eth-contract';

interface GetCampaignDto {
  _name: string;
  _voteCount: bigint;
  _userCanVote: boolean;
  _candidatesAddresses: string[];
  _isActive: boolean;
  _userIsOwner: boolean;
}

export interface CampaignModel {
  name: string;
  voteCount: bigint;
  userCanVote: boolean;
  candidates: CandidateModel[];
  isActive: boolean;
  userIsOwner: boolean;
}

export interface CandidateModel {
  address: string;
  name$: Observable<string>;
}

export interface CampaignResults {
  results: { [key: string]: { voteCount: bigint, name: Observable<string> } };
  winnerAddress: string;
  winnerName: Observable<string>;
  generalVoteCount: bigint;
}

@Injectable({
  providedIn: 'root',
})
export class CampaignPreviewService extends BaseContractService {
  constructor(
    private readonly _campaignContractBuilder: CampaignContractBuilder
  ) {
    super();
  }

  initializeContract(contractAddress: string): void {
    const contract = this._campaignContractBuilder
      .withAddress(contractAddress)
      .build();

    this.__initializeContract(contract);
  }

  getCampaign$(): Observable<CampaignModel> {
    return this.__getData$<GetCampaignDto>('getCampaignInfo()').pipe(
      map((getCampaignDto: GetCampaignDto) =>
        this._mapCampaignDtoToModel(getCampaignDto)
      )
    );
  }

  addCandidate$(
    candidateName: string,
    sendOptions: SendOptions
  ): Observable<void> {
    return this.__sendData$(
      'createCandidate(string)',
      sendOptions,
      candidateName
    );
  }

  candidateCreated$(): Observable<CandidateModel> {
    return this.__getEvents$<CandidateModel>(
      'CandidateCreated',
      (eventValues) =>
        ({
          address: eventValues.candidateAddress,
          name$: of(eventValues.candidateName),
        } as CandidateModel)
    );
  }

  voteForCandidate$(
    candidateAddress: string,
    sendOptions: SendOptions
  ): Observable<void> {
    return this.__sendData$(
      'voteForCandidate(address)',
      sendOptions,
      candidateAddress
    );
  }

//   call endTheVoting method on the contract
  endCampaign(sendOptions: SendOptions): Observable<void> {
    return this.__sendData$('endTheVoting()', sendOptions);
  }

  getResults$(): Observable<CampaignResults> {
    return this.__getData$<string>('getResults()').pipe(
      map((results: any) => {
          const _candidateAddresses = results._candidateAddresses;
          const _candidateVoteCounts = results._candidateVoteCounts;
          const _generalVoteCount = results._generalVoteCount;
          const winnerAddress = _candidateAddresses[_candidateVoteCounts.indexOf(Math.max(..._candidateVoteCounts)+'')]
          return {
            results: _candidateAddresses.reduce((obj, k, i) => ({
              ...obj,
              [k]: {voteCount: _candidateVoteCounts[i], name: this._getCandidateName(k)}
            }), {}),
            winnerAddress,
            winnerName: this._getCandidateName(winnerAddress),
            generalVoteCount: _generalVoteCount
          } as CampaignResults;
        }
      ))
  }

  private _getCandidateName(candidateAddress: string): Observable<string> {
    return this.__getData$<string>(
      'getCandidateNameById(address)',
      candidateAddress
    );
  }

  private _mapCampaignDtoToModel(campaignDto: GetCampaignDto): CampaignModel {
    return {
      name: campaignDto._name,
      userCanVote: campaignDto._userCanVote,
      voteCount: campaignDto._voteCount,
      userIsOwner: campaignDto._userIsOwner,
      isActive: campaignDto._isActive,
      candidates: campaignDto._candidatesAddresses.map((candidateAddress) => ({
        address: candidateAddress,
        name$: this._getCandidateName(candidateAddress),
      })),
    };
  }
}
