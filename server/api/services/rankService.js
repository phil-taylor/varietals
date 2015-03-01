/**
 * Rank Service to rank follower/friend based on social ranking algorithm
 */

module.exports = {

    /**
     * Rank the interactions of the friend, re-tweets, favorites, mentions
     * @param friend
     * @param interactions
     */
    rankInteractions: function rankInteractions(friend, interactions) {
    },

    /**
     * Given a list of keywords and a list of topics. Match the keywords against the topics and return a score.
     * @param keywords
     * @param topics
     * @returns {number}
     */
    rankKeywords: function rankKeywords(keywords, topics) {

        var exp = new RegExp(keywords.join('|'), 'ig');

        var hits = (topics) ? topics.join(' ').match(exp) : null;
        var hit_count = (hits) ? hits.length : 0;

        return hit_count * 10;

    },

    /**
     * Calculate the follower rank based on the total audience compared to the number of followers being ranked.
     * @param followers
     * @param total_audience
     * @returns {number}
     */
    rankFollowers: function rankFollowers(followers, total_audience) {
        return (followers / total_audience) * 100;
    },

    /**
     * Calculate a friend score based on a list of keywords and your total twitter follower audience.
     * @param friend
     * @param total_audience
     * @param keywords
     * @returns {{keyword_rank: number, follower_rank: number, score: number}}
     */
    score: function score(friend, total_audience, keywords) {

        var keyword_rank = this.rankKeywords(keywords, friend.topics) || 0;

        var follower_rank = this.rankFollowers(friend.followers_count, total_audience) || 0;

        keyword_rank = Math.round(keyword_rank * 100) / 100;
        follower_rank = Math.round(follower_rank * 100) / 100;

        return {
            followers_count: friend.followers_count,
            listed_count: friend.listed_count,
            keyword_rank: keyword_rank,
            follower_rank: follower_rank,
            rating: Math.round(follower_rank + keyword_rank + friend.listed_count * 100) / 100
        };
    }

}