const Endpoint = require('../Endpoint');
const EndpointUtil = require('../EndpointUtil');

/***
 * Endpoint to receive client information about champions on the league platform
 * For game data about champions use static-data instead
 */
class ChampionEndpoint extends Endpoint {

	constructor(config, rateLimiter) {
		super('Champion', config, rateLimiter);
		this.apiUrl += `/platform/${this.apiVersion}/champions`;
	}

	/**
	 * Gets basic platform information about all champions.
	 * @param freeToPlay
	 * @param [platformIdOrRegion] default will be used if omitted
	 * @return {Bluebird<ChampionListDto>}
	 */
	gettingList(platformIdOrRegion, {freeToPlay = false} = {}) {
		const {_platformId = this.config.PLATFORM_ID, _options} =
			EndpointUtil.extractPlatformIdAndOptions(platformIdOrRegion,{freeToPlay});
		EndpointUtil.throwIfNotBoolean(freeToPlay, 'freeToPlay');
		return this.executingRequest(``, _platformId, EndpointUtil.buildQueryStringFromOptions(_options));
	}

	/**
	 * Gets the basic platform information about a specific champion
	 * @param championId
	 * @param [platformIdOrRegion] case-insensitive. defaults to PLATFORM_ID set at instantiation of LeagueJs or from default-config.
	 * @return {Bluebird<ChampionDto>}
	 */
	gettingById(championId, platformIdOrRegion = this.config.PLATFORM_ID) {
		EndpointUtil.throwIfNotNumerical(championId, 'championId');
		return this.executingRequest(`/${championId}`, platformIdOrRegion);
	}
}

module.exports = ChampionEndpoint;